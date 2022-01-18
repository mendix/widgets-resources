import { Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { ColorPickerPreviewProps } from "../typings/ColorPickerProps";

export function getProperties(
    __values: ColorPickerPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
