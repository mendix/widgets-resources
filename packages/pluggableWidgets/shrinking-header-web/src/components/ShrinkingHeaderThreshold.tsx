import { createElement, CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
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
    shrunkClassName: string;
    shrinkThreshold: number;
}

export function ShrinkingHeaderThreshold(props: ShrinkingHeaderThresholdProps): ReactElement {
    const {
        name,
        className,
        style,
        tabIndex,
        headerContent,
        scrollableContent,
        shrunkClassName,
        shrinkThreshold
    } = props;

    const [shrunk, setShrunk] = useState(false);
    const actualClassName = classNames("widget-shrinking-header-threshold", className, {
        [`${shrunkClassName}`]: shrunk
    });

    const scrollableContentDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollableContentDiv = scrollableContentDivRef.current;

        if (scrollableContentDiv) {
            const evaluateShrunkState = function (this: HTMLElement): void {
                console.log("evaluate");
                if (this.scrollTop >= shrinkThreshold) {
                    setShrunk(true);
                } else {
                    setShrunk(false);
                }
            };

            const onScroll = throttle(evaluateShrunkState, 100, { trailing: true });
            scrollableContentDiv.addEventListener("scroll", onScroll);

            return () => {
                scrollableContentDiv.removeEventListener("scroll", onScroll);
            };
        }
    }, [scrollableContentDivRef, shrinkThreshold]);

    return (
        <div id={name} className={actualClassName} style={style} tabIndex={tabIndex}>
            <header>{headerContent}</header>
            <section ref={scrollableContentDivRef}>{scrollableContent}</section>
        </div>
    );
}
