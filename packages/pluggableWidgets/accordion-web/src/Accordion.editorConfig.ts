import { hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

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
        hidePropertyIn(defaultProperties, values, "collapseBehavior");
    }

    if (!values.advancedMode) {
        hidePropertyIn(defaultProperties, values, "animate");
        hidePropertyIn(defaultProperties, values, "showIcon");
        hidePropertyIn(defaultProperties, values, "openIcon");
        hidePropertyIn(defaultProperties, values, "closedIcon");
        hidePropertyIn(defaultProperties, values, "animateIcon");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
