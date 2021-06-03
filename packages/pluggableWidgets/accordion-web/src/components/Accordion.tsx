import { createElement, ReactElement, useReducer, useRef } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";
import { getAccordionGroupsReducer } from "../utils/AccordionGroupStateReducer";
import { AccordionContainerProps } from "../../typings/AccordionProps";
import classNames from "classnames";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
    animateCollapsing: boolean;
    singleExpandedGroup?: boolean;
    generateHeaderIcon?: (collapsed: boolean) => ReactElement;
    showGroupHeaderIcon: "right" | "left" | "no";
}

export default function Accordion(props: AccordionProps): ReactElement | null {
    const previousGroupsPropValue = useRef(props.groups);

    const [accordionGroups, accordionGroupsDispatch] = useReducer(
        getAccordionGroupsReducer(props.collapsible ? (props.singleExpandedGroup ? "single" : "multiple") : "all"), // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.
        props.groups.map(group => ({ ...group, collapsed: props.collapsible }))
    );

    if (props.groups !== previousGroupsPropValue.current) {
        previousGroupsPropValue.current = props.groups;
        accordionGroupsDispatch({ type: "sync", groups: props.groups });
    }

    const accordionGroupElements = accordionGroups.map((group, index) => (
        <AccordionGroup
            key={index}
            group={group}
            accordionGroupsDispatch={props.collapsible ? accordionGroupsDispatch : undefined}
            animateCollapsing={props.animateCollapsing}
            generateIcon={props.generateHeaderIcon}
            showHeaderIcon={props.showGroupHeaderIcon}
        />
    ));

    return (
        <div
            id={props.id}
            className={classNames("widget-accordion", props.class)}
            style={props.style}
            tabIndex={props.tabIndex}
        >
            {accordionGroupElements}
        </div>
    );
}
