import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";

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

    const [widgetInlineStyle, setWidgetInlineStyle] = useState<CSSProperties>({ ...style });
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
    }, [initHeight, shrunkHeight, headerElement, setHeaderInlineStyle]);

    useEffect(() => {
        if (headerElement) {
            const resizeObserver = new ResizeObserver(() => {
                const headerHeight = headerElement.offsetHeight;
                setWidgetInlineStyle(prevState => {
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
    }, [headerElement, setWidgetInlineStyle]);

    return (
        <div id={name} className={actualClassName} style={widgetInlineStyle} tabIndex={tabIndex}>
            <header ref={updateElement} style={headerInlineStyle}>
                {content}
            </header>
        </div>
    );
}
