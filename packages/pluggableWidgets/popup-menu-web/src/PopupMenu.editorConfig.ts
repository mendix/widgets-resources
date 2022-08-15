import {
    ContainerProps,
    DropZoneProps,
    RowLayoutProps,
    SelectableProps,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";
import {
    changePropertyIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { BasicItemsPreviewType, PopupMenuPreviewProps } from "../typings/PopupMenuProps";

export function getProperties(
    values: PopupMenuPreviewProps,
    defaultProperties: Properties,
    target: "web" | "desktop"
): Properties {
    if (target === "desktop") {
        hidePropertyIn(defaultProperties, values, "menuToggle");
    }
    if (!values.advancedMode) {
        hidePropertyIn(defaultProperties, values, "customItems");

        values.basicItems.forEach((item: BasicItemsPreviewType, index: number) => {
            const changeStyleDescription = (value: string) =>
                changePropertyIn(
                    defaultProperties,
                    values,
                    prop => {
                        prop.description = prop.description?.replace(/".*"/, `"popupmenu-basic-item-${value}"`);
                    },
                    "basicItems",
                    index,
                    "styleClass"
                );

            if (item.itemType === "divider") {
                hidePropertyIn(defaultProperties, values, "basicItems", index, "caption");
                hidePropertyIn(defaultProperties, values, "basicItems", index, "action");
                hidePropertyIn(defaultProperties, values, "basicItems", index, "styleClass");
                hidePropertyIn(defaultProperties, values, "basicItems", index, "visible");
            }
            if (item.styleClass === "defaultStyle") {
                changePropertyIn(
                    defaultProperties,
                    values,
                    prop => {
                        prop.description = "";
                    },
                    "basicItems",
                    index,
                    "styleClass"
                );
            }
            if (item.styleClass === "inverseStyle") {
                changeStyleDescription("inverse");
            } else if (item.styleClass === "primaryStyle") {
                changeStyleDescription("primary");
            } else if (item.styleClass === "infoStyle") {
                changeStyleDescription("info");
            } else if (item.styleClass === "successStyle") {
                changeStyleDescription("success");
            } else if (item.styleClass === "warningStyle") {
                changeStyleDescription("warning");
            } else if (item.styleClass === "dangerStyle") {
                changeStyleDescription("danger");
            }
        });
    } else {
        hidePropertyIn(defaultProperties, values, "basicItems");
    }

    if (target === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}

export function check(values: PopupMenuPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (!values.advancedMode) {
        if (!values.basicItems.length) {
            errors.push({
                property: "basicItems",
                message: "For the popup menu to be visible, you need to add at least one item to it."
            });
        }
        values.basicItems.forEach((item, index) => {
            if (item.itemType === "item" && !item.caption) {
                errors.push({
                    property: `basicItems/${index + 1}/caption`,
                    message: "The 'Caption' property is required."
                });
            }
        });
    } else {
        if (!values.customItems.length) {
            errors.push({
                property: "customItems",
                message: "For the popup menu to be visible, you need to add at least one item to it."
            });
        }
    }
    return errors;
}

export function getPreview(values: PopupMenuPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    if (values.advancedMode) {
        return null;
    }

    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: isDarkMode ? "#4F4F4F" : "#F5F5F5",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Pop-up menu",
                        fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                    }
                ]
            }
        ]
    };

    return {
        type: "Container",
        children: [
            titleHeader,
            {
                type: "Container",
                backgroundColor:
                    values.menuTrigger.widgetCount === 0 ? (isDarkMode ? undefined : "#F5F5F5") : undefined,
                children: [
                    {
                        type: "DropZone",
                        property: values.menuTrigger,
                        placeholder: "Place menu trigger widget here"
                    } as DropZoneProps
                ]
            } as ContainerProps,
            {
                type: "Container",
                padding: 1,
                children: []
            } as ContainerProps,
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        borders: true,
                        borderRadius: 8,
                        grow: 0,
                        children: [...buildMenuItems(values)]
                    } as ContainerProps,
                    {
                        // To create some space on the right so the menu items don't take full width.
                        type: "Container",
                        children: []
                    } as ContainerProps
                ]
            } as RowLayoutProps
        ]
    } as ContainerProps;

    function buildMenuItems(values: PopupMenuPreviewProps): StructurePreviewProps[] {
        return values.basicItems.map(
            item =>
                ({
                    type: "Container",
                    backgroundColor:
                        item.itemType === "divider"
                            ? isDarkMode
                                ? "#848484"
                                : "#ced0d3"
                            : isDarkMode
                            ? "#313131"
                            : "#fff",
                    children: [
                        {
                            type: "Selectable",
                            object: item,
                            child: {
                                type: "Container",
                                padding: item.itemType === "divider" ? 1 : 12,
                                children: [
                                    {
                                        type: "Text",
                                        fontColor: isDarkMode ? "#DEDEDE" : "#555555",
                                        content: item.caption
                                    } as TextProps
                                ]
                            } as ContainerProps
                        } as SelectableProps
                    ]
                } as ContainerProps)
        );
    }
}
