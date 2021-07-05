import { createElement, Dispatch, MutableRefObject, ReactElement, useCallback, useReducer, useRef } from "react";

import { AccordionGroup, AccordionGroupProps, Target } from "./AccordionGroup";
import { CollapsedAccordionGroupsReducerAction, getCollapsedAccordionGroupsReducer } from "../utils/reducers";
import { AccordionContainerProps } from "../../typings/AccordionProps";
import classNames from "classnames";

export type AccordionGroups = Array<
    Pick<AccordionGroupProps, "header" | "content" | "visible" | "dynamicClassName"> & { initiallyCollapsed?: boolean }
>;

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
        props.groups.reduce<boolean[]>((accumulator, group) => {
            let result;
            const collapsed = !props.previewMode && props.collapsible && !!group.initiallyCollapsed;

            if (!collapsed && props.singleExpandedGroup) {
                result = accumulator.map(() => true);
            } else {
                result = [...accumulator];
            }

            result.push(collapsed);

            return result;
        }, [])
    );

    const containerRef = useRef<HTMLDivElement | null>(null);

    const accordionGroupElements = props.groups.map((group, index) => (
        <AccordionGroupWrapper
            key={index}
            index={index}
            parent={containerRef}
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
            ref={containerRef}
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
    parent: MutableRefObject<HTMLDivElement | null>;
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
            if (props.parent.current && focusedHeaderButton && focusedHeaderButton instanceof Node) {
                const headerButtons: HTMLDivElement[] = Array.from(
                    props.parent.current.querySelectorAll(
                        ":scope > .widget-accordion-group > .widget-accordion-group-header > .widget-accordion-group-header-button"
                    )
                );

                if (headerButtons.length === 0) {
                    return;
                }

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
            onToggleCompletion={props.onToggleCompletion}
            changeFocus={focusAccordionGroupHeaderElement}
            animateContent={props.animateContent}
            generateHeaderIcon={props.generateHeaderIcon}
            showHeaderIcon={props.showHeaderIcon}
        />
    );
}
