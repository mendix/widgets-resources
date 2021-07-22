import {
    ContainerProps,
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

import { AccordionContainerProps, AccordionPreviewProps, GroupsPreviewType } from "../typings/AccordionProps";

import ChevronSVG from "./assets/ChevronStructurePreview.svg";

export function getProperties(
    values: AccordionContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.groups.forEach((group, index) => {
        if (group.headerRenderMode === "text") {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerContent");

            if (!values.advancedMode) {
                hidePropertyIn(defaultProperties, values, "groups", index, "headerHeading");
            }
        } else {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerText");
            hidePropertyIn(defaultProperties, values, "groups", index, "headerHeading");
        }

        if (group.initialCollapsedState !== "dynamic") {
            hidePropertyIn(defaultProperties, values, "groups", index, "initiallyCollapsed");
        }

        if (!values.advancedMode || !values.collapsible) {
            hideNestedPropertiesIn(defaultProperties, values, "groups", index, [
                "collapsed",
                "onToggleCollapsed",
                "initialCollapsedState",
                "initiallyCollapsed"
            ]);
        }
    });

    if (!values.collapsible) {
        hidePropertiesIn(defaultProperties, values, [
            "expandBehavior",
            "animate",
            "showIcon",
            "icon",
            "expandIcon",
            "collapseIcon",
            "animateIcon"
        ]);
    }

    if (!values.advancedMode) {
        hidePropertiesIn(defaultProperties, values, [
            "animate",
            "showIcon",
            "icon",
            "expandIcon",
            "collapseIcon",
            "animateIcon"
        ]);
    }

    if (values.showIcon === "no") {
        hidePropertiesIn(defaultProperties, values, ["icon", "expandIcon", "collapseIcon", "animateIcon"]);
    }

    if (values.animateIcon) {
        hidePropertiesIn(defaultProperties, values, ["expandIcon", "collapseIcon"]);
    } else {
        hidePropertyIn(defaultProperties, values, "icon");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}

export function check(values: AccordionPreviewProps): Problem[] {
    const errors: Problem[] = [];

    const amountOfGroupsStartingExpanded = values.groups.filter(group => group.initialCollapsedState === "expanded")
        .length;

    if (values.expandBehavior === "singleExpanded" && amountOfGroupsStartingExpanded > 1) {
        errors.push({
            property: "expandBehavior",
            severity: "error",
            message: `The 'Expanded groups' property is set to 'Single', but there are ${amountOfGroupsStartingExpanded} group items configured to be shown as expanded. Either change the configuration to have just one group to start as expanded or switch the 'Expanded groups' property to 'Multiple'.`
        });
    }

    return errors;
}

export function getPreview(values: AccordionPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        borders: true,
        children: values.groups.reduce((accumulator, group, index): StructurePreviewProps[] => {
            const { headerTextFontSize, headerTextIconPadding } = getHeaderTextPreviewDetails(group);

            return [...accumulator, getGroupPreview(group, values, headerTextIconPadding, headerTextFontSize, index)];
        }, [])
    };
}

function getGroupPreview(
    group: GroupsPreviewType,
    values: AccordionPreviewProps,
    headerTextIconPadding: number,
    headerTextFontSize: number,
    index: number
): StructurePreviewProps {
    return {
        type: "Selectable",
        object: group,
        child: {
            type: "Container",
            borders: true,
            children: [
                {
                    type: "Container",
                    borders: true,
                    children: [
                        {
                            type: "RowLayout",
                            columnSize: "grow",
                            children: [
                                ...(values.collapsible && values.showIcon === "left"
                                    ? [getIconPreview(group, headerTextIconPadding)]
                                    : []),
                                {
                                    type: "Container",
                                    padding: group.headerRenderMode === "text" ? 10 : 0,
                                    grow: 100,
                                    children: [
                                        group.headerRenderMode === "text"
                                            ? {
                                                  type: "Text",
                                                  content: group.headerText,
                                                  fontSize: headerTextFontSize,
                                                  bold: true
                                              }
                                            : {
                                                  type: "DropZone",
                                                  property: group.headerContent,
                                                  placeholder: `Place header contents for group ${index + 1} here.`
                                              }
                                    ]
                                },
                                ...(values.collapsible && values.showIcon === "right"
                                    ? [getIconPreview(group, headerTextIconPadding)]
                                    : [])
                            ]
                        }
                    ]
                },
                {
                    type: "Container",
                    borders: true,
                    children: [
                        {
                            type: "DropZone",
                            property: group.content,
                            placeholder: `Place body contents for group ${index + 1} here.`
                        }
                    ]
                }
            ]
        }
    };
}

function getIconPreview(group: GroupsPreviewType, headerTextIconPadding: number): ContainerProps {
    return {
        type: "Container",
        padding: group.headerRenderMode === "text" ? headerTextIconPadding : 21,
        children: [
            {
                type: "Image",
                document: decodeURIComponent(ChevronSVG.replace("data:image/svg+xml,", "")),
                width: 14
            }
        ]
    };
}

function getHeaderTextPreviewDetails(
    group: GroupsPreviewType
): { headerTextFontSize: number; headerTextIconPadding: number } {
    let headerTextFontSize = 0;
    let headerTextIconPadding = 0;

    if (group.headerRenderMode === "text") {
        switch (group.headerHeading) {
            case "headingOne":
                headerTextFontSize = 13;
                headerTextIconPadding = 18;
                break;
            case "headingTwo":
                headerTextFontSize = 12;
                headerTextIconPadding = 18;
                break;
            case "headingThree":
                headerTextFontSize = 11;
                headerTextIconPadding = 16;
                break;
            case "headingFour":
                headerTextFontSize = 10;
                headerTextIconPadding = 15;
                break;
            case "headingFive":
                headerTextFontSize = 9;
                headerTextIconPadding = 14;
                break;
            case "headingSix":
                headerTextFontSize = 8;
                headerTextIconPadding = 13;
                break;
        }
    }
    return { headerTextFontSize, headerTextIconPadding };
}
