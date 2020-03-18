import { hideProperty, Properties } from "@widgets-resources/piw-utils";
import { ItemsBasicType } from "../typings/PopupMenuProps";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    if (values.renderMode === "basic") {
        hideProperty<any>("itemsComplex", defaultProperties);
        console.log("item type:", values);
        console.log("properties", defaultProperties);
        if (values.itemsBasic.length > 0) {
            // TODO: This wont work because we want to hide the specific item's
            // properties, which means extending hideProperty
            values.itemsBasic.forEach((item: ItemsBasicType) => {
                if (item.itemType === "divider") {
                    hideProperty<any>("caption", defaultProperties);
                    hideProperty<any>("action", defaultProperties);
                    hideProperty<any>("styleClass", defaultProperties);
                }
            });
        }
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
