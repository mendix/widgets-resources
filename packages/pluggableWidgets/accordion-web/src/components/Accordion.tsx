import { createElement, Dispatch, ReactElement, useCallback, useReducer, useRef, useState } from "react";

import { AccordionGroup, AccordionGroupProps, Target } from "./AccordionGroup";
import { CollapsedAccordionGroupsReducerAction, getCollapsedAccordionGroupsReducer } from "../utils/reducers";
import { AccordionContainerProps } from "../../typings/AccordionProps";
import classNames from "classnames";

export type AccordionGroups = Array<Pick<AccordionGroupProps, "header" | "content" | "visible" | "dynamicClassName">>;

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccordionGroups;
    collapsible: boolean;
    animateContent?: boolean;
    singleExpandedGroup?: boolean;
    generateHeaderIcon?: (collapsed: boolean) => ReactElement;
    showGroupHeaderIcon?: "right" | "left" | "no";
    previewMode?: boolean;
}

export function Accordion(props: AccordionProps): ReactElement | null {
    const reducer = useRef(getCollapsedAccordionGroupsReducer(props.singleExpandedGroup ? "single" : "multiple")); // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.

    const [collapsedAccordionGroups, collapsedAccordionGroupsDispatch] = useReducer(
        reducer.current,
        props.groups.map(() => !props.previewMode && props.collapsible)
    );

    const [container, setContainer] = useState<HTMLDivElement>();

    const updateContainer = useCallback((node: HTMLDivElement | null) => {
        setContainer(node ?? undefined);
    }, []);

    const accordionGroupElements = props.groups.map((group, index) => (
        <AccordionGroupWrapper
            key={index}
            index={index}
            parent={container}
            id={`${props.id}AccordionGroup${index}`}
            collapsible={props.collapsible}
            collapsedAccordionGroupsDispatch={collapsedAccordionGroupsDispatch}
            {...group}
            collapsed={collapsedAccordionGroups[index]}
            animateContent={props.animateContent}
            generateHeaderIcon={props.generateHeaderIcon}
            showHeaderIcon={props.showGroupHeaderIcon}
        />
    ));

    return (
        <div
            ref={updateContainer}
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
    collapsedAccordionGroupsDispatch: Dispatch<CollapsedAccordionGroupsReducerAction>;
}

function AccordionGroupWrapper(props: AccordionGroupWrapperProps): ReactElement {
    const { collapsedAccordionGroupsDispatch } = props;

    const toggleCollapsedState = useCallback(() => {
        if (props.collapsed) {
            collapsedAccordionGroupsDispatch({ type: "expand", index: props.index });
        } else {
            collapsedAccordionGroupsDispatch({ type: "collapse", index: props.index });
        }
    }, [props.collapsed, collapsedAccordionGroupsDispatch, props.index]);

    const focusAccordionGroupHeaderElement = useCallback(
        (focusedHeaderButton: EventTarget | null, focusTargetHeader: Target): void => {
            if (props.parent && focusedHeaderButton && focusedHeaderButton instanceof Node) {
                const headerButtons: HTMLDivElement[] = Array.from(
                    props.parent.querySelectorAll(
                        ":scope > .widget-accordion-group > .widget-accordion-group-header > .widget-accordion-group-header-button"
                    )
                );

                switch (focusTargetHeader) {
                    case Target.FIRST:
                        headerButtons[0].focus();
                        break;
                    case Target.LAST:
                        headerButtons[headerButtons.length - 1].focus();
                        break;
                    case Target.PREVIOUS:
                    case Target.NEXT:
                        const currentHeaderButtonIndex = headerButtons.findIndex(headerButton =>
                            headerButton.isSameNode(focusedHeaderButton)
                        );
                        headerButtons[currentHeaderButtonIndex + (focusTargetHeader === Target.NEXT ? 1 : -1)]?.focus();
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
            collapsible={props.collapsible}
            toggleCollapsed={toggleCollapsedState}
            changeFocus={focusAccordionGroupHeaderElement}
            animateContent={props.animateContent}
            generateHeaderIcon={props.generateHeaderIcon}
            showHeaderIcon={props.showHeaderIcon}
        />
    );
}
