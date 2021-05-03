import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";
import { useWrappingDivHeight } from "../utils/WrappingDivStyler";

export interface ShrinkingHeaderThresholdProps {
    rootElementRef?: (node: HTMLElement | null) => void;
    name?: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    initHeight: number;
    shrunkHeight: number;
}

export function ShrinkingHeaderLinear(props: ShrinkingHeaderThresholdProps): ReactElement {
    const { rootElementRef, name, className, style, tabIndex, content, initHeight, shrunkHeight } = props;

    const [headerHeight, setHeaderHeight] = useState<number>();
    const [headerElement, setHeaderElement] = useState<HTMLDivElement>();

    const actualClassName = classNames("widget-shrinking-header", "widget-shrinking-header-linear", className);

    const updateElement = useCallback(
        (node: HTMLDivElement | null) => {
            setHeaderElement(node ?? undefined);
            rootElementRef?.(node);
        },
        [rootElementRef, setHeaderElement]
    );

    useEffect(() => {
        const updateHeaderHeight = function (): void {
            const headerHeight =
                initHeight - (window.scrollY > initHeight - shrunkHeight ? initHeight - shrunkHeight : window.scrollY);

            setHeaderHeight(headerHeight);
        };

        document.addEventListener("scroll", updateHeaderHeight);

        return () => {
            document.removeEventListener("scroll", updateHeaderHeight);
        };
    }, [initHeight, shrunkHeight, setHeaderHeight]);

    const wrappingDivHeight = useWrappingDivHeight(headerElement);

    return (
        <div id={name} className={actualClassName} style={{ ...style, height: wrappingDivHeight }} tabIndex={tabIndex}>
            <header ref={updateElement} style={{ height: headerHeight }}>
                {content}
            </header>
        </div>
    );
}
