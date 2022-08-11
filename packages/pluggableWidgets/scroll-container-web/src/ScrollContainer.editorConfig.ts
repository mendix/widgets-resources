import { hidePropertiesIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";
import { ScrollContainerContainerProps } from "../typings/ScrollContainerProps";

export function getProperties(
    values: ScrollContainerContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.widthType === "full") {
        hidePropertiesIn(defaultProperties, values, ["widthPixels", "widthPercentage"]);
    } else if (values.widthType === "percentage") {
        hidePropertiesIn(defaultProperties, values, ["widthPixels"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["widthPercentage"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
