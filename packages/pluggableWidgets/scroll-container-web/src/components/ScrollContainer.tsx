import { createElement, PropsWithChildren, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface ScrollContainerProps {
    className: string;
    width?: number;
    percentage?: number;
}

export function ScrollContainer(props: PropsWithChildren<ScrollContainerProps>): ReactElement {
    const divContainer = useRef<HTMLDivElement>(null);
    const [renderContents, showRenderContent] = useState(false);
    const [height, setHeight] = useState<number | undefined>(undefined);

    const handleResize = useCallback(() => {
        if (divContainer.current?.parentElement?.className.match(/mx-placeholder|region-content/)) {
            const topBar = document.querySelector(".topbar-content");
            setHeight(window.innerHeight - (topBar?.clientHeight ?? 0));
        } else {
            // Impossible to define height of the element
            showRenderContent(true);
        }
    }, [divContainer.current]);

    useEffect(() => {
        if (divContainer.current?.clientHeight === 0) {
            handleResize();
        }
    }, [divContainer.current, handleResize]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            ref={divContainer}
            className={classNames("widget-scroll-container", props.className)}
            style={{
                ...(props.width
                    ? { width: `${props.width}px` }
                    : props.percentage
                    ? { width: `${props.percentage}%` }
                    : undefined),
                ...(height !== undefined ? { height } : undefined)
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
