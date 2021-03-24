import { createElement, CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react";
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
    const { name, className, style, tabIndex, headerContent, shrunkClassName, shrinkThreshold } = props;

    const [shrunk, setShrunk] = useState(false);
    const actualClassName = classNames("widget-shrinking-header-threshold", className, {
        [`${shrunkClassName}`]: shrunk
    });

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

    return (
        <div id={name} className={actualClassName} style={style} tabIndex={tabIndex}>
            <header>{headerContent}</header>
        </div>
    );
}
