import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";

import { Accordion } from "./components/Accordion";
import { useIconGenerator } from "./utils/iconGenerator";

import { AccordionPreviewProps } from "../typings/AccordionProps";

export function getPreviewCss(): string {
    return require("./ui/accordion-main.scss");
}

export function preview(props: AccordionPreviewProps): ReactElement {
    const style = parseStyle(props.style);

    const accordionGroups = props.groups.map(group => ({
        header:
            group.headerRenderMode === "text" ? (
                <h3>{group.headerText}</h3>
            ) : (
                <group.headerContent.renderer>
                    <div />
                </group.headerContent.renderer>
            ),
        content: (
            <group.content.renderer>
                <div />
            </group.content.renderer>
        ),
        visible: (group.visible as unknown) as boolean,
        dynamicClassName: group.dynamicClass.slice(1, -1) // expression result is surrounded by single quotes
    }));

    const generateIcon = useIconGenerator(
        props.advancedMode,
        props.animateIcon,
        {
            data: props.icon
                ? props.icon.type === "image"
                    ? { type: props.icon.type, iconUrl: props.icon.imageUrl }
                    : props.icon
                : undefined
        },
        {
            data: props.expandIcon
                ? props.expandIcon.type === "image"
                    ? { type: props.expandIcon.type, iconUrl: props.expandIcon.imageUrl }
                    : props.expandIcon
                : undefined
        },
        {
            data: props.collapseIcon
                ? props.collapseIcon.type === "image"
                    ? { type: props.collapseIcon.type, iconUrl: props.collapseIcon.imageUrl }
                    : props.collapseIcon
                : undefined
        }
    );

    return (
        <Accordion
            id={"Accordion"}
            class={props.class}
            style={style}
            groups={accordionGroups}
            collapsible={props.collapsible}
            animateCollapsing={props.animate}
            singleExpandedGroup={props.collapsible ? props.collapseBehavior === "singleExpanded" : undefined}
            generateHeaderIcon={generateIcon}
            showGroupHeaderIcon={props.showIcon}
        />
    );
}
