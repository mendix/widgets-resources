import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";
import { WebIcon } from "mendix";

import { Accordion } from "./components/Accordion";
import { useIconGenerator } from "./utils/iconGenerator";

import { AccordionPreviewProps } from "../typings/AccordionProps";

// This interface is necessary to overcome incorrect exposure of class names with the "className" prop. In the future they will be exposed with a "class" prop (Jira Issue PAG-1317).
interface PreviewProps extends Omit<AccordionPreviewProps, "class"> {
    className: string;
}

export function getPreviewCss(): string {
    return require("./ui/accordion-main.scss");
}

export function preview(props: PreviewProps): ReactElement {
    const style = parseStyle(props.style);

    const accordionGroups = props.groups.map((group, index) => ({
        header:
            group.headerRenderMode === "text" ? (
                <h3>{group.headerText}</h3>
            ) : (
                <group.headerContent.renderer caption={`Place header contents for group ${index + 1} here.`}>
                    <div />
                </group.headerContent.renderer>
            ),
        content: (
            <group.content.renderer caption={`Place body contents for group ${index + 1} here.`}>
                <div />
            </group.content.renderer>
        ),
        visible: (group.visible as unknown) as boolean,
        dynamicClassName: group.dynamicClass.slice(1, -1) // expression result is surrounded by single quotes
    }));

    // TODO: Remove these when preview typing for `icon` property is aligned properly by PageEditor
    const icon: WebIcon | null = props.icon as any;
    const expandIcon: WebIcon | null = props.expandIcon as any;
    const collapseIcon: WebIcon | null = props.collapseIcon as any;

    const generateIcon = useIconGenerator(
        props.advancedMode,
        props.animateIcon,
        {
            data: icon ?? undefined
        },
        {
            data: expandIcon ?? undefined
        },
        {
            data: collapseIcon ?? undefined
        }
    );

    return (
        <Accordion
            id={"Accordion"}
            class={props.className}
            style={style}
            groups={accordionGroups}
            collapsible={props.collapsible}
            animateContent={props.animate}
            singleExpandedGroup={props.collapsible ? props.expandBehavior === "singleExpanded" : undefined}
            generateHeaderIcon={generateIcon}
            showGroupHeaderIcon={props.showIcon}
            previewMode
        />
    );
}
