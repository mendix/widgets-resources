import { StructurePreviewProps, ContainerProps } from "@mendix/piw-utils-internal";
import { changePropertyIn, hidePropertyIn, Properties, Problem } from "@mendix/pluggable-widgets-tools";

import { AccordionPreviewProps, GroupsPreviewType } from "../typings/AccordionProps";

export function getPreview(values: AccordionPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const headerBackgroundColor: string = isDarkMode ? "#454545" : "#F5F5F5";

    const noGroupsContainer: ContainerProps = {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                backgroundColor: headerBackgroundColor,
                children: [
                    {
                        type: "RowLayout",
                        padding: 8,
                        columnSize: "grow",
                        children: [
                            { type: "Container" },
                            {
                                type: "Text",
                                fontColor: isDarkMode ? "#A4A4A4" : "#0A1324",
                                bold: true,
                                content: "[No groups configured]"
                            },
                            { type: "Container" }
                        ]
                    }
                ]
            },
            {
                type: "Container",
                children: [
                    {
                        type: "RowLayout",
                        padding: 8,
                        columnSize: "grow",
                        children: [
                            { type: "Container" },
                            {
                                type: "Text",
                                content: "Add groups in order to place widgets here",
                                fontColor: isDarkMode ? "#A4A4A4" : "#6B707B"
                            },
                            { type: "Container" }
                        ]
                    }
                ]
            }
        ]
    };

    return {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                backgroundColor: headerBackgroundColor,
                children: [
                    {
                        type: "Container",
                        padding: 4,
                        borders: true,
                        children: [
                            {
                                type: "Text",
                                fontColor: isDarkMode ? "#DEDEDE" : "#6B707B",
                                content: "Accordion"
                            }
                        ]
                    }
                ]
            },
            {
                type: "Container",
                children: [
                    ...(values.groups.length === 0
                        ? [noGroupsContainer]
                        : values.groups
                              .map<StructurePreviewProps[]>((group, index) =>
                                  group.headerRenderMode === "custom"
                                      ? [
                                            {
                                                type: "DropZone",
                                                property: group.headerContent,
                                                placeholder: `Group/${index + 1}/Header`
                                            },
                                            {
                                                type: "DropZone",
                                                property: group.content,
                                                placeholder: `Group/${index + 1}/Content`
                                            }
                                        ]
                                      : [
                                            {
                                                type: "DropZone",
                                                property: group.content,
                                                placeholder: `Group/${index + 1}/Content`
                                            }
                                        ]
                              )
                              .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
                ]
            }
        ]
    };
}

export function getProperties(values: AccordionPreviewProps, defaultProperties: Properties): Properties {
    values.groups.forEach((group, index) => {
        if (group.headerRenderMode === "text") {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerContent");
        } else {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerText");
            hidePropertyIn(defaultProperties, values, "groups", index, "headerTextRenderMode");
        }

        if (!values.collapsible) {
            hidePropertyIn(defaultProperties, values, "groups", index, "groupCollapsed");
            hidePropertyIn(defaultProperties, values, "groups", index, "groupCollapsedDynamic");
        }
        if (group.groupCollapsed !== "groupStartDynamic") {
            hidePropertyIn(defaultProperties, values, "groups", index, "groupCollapsedDynamic");
        }
    });

    if (!values.collapsible) {
        hidePropertyIn(defaultProperties, values, "collapseBehavior");
    }

    if (values.icon === "no") {
        hidePropertyIn(defaultProperties, values, "iconExpanded");
        hidePropertyIn(defaultProperties, values, "iconCollapsed");
    }

    changePropertyIn(
        defaultProperties,
        values,
        prop => {
            prop.objectHeaders = ["Header type", "Render mode", "Text", "Visible"];
            prop.objects?.forEach((object, index) => {
                const column = values.groups[index];
                object.captions = [
                    column.headerRenderMode,
                    column.headerRenderMode === "text" ? column.headerTextRenderMode : "",
                    column.headerRenderMode === "text" ? column.headerText : "",
                    column.visible
                ];
            });
        },
        "groups"
    );

    return defaultProperties;
}

export function check(values: AccordionPreviewProps): Problem[] {
    const errors: Problem[] = [];

    const amountOfGroupsStartingExpanded = values.groups.filter(
        (g: GroupsPreviewType): boolean => g.groupCollapsed === "groupStartExpanded"
    ).length;
    if (values.collapseBehavior === "singleExpanded" && amountOfGroupsStartingExpanded > 1) {
        errors.push({
            property: "singleExpanded",
            severity: "error",
            message: `There are ${amountOfGroupsStartingExpanded} groups configured to start in the expanded state. Change the configuration of each group or switch to "Multiple groups can be expanded".`
        });
    }

    values.groups.forEach((group: GroupsPreviewType, index: number): void => {
        if (group.headerRenderMode === "custom" && group.headerContent.widgetCount === 0) {
            errors.push({
                property: `groups/${index + 1}/headerContent`,
                severity: "error",
                message: `The content of the header can not be empty.`
            });
        }
        if (group.content.widgetCount === 0) {
            errors.push({
                property: `groups/${index + 1}/content`,
                severity: "error",
                message: `The content can not be empty.`
            });
        }
    });

    return errors;
}
