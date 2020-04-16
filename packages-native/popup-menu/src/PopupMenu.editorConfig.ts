import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { BasicItemsPreviewType, PopupMenuPreviewProps } from "../typings/PopupMenuProps";

export function getProperties(values: PopupMenuPreviewProps, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hidePropertyIn(defaultProperties, values, "customItems");

        values.basicItems.forEach((item: BasicItemsPreviewType, index: number) => {
            if (item.itemType === "divider") {
                hidePropertyIn(defaultProperties, values, "basicItems", index, "caption");
                hidePropertyIn(defaultProperties, values, "basicItems", index, "action");
                hidePropertyIn(defaultProperties, values, "basicItems", index, "styleClass");
            }
        });
    } else {
        hidePropertyIn(defaultProperties, values, "basicItems");
    }
    return defaultProperties;
}
