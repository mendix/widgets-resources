import { createElement, KeyboardEvent, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import classNames from "classnames";

import "../ui/accordion-main.scss";

export const enum Target {
    FIRST = "first",
    LAST = "last",
    PREVIOUS = "previous",
    NEXT = "next"
}

export type AccordionGroupIcon = { icon: ReactNode } | { expandIcon: ReactNode; collapseIcon: ReactNode };

export interface AccordionGroupProps {
    id: string;
    header: ReactNode;
    content: ReactNode;
    collapsed: boolean;
    visible: boolean;
    dynamicClassName?: string;
    toggleCollapsed?: () => void;
    changeFocus?: (focusedGroupHeader: EventTarget | null, focusTargetGroupHeader: Target) => void;
    animateCollapsing?: boolean;
    generateIcon?: (collapsed: boolean) => ReactElement;
    showHeaderIcon?: "right" | "left" | "no";
}

export function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
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

    const onKeydownHandler = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            switch (event.key) {
                case "Enter":
                case "Space":
                    event.preventDefault();
                    props.toggleCollapsed!();
                    break;
                case "Home":
                    event.preventDefault();
                    props.changeFocus!(event.currentTarget, Target.FIRST);
                    break;
                case "End":
                    event.preventDefault();
                    props.changeFocus!(event.currentTarget, Target.LAST);
                    break;
                case "Up": // Microsoft Edge value
                case "ArrowUp":
                    event.preventDefault();
                    props.changeFocus!(event.currentTarget, Target.PREVIOUS);
                    break;
                case "Down": // Microsoft Edge value
                case "ArrowDown":
                    event.preventDefault();
                    props.changeFocus!(event.currentTarget, Target.NEXT);
                    break;
            }
        },
        [props.toggleCollapsed, props.changeFocus]
    );

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
            >
                <div
                    id={`${props.id}HeaderButton`}
                    tabIndex={0}
                    data-focusindex={0}
                    role={"button"}
                    onClick={props.toggleCollapsed}
                    onKeyDown={props.toggleCollapsed && props.changeFocus ? onKeydownHandler : undefined}
                    aria-expanded={!previousCollapsedPropValue}
                    aria-disabled={!props.toggleCollapsed}
                    aria-controls={`${props.id}ContentWrapper`}
                >
                    {props.header}
                    {props.toggleCollapsed && (showHeaderIcon === "left" || showHeaderIcon === "right")
                        ? props.generateIcon?.(previousCollapsedPropValue ?? false)
                        : null}
                </div>
            </header>
            <div
                ref={contentWrapperElement}
                id={`${props.id}ContentWrapper`}
                className={"widget-accordion-group-content-wrapper"}
                data-focusindex={0}
                onTransitionEnd={completeTransitioning}
                role={"region"}
                aria-labelledby={`${props.id}HeaderButton`}
            >
                <div ref={contentElement} className={"widget-accordion-group-content"}>
                    {props.content}
                </div>
            </div>
        </section>
    );
}
