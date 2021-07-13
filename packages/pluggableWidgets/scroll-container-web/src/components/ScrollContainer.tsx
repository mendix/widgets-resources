import { createElement, CSSProperties, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

interface ScrollContainerProps {
    className: string;
    width?: number;
    percentage?: number;
    styles?: CSSProperties;
}

export function ScrollContainer(props: PropsWithChildren<ScrollContainerProps>): ReactElement {
    const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);
    const [renderContents, showRenderContents] = useState(false);
    const [height, setHeight] = useState<number | undefined>(undefined);

    const handleResize = useCallback(() => {
        if (divContainer?.parentElement?.className.match(/mx-placeholder|region-content/)) {
            const topBar = document.querySelector(".topbar-content");
            setHeight(window.innerHeight - (topBar?.clientHeight ?? 0));
        } else {
            // Impossible to define height of the element
            showRenderContents(true);
        }
    }, [divContainer]);

    useEffect(() => {
        if (divContainer?.clientHeight === 0) {
            handleResize();
        }
    }, [divContainer, handleResize]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return (
        <div
            ref={ref => {
                if (ref && !divContainer) {
                    setDivContainer(ref);
                }
            }}
            className={classNames("widget-scroll-container", props.className)}
            style={{
                ...(props.width
                    ? { width: `${props.width}px` }
                    : props.percentage
                    ? { width: `${props.percentage}%` }
                    : undefined),
                ...(height !== undefined ? { height } : undefined),
                ...props.styles
            }}
        >
            <div
                className="widget-scroll-container-wrapper"
                style={renderContents ? { display: "contents" } : undefined}
            >
                {props.children}
            </div>
        </div>
    );
}
