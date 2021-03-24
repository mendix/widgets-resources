import { parseStyle, dynamicValue } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { PopupMenu as PopupMenuComponent } from "./components/PopupMenu";

import { BasicItemsType, CustomItemsType, PopupMenuPreviewProps } from "../typings/PopupMenuProps";

export function getPreviewCss(): string {
    return require("./ui/PopupMenu.scss") + require("./ui/PopupMenuPreview.scss");
}

export function preview(props: PopupMenuPreviewProps) {
    const basicItems: BasicItemsType[] = [];
    const customItems: CustomItemsType[] = [];
    const styles = parseStyle(props.style);

    if (!props.advancedMode) {
        props.basicItems.forEach(item => {
            basicItems.push({
                itemType: item.itemType,
                caption: dynamicValue(item.caption),
                action: undefined,
                styleClass: item.styleClass
            });
        });
    } else {
        props.customItems.forEach(item => {
            customItems.push({
                action: undefined,
                content: (
                    <item.content.renderer>
                        <div />
                    </item.content.renderer>
                )
            });
        });
    }

    return (
        <PopupMenuComponent
            {...props}
            basicItems={basicItems}
            customItems={customItems}
            menuTrigger={
                <props.menuTrigger.renderer>
                    <div />
                </props.menuTrigger.renderer>
            }
            name="Popup Menu"
            preview
            style={styles}
            tabIndex={0}
        />
    );
}
