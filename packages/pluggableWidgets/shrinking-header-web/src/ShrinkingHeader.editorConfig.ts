import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

import { ShrinkingHeaderPreviewProps } from "../typings/ShrinkingHeaderProps";

export function getProperties(
    values: ShrinkingHeaderPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.threshold) {
        hidePropertiesIn(defaultProperties, values, ["initHeight", "shrunkHeight"]);
    } else {
        hidePropertyIn(defaultProperties, values, "shrinkThreshold");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
