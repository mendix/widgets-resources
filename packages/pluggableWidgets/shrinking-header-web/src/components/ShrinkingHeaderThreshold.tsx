import { createElement, CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import classNames from "classnames";

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

    function onScroll(this: HTMLElement): void {
        if (this.scrollTop >= shrinkThreshold) {
            setShrunk(true);
        } else {
            setShrunk(false);
        }
    }

    useEffect(() => {
        const scrollableContentDiv = scrollableContentDivRef.current;
        if (scrollableContentDiv) {
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
