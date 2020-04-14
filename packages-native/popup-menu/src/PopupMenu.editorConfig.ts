import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { BasicItemsPreviewType, PopupMenuPreviewProps } from "../typings/PopupMenuProps";

export function getProperties(values: PopupMenuPreviewProps, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hidePropertyIn(defaultProperties, "complexItems");
        values.basicItems.forEach((item: BasicItemsPreviewType, index: number) => {
            if (item.itemType === "divider") {
                hidePropertyIn(defaultProperties, "basicItems", index, "caption");
                hidePropertyIn(defaultProperties, "basicItems", index, "action");
                hidePropertyIn(defaultProperties, "basicItems", index, "styleClass");
            }
        });
    } else {
        hidePropertyIn(defaultProperties, "basicItems");
    }
    return defaultProperties;
}
