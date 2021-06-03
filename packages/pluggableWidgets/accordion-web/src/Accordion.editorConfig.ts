import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

import { AccordionContainerProps } from "../typings/AccordionProps";

export function getProperties(
    values: AccordionContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.groups.forEach((group, index) => {
        if (group.headerRenderMode === "text") {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerContent");
        } else {
            hidePropertyIn(defaultProperties, values, "groups", index, "headerText");
        }
    });

    if (!values.collapsible) {
        hidePropertiesIn(defaultProperties, values, [
            "collapseBehavior",
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
