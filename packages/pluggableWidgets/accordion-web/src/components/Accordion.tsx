import { createElement, Dispatch, ReactElement, useCallback, useReducer, useRef } from "react";

import AccordionGroup, { AccordionGroupProps } from "./AccordionGroup";
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

    const [collapsedAccordionGroups, collapsedAccordionGroupsDispatch] = useReducer(
        reducer.current,
        props.groups.map(() => (props.previewMode ? false : props.collapsible))
    );

    const accordionGroupElements = props.groups.map((group, index) => (
        <AccordionGroupWrapper
            key={index}
            index={index}
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
            id={props.id}
            className={classNames("widget-accordion", { "widget-accordion-preview": props.previewMode }, props.class)}
            style={props.style}
            tabIndex={props.tabIndex}
        >
            {accordionGroupElements}
        </div>
    );
}

interface AccordionGroupWrapperProps extends Omit<AccordionGroupProps, "toggleCollapsed"> {
    index: number;
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

    return (
        <AccordionGroup
            key={props.index}
            header={props.header}
            content={props.content}
            collapsed={props.collapsed}
            visible={props.visible}
            dynamicClassName={props.dynamicClassName}
            toggleCollapsed={props.collapsedAccordionGroupsDispatch ? toggleCollapsedState : undefined}
            animateCollapsing={props.animateCollapsing}
            generateIcon={props.generateIcon}
            showHeaderIcon={props.showHeaderIcon}
        />
    );
}
