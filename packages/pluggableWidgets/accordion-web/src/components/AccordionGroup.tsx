import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import classNames from "classnames";

import "../ui/accordion-main.scss";

export type AccordionGroupIcon = { icon: ReactNode } | { expandIcon: ReactNode; collapseIcon: ReactNode };

export interface AccordionGroupProps {
    header: ReactNode;
    content: ReactNode;
    collapsed: boolean;
    visible: boolean;
    dynamicClassName?: string;
    toggleCollapsed?: () => void;
    animateCollapsing?: boolean;
    generateIcon?: (collapsed: boolean) => ReactElement;
    showHeaderIcon?: "right" | "left" | "no";
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { animateCollapsing, showHeaderIcon } = props;

    const [previousCollapsedPropValue, setPreviousCollapsedPropValue] = useState(props.collapsed);
    const transitioning = useRef<boolean>(false);

    const rootElement = useRef<HTMLDivElement>(null);
    const contentWrapperElement = useRef<HTMLDivElement>(null);
    const contentElement = useRef<HTMLDivElement>(null);

    const completeTransitioning = useCallback((): void => {
        if (contentWrapperElement.current && rootElement.current && transitioning.current) {
            if (!previousCollapsedPropValue) {
                rootElement.current.classList.add("widget-accordion-group-collapsed");
                rootElement.current.classList.remove("widget-accordion-group-collapsing");
                setPreviousCollapsedPropValue(true);
            } else {
                rootElement.current.classList.remove("widget-accordion-group-expanding");
                contentWrapperElement.current.style.height = "";
                setPreviousCollapsedPropValue(false);
            }

            transitioning.current = false;
        }
    }, [previousCollapsedPropValue]);

    useEffect(() => {
        if (
            props.collapsed !== previousCollapsedPropValue &&
            rootElement.current &&
            contentWrapperElement.current &&
            contentElement.current &&
            animateCollapsing
        ) {
            transitioning.current = true;
            if (props.collapsed) {
                contentWrapperElement.current.style.height = `${
                    contentElement.current.getBoundingClientRect().height
                }px`;
                rootElement.current.classList.add("widget-accordion-group-collapsing");

                setTimeout(() => {
                    if (contentWrapperElement.current) {
                        contentWrapperElement.current.style.height = "";
                    }
                }, 50);
            } else {
                rootElement.current.classList.add("widget-accordion-group-expanding");
                rootElement.current.classList.remove("widget-accordion-group-collapsed");

                setTimeout(() => {
                    if (contentWrapperElement.current && contentElement.current) {
                        contentWrapperElement.current.style.height = `${
                            contentElement.current.getBoundingClientRect().height
                        }px`;
                    }
                }, 50);
            }
        } else if (props.collapsed !== previousCollapsedPropValue && (!animateCollapsing || !props.visible)) {
            setPreviousCollapsedPropValue(props.collapsed);
        }
    }, [props.collapsed, props.visible, previousCollapsedPropValue, animateCollapsing]);

    if (!props.visible) {
        return null;
    }

    return (
        <section
            ref={rootElement}
            className={classNames(
                "widget-accordion-group",
                {
                    "widget-accordion-group-collapsed": previousCollapsedPropValue
                },
                props.dynamicClassName
            )}
        >
            <header
                className={classNames("widget-accordion-group-header", {
                    "widget-accordion-group-header-clickable": props.toggleCollapsed,
                    "widget-accordion-group-header-icon-left": props.toggleCollapsed && showHeaderIcon === "left",
                    "widget-accordion-group-header-icon-right": props.toggleCollapsed && showHeaderIcon === "right"
                })}
                onClick={props.toggleCollapsed}
            >
                {props.header}
                {props.toggleCollapsed && (showHeaderIcon === "left" || showHeaderIcon === "right")
                    ? props.generateIcon?.(previousCollapsedPropValue ?? false)
                    : null}
            </header>
            <div
                ref={contentWrapperElement}
                className={"widget-accordion-group-content-wrapper"}
                onTransitionEnd={completeTransitioning}
            >
                <div ref={contentElement} className={"widget-accordion-group-content"}>
                    {props.content}
                </div>
            </div>
        </section>
    );
}
