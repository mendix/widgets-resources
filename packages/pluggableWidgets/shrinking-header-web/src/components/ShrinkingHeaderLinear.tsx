import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";
import { useWrappingDivHeight } from "../utils/WrappingDivStyler";

export interface ShrinkingHeaderLinearProps {
    rootElementRef?: (node: HTMLElement | null) => void;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    initHeight: number;
    shrunkHeight: number;
}

export function ShrinkingHeaderLinear(props: ShrinkingHeaderLinearProps): ReactElement {
    const { rootElementRef, className, style, tabIndex, content, initHeight, shrunkHeight } = props;

    const [headerHeight, setHeaderHeight] = useState<number>();
    const [headerElement, setHeaderElement] = useState<HTMLElement>();

    const actualClassName = classNames("widget-shrinking-header", "widget-shrinking-header-linear", className);

    const updateElement = useCallback(
        (node: HTMLElement | null) => {
            setHeaderElement(node ?? undefined);
            rootElementRef?.(node);
        },
        [rootElementRef, setHeaderElement]
    );

    useEffect(() => {
        const updateHeaderHeight = function (): void {
            let headerHeight;

            if (window.scrollY > initHeight - shrunkHeight) {
                headerHeight = initHeight - (initHeight - shrunkHeight);
            } else if (window.scrollY < 0) {
                headerHeight = initHeight;
            } else {
                headerHeight = initHeight - window.scrollY;
            }

            setHeaderHeight(headerHeight);
        };

        document.addEventListener("scroll", updateHeaderHeight);

        return () => {
            document.removeEventListener("scroll", updateHeaderHeight);
        };
    }, [initHeight, shrunkHeight, setHeaderHeight]);

    const wrappingDivHeight = useWrappingDivHeight(headerElement);

    return (
        <div className={actualClassName} style={{ ...style, height: wrappingDivHeight }} tabIndex={tabIndex}>
            <header ref={updateElement} style={{ height: headerHeight }}>
                {content}
            </header>
        </div>
    );
}
