import { changePropertyIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
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
        values.basicItems.forEach(item => {
            if (item.itemType === "item" && !item.caption) {
                errors.push({
                    property: "basicItems.caption",
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
        values.customItems.forEach(item => {
            if (!item.content) {
                errors.push({
                    property: "customItems.content",
                    message: "The content of a menu item cannot be empty."
                });
            }
        });
    }
    return errors;
}
