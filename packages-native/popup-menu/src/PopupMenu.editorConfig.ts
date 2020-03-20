import { hideProperty, Properties } from "@widgets-resources/piw-utils";
import { ItemsBasicType } from "../typings/PopupMenuProps";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hideProperty<any>("itemsComplex", defaultProperties);
        values.itemsBasic.forEach((item: ItemsBasicType, index: number) => {
            if (item.itemType === "divider") {
                hideProperty<any>("caption", defaultProperties?.[0].properties?.[2].properties?.[index]);
                hideProperty<any>("action", defaultProperties?.[0].properties?.[2].properties?.[index]);
                hideProperty<any>("styleClass", defaultProperties?.[0].properties?.[2].properties?.[index]);
            }
        });
    } else {
        hideProperty<any>("itemsBasic", defaultProperties);
    }
    if (values.typePopUp !== "Popover") {
        hideProperty<any>("preferredLocation", defaultProperties);
    } else {
        hideProperty<any>("animate", defaultProperties);
    }
    return defaultProperties;
}
