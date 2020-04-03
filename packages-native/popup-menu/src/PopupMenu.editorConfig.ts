import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { BasicItemsType, PopupMenuProps } from "../typings/PopupMenuProps";
import { PopupMenuStyle } from "./ui/Styles";

export function getProperties(values: PopupMenuProps<PopupMenuStyle>, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hidePropertyIn(defaultProperties, "complexItems");
        values.basicItems.forEach((item: BasicItemsType, index: number) => {
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
