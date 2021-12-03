import { parseStyle } from "@mendix/piw-utils-internal";
import { mapPreviewIconToWebIcon } from "@mendix/piw-utils-internal/components/web";
import { createElement, ReactElement } from "react";

import { Accordion } from "./components/Accordion";
import { useIconGenerator } from "./utils/iconGenerator";

import { AccordionPreviewProps, GroupsPreviewType } from "../typings/AccordionProps";

export function getPreviewCss(): string {
    return require("./ui/accordion-main.scss");
}

export function preview(props: AccordionPreviewProps): ReactElement {
    const style = parseStyle(props.style);

    const groups =
        props.groups.length > 0
            ? props.groups
            : [
                  {
                      headerRenderMode: "text",
                      headerText: "[No groups configured]",
                      headerHeading: "headingOne" as const,
                      visible: true as any,
                      dynamicClass: "",
                      initiallyCollapsed: true as any,
                      collapsed: true as any,
                      onToggleCollapsed: null,
                      content: {
                          // eslint-disable-next-line no-empty-pattern
                          renderer: ({}: { caption: string; children: ReactElement }) => (
                              <div>Add groups in order to place widgets here.</div>
                          )
                      }
                  } as GroupsPreviewType
              ];

    const accordionGroups = groups.map((group, index) => ({
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

    const icon = mapPreviewIconToWebIcon(props.icon);
    const expandIcon = mapPreviewIconToWebIcon(props.expandIcon);
    const collapseIcon = mapPreviewIconToWebIcon(props.collapseIcon);

    const generateIcon = useIconGenerator(
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
