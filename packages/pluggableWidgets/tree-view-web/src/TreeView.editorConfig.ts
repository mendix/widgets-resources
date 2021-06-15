import { Properties, StructurePreviewProps, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import { TreeViewPreviewProps } from "../typings/TreeViewProps";

export function getProperties(
    _values: TreeViewPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(): StructurePreviewProps | null {
    // TODO:
    return null;
}
