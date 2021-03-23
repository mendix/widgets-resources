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

    const [wrapperDiv, setWrapperDiv] = useState<HTMLDivElement>();
    const setWrapperDivElement = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                setWrapperDiv(node);
            }
        },
        [setWrapperDiv]
    );

    useEffect(() => {
        const evaluateShrunkState = function (this: HTMLElement): void {
            console.log("evaluate");
            if (this.scrollTop >= shrinkThreshold) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        };

        const onScroll = throttle(evaluateShrunkState, 100, { trailing: true });

        if (wrapperDiv) {
            wrapperDiv.addEventListener("scroll", onScroll);

            return () => {
                wrapperDiv.removeEventListener("scroll", onScroll);
            };
        }
    }, [wrapperDiv, shrinkThreshold, setShrunk]);

    return (
        <div ref={setWrapperDivElement} id={name} className={actualClassName} style={style} tabIndex={tabIndex}>
            <header>{headerContent}</header>
            <section>{scrollableContent}</section>
        </div>
    );
}
