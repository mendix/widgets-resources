import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { throttle } from "lodash-es";

import "../ui/ShrinkingHeader.scss";

export interface ShrinkingHeaderThresholdProps {
    name?: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent?: ReactNode;
    scrollableContent?: ReactNode;
    shrinkThreshold: number;
}

export function ShrinkingHeaderThreshold(props: ShrinkingHeaderThresholdProps): ReactElement {
    const { name, className, style, tabIndex, headerContent, shrinkThreshold } = props;

    const [inlineStyle, setInlineStyle] = useState<CSSProperties>({ ...style });
    const [headerElement, setHeaderElement] = useState<HTMLDivElement>();
    const [shrunk, setShrunk] = useState(false);

    const actualClassName = classNames(
        "widget-shrinking-header-threshold",
        {
            "widget-shrinking-header-shrunk": shrunk
        },
        className
    );

    const updateHeight = useCallback(
        (node: HTMLDivElement | null) => {
            setHeaderElement(node ?? undefined);
        },
        [setHeaderElement]
    );

    useEffect(() => {
        const evaluateShrunkState = function (this: HTMLElement): void {
            if (window.scrollY >= shrinkThreshold) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        };

        const onScroll = throttle(evaluateShrunkState, 150, { leading: true });

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [shrinkThreshold, setShrunk]);

    useEffect(() => {
        if (headerElement) {
            const resizeObserver = new ResizeObserver(() => {
                const headerHeight = headerElement.offsetHeight;
                setInlineStyle(prevState => {
                    if (!prevState.height || (prevState.height && prevState.height < headerHeight)) {
                        return { ...prevState, height: headerHeight };
                    }

                    return prevState;
                });
            });

            resizeObserver.observe(headerElement);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [headerElement, setInlineStyle]);

    return (
        <div id={name} className={actualClassName} style={inlineStyle} tabIndex={tabIndex}>
            <header ref={updateHeight}>{headerContent}</header>
        </div>
    );
}
