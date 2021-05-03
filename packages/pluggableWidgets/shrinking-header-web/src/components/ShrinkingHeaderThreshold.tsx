import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { throttle } from "lodash-es";

import "../ui/ShrinkingHeader.scss";
import { useWrappingDivHeight } from "../utils/WrappingDivStyler";

export interface ShrinkingHeaderThresholdProps {
    rootElementRef?: (node: HTMLElement | null) => void;
    name?: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    shrinkThreshold: number;
}

export function ShrinkingHeaderThreshold(props: ShrinkingHeaderThresholdProps): ReactElement {
    const { rootElementRef, name, className, style, tabIndex, content, shrinkThreshold } = props;

    const [headerElement, setHeaderElement] = useState<HTMLDivElement>();
    const [shrunk, setShrunk] = useState(false);

    const actualClassName = classNames(
        "widget-shrinking-header",
        "widget-shrinking-header-threshold",
        {
            "widget-shrinking-header-shrunk": shrunk
        },
        className
    );

    const updateElement = useCallback(
        (node: HTMLDivElement | null) => {
            setHeaderElement(node ?? undefined);
            rootElementRef?.(node);
        },
        [rootElementRef, setHeaderElement]
    );

    useEffect(() => {
        const evaluateShrunkState = function (this: HTMLElement): void {
            if (window.scrollY >= shrinkThreshold) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        };

        const onScroll = throttle(evaluateShrunkState, 250, { leading: true, trailing: true });

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [shrinkThreshold, setShrunk]);

    const wrappingDivHeight = useWrappingDivHeight(headerElement);

    return (
        <div id={name} className={actualClassName} style={{ ...style, height: wrappingDivHeight }} tabIndex={tabIndex}>
            <header ref={updateElement}>{content}</header>
        </div>
    );
}
