import { hideProperty, Properties } from "@widgets-resources/piw-utils";
import { BasicItemsType, PopupMenuProps } from "../typings/PopupMenuProps";
import { PopupMenuStyle } from "./ui/Styles";

export function getProperties(values: PopupMenuProps<PopupMenuStyle>, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hideProperty<any>("complexItems", defaultProperties);
        values.basicItems.forEach((item: BasicItemsType, index: number) => {
            if (item.itemType === "divider") {
                hideProperty<any>("caption", defaultProperties?.[0].properties?.[2].properties?.[index]);
                hideProperty<any>("action", defaultProperties?.[0].properties?.[2].properties?.[index]);
                hideProperty<any>("styleClass", defaultProperties?.[0].properties?.[2].properties?.[index]);
            }
        });
    } else {
        hideProperty<any>("basicItems", defaultProperties);
    }
    return defaultProperties;
}
