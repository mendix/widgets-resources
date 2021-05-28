import { hidePropertyIn, Properties, Problem } from "@mendix/piw-utils-internal";

import { AccordionPreviewProps, GroupsPreviewType } from "../typings/AccordionProps";

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
