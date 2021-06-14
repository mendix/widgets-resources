import { createElement, Dispatch, ReactElement, useCallback, useReducer, useRef } from "react";

import { AccordionGroup, AccordionGroupProps, Target } from "./AccordionGroup";
import { CollapsedAccordionGroupsReducerAction, getCollapsedAccordionGroupsReducer } from "../utils/reducers";
import { AccordionContainerProps } from "../../typings/AccordionProps";
import classNames from "classnames";

export type AccordionGroups = Array<Pick<AccordionGroupProps, "header" | "content" | "visible" | "dynamicClassName">>;

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccordionGroups;
    collapsible: boolean;
    animateCollapsing?: boolean;
    singleExpandedGroup?: boolean;
    generateHeaderIcon?: (collapsed: boolean) => ReactElement;
    showGroupHeaderIcon?: "right" | "left" | "no";
    previewMode?: boolean;
}

export function Accordion(props: AccordionProps): ReactElement | null {
    const reducer = useRef(getCollapsedAccordionGroupsReducer(props.singleExpandedGroup ? "single" : "multiple")); // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.
    const containerElementRef = useRef<HTMLDivElement>(null);

    const [collapsedAccordionGroups, collapsedAccordionGroupsDispatch] = useReducer(
        reducer.current,
        props.groups.map(() => !props.previewMode && props.collapsible)
    );

    const accordionGroupElements = props.groups.map((group, index) => (
        <AccordionGroupWrapper
            key={index}
            index={index}
            parent={containerElementRef.current ?? undefined}
            id={`${props.id}AccordionGroup${index}`}
            collapsedAccordionGroupsDispatch={props.collapsible ? collapsedAccordionGroupsDispatch : undefined}
            {...group}
            collapsed={collapsedAccordionGroups[index]}
            animateCollapsing={props.animateCollapsing}
            generateIcon={props.generateHeaderIcon}
            showHeaderIcon={props.showGroupHeaderIcon}
        />
    ));

    return (
        <div
            ref={containerElementRef}
            id={props.id}
            className={classNames("widget-accordion", { "widget-accordion-preview": props.previewMode }, props.class)}
            style={props.style}
            data-focusindex={props.tabIndex || 0}
        >
            {accordionGroupElements}
        </div>
    );
}

interface AccordionGroupWrapperProps extends Omit<AccordionGroupProps, "toggleCollapsed" | "changeFocus"> {
    index: number;
    parent?: HTMLDivElement;
    collapsedAccordionGroupsDispatch?: Dispatch<CollapsedAccordionGroupsReducerAction>;
}

function AccordionGroupWrapper(props: AccordionGroupWrapperProps): ReactElement {
    const toggleCollapsedState = useCallback(() => {
        if (props.collapsed) {
            props.collapsedAccordionGroupsDispatch!({ type: "expand", index: props.index });
        } else {
            props.collapsedAccordionGroupsDispatch!({ type: "collapse", index: props.index });
        }
    }, [props.collapsed, props.collapsedAccordionGroupsDispatch, props.index]);

    const focusAccordionGroupHeaderElement = useCallback(
        (focusedHeader: EventTarget | null, focusTargetHeader: Target): void => {
            if (props.parent && focusedHeader && focusedHeader instanceof Node) {
                const headerElements: HTMLDivElement[] = Array.from(
                    props.parent.querySelectorAll(".widget-accordion-group-header > div")
                );

                switch (focusTargetHeader) {
                    case Target.FIRST:
                        headerElements[0].focus();
                        break;
                    case Target.LAST:
                        headerElements[headerElements.length - 1].focus();
                        break;
                    case Target.PREVIOUS:
                    case Target.NEXT:
                        const targetElementIndex = headerElements.findIndex(element =>
                            element.isSameNode(focusedHeader)
                        );
                        headerElements[targetElementIndex + (focusTargetHeader === Target.NEXT ? 1 : -1)]?.focus();
                        break;
                }
            }
        },
        [props.parent]
    );

    return (
        <AccordionGroup
            key={props.index}
            id={props.id}
            header={props.header}
            content={props.content}
            collapsed={props.collapsed}
            visible={props.visible}
            dynamicClassName={props.dynamicClassName}
            toggleCollapsed={props.collapsedAccordionGroupsDispatch ? toggleCollapsedState : undefined}
            changeFocus={props.collapsedAccordionGroupsDispatch ? focusAccordionGroupHeaderElement : undefined}
            animateCollapsing={props.animateCollapsing}
            generateIcon={props.generateIcon}
            showHeaderIcon={props.showHeaderIcon}
        />
    );
}
