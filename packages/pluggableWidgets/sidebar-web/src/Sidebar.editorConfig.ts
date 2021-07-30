import {
    hidePropertiesIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

import { SidebarPreviewProps } from "../typings/SidebarProps";

export function getProperties(
    values: SidebarPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.toggleMode === "none" && values.toggleMode === "push" && values.toggleMode === "slideOver") {
        hidePropertiesIn(defaultProperties, values, ["collapsedWidthUnit", "collapsedWidthValue"]);

        if (values.toggleMode === "none") {
            hidePropertiesIn(defaultProperties, values, ["expandedWidthUnit", "expandedWidthValue"]);
        }
    }

    if (values.toggleMode !== "none") {
        hidePropertiesIn(defaultProperties, values, ["widthUnit", "widthValue"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}

export function getPreview(_values: SidebarPreviewProps): StructurePreviewProps | null {
    // TODO: implement
    return null;
}
