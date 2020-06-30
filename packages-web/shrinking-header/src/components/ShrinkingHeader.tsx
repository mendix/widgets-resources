import { createElement, CSSProperties, PropsWithChildren, ReactElement, useState, useEffect, useMemo } from "react";
import classNames from "classnames";

export interface ShrinkingHeaderProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    scrollElementXPath: string;
    shrinkClassName: string;
    shrinkThreshold: number;
}

export function ShrinkingHeader(props: PropsWithChildren<ShrinkingHeaderProps>): ReactElement {
    const { name, className, style, tabIndex, scrollElementXPath, shrinkClassName, shrinkThreshold, children } = props;

    const [resClassName, setResClassName] = useState(className);
    const scrollElement = useMemo(
        () =>
            document.evaluate(scrollElementXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue as HTMLElement,
        [scrollElementXPath]
    );

    useEffect(() => {
        if (scrollElement) {
            const getClassNames = () => {
                if (scrollElement.scrollTop >= shrinkThreshold) {
                    setResClassName(classNames(className, shrinkClassName));
                } else {
                    setResClassName(className);
                }
            };

            scrollElement.addEventListener("scroll", getClassNames);

            return () => {
                scrollElement.removeEventListener("scroll", getClassNames);
            };
        }
    }, [className, scrollElement, shrinkClassName, shrinkThreshold]);

    if (!scrollElement) {
        return <span>The scrollable element could not be found!</span>;
    }

    return (
        <header id={name} className={resClassName} style={style} tabIndex={tabIndex}>
            {children}
        </header>
    );
}
