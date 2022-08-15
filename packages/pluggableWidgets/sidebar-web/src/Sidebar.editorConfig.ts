import { DropZoneProps, RowLayoutProps, StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertiesIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

import { SidebarPreviewProps } from "../typings/SidebarProps";

export function getProperties(
    values: SidebarPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.toggleMode === "none" || values.toggleMode === "push" || values.toggleMode === "slideOver") {
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

export function getPreview(values: SidebarPreviewProps): StructurePreviewProps | null {
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: "#daeffb",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Sidebar",
                        fontColor: "#2074c8"
                    }
                ]
            }
        ]
    };
    const content = {
        type: "RowLayout",
        columnSize: "fixed",
        borders: true,
        children: [
            {
                type: "DropZone",
                property: values.contents,
                placeholder: "Place your menu widget(s) here."
            } as DropZoneProps
        ]
    } as RowLayoutProps;

    return {
        type: "Container",
        children: [titleHeader, content]
    };
}
