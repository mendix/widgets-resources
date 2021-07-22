import {
    hidePropertiesIn,
    hidePropertyIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { TreeViewPreviewProps } from "../typings/TreeViewProps";

export function getProperties(
    values: TreeViewPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.advancedMode) {
        hidePropertiesIn(defaultProperties, values, ["showIcon", "expandIcon", "collapseIcon"]);
    }

    if (values.showIcon === "no") {
        hidePropertiesIn(defaultProperties, values, ["expandIcon", "collapseIcon"]);
    }

    if (values.headerType === "text") {
        hidePropertyIn(defaultProperties, values, "headerContent");
    } else if (values.headerType === "custom") {
        hidePropertyIn(defaultProperties, values, "headerCaption");
    }

    if (values.shouldLazyLoad) {
        hidePropertyIn(defaultProperties, values, "startExpanded");
    }

    if (!values.hasChildren) {
        hidePropertiesIn(defaultProperties, values, ["startExpanded", "children"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(): StructurePreviewProps | null {
    // TODO:
    return null;
}
