import { hidePropertiesIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { RadioWebPreviewProps } from "../typings/RadioWebProps";

export function getProperties(
    values: RadioWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.datasType === "dynamic") {
        hidePropertiesIn(defaultProperties, values, ["staticData"]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["data", "attribute", "title", "attributedata"]);
    }
    if (values.optionType === "default") {
        hidePropertiesIn(defaultProperties, values, ["size", "buttonStyle"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
