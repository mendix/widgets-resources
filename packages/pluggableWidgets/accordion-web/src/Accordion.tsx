import { createElement, ReactElement, useMemo, useRef } from "react";
import { ValueStatus } from "mendix";
import { generateUUID } from "@mendix/piw-utils-internal/dist/components/web";

import { Accordion as AccordionComponent, AccordionGroups } from "./components/Accordion";
import { Header } from "./components/Header";
import { useIconGenerator } from "./utils/iconGenerator";

import { AccordionContainerProps, GroupsType } from "../typings/AccordionProps";

export function Accordion(props: AccordionContainerProps): ReactElement | null {
    const id = useRef(generateUUID());

    const groups: AccordionGroups | undefined = useMemo(() => translateGroups(props.groups), [props.groups]);

    const generateIcon = useIconGenerator(
        props.animateIcon,
        { data: props.icon?.value, loading: props.icon?.status === ValueStatus.Loading },
        { data: props.expandIcon?.value, loading: props.expandIcon?.status === ValueStatus.Loading },
        { data: props.collapseIcon?.value, loading: props.collapseIcon?.status === ValueStatus.Loading }
    );

    if (!groups) {
        return null;
    }

    return (
        <AccordionComponent
            id={`Accordion${id.current}`}
            class={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            groups={groups}
            collapsible={props.collapsible}
            animateContent={props.animate}
            singleExpandedGroup={props.collapsible ? props.expandBehavior === "singleExpanded" : undefined}
            generateHeaderIcon={generateIcon}
            showGroupHeaderIcon={props.showIcon}
        />
    );
}

function translateGroups(groups: AccordionContainerProps["groups"]): AccordionGroups | undefined {
    if (someGroupMissingData(groups)) {
        return undefined;
    }

    return groups.map(group => {
        let header = group.headerContent;

        if (group.headerRenderMode === "text") {
            header = <Header heading={group.headerHeading}>{group.headerText.value}</Header>;
        }

        return {
            header,
            content: group.content,
            collapsed: group.collapsed?.value,
            initiallyCollapsed:
                group.initialCollapsedState === "dynamic"
                    ? group.initiallyCollapsed.value
                    : group.initialCollapsedState === "collapsed",
            visible: group.visible.value!,
            dynamicClassName: group.dynamicClass?.value,
            onToggleCompletion: group.collapsed?.setValue
        };
    });
}

function someGroupMissingData(groups: GroupsType[]): boolean {
    return groups.some(
        group =>
            group.visible.value === undefined ||
            group.headerText.value === undefined ||
            group.initiallyCollapsed.value === undefined ||
            (group.collapsed && group.collapsed.value === undefined)
    );
}
