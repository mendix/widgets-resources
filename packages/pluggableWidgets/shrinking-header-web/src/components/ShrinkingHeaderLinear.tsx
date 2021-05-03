import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";
import { useWrappingDivStyle } from "../utils/WrappingDivStyler";

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

    const [headerInlineStyle, setHeaderInlineStyle] = useState<CSSProperties>();
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

            setHeaderInlineStyle({ height: headerHeight });
        };

        document.addEventListener("scroll", updateHeaderHeight);

        return () => {
            document.removeEventListener("scroll", updateHeaderHeight);
        };
    }, [initHeight, shrunkHeight, setHeaderInlineStyle]);

    const wrappingDivStyle = useWrappingDivStyle(style, headerElement);

    return (
        <div id={name} className={actualClassName} style={wrappingDivStyle} tabIndex={tabIndex}>
            <header ref={updateElement} style={headerInlineStyle}>
                {content}
            </header>
        </div>
    );
}
