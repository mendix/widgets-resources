import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

import { AccordionContainerProps, AccordionPreviewProps } from "../typings/AccordionProps";

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

        if (!values.advancedMode) {
            hideNestedPropertiesIn(defaultProperties, values, "groups", index, [
                "collapsed",
                "onToggleCollapsed",
                "initialCollapsedState",
                "initiallyCollapsed"
            ]);
        }

        if (!values.collapsible) {
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
