import { parseStyle } from "@widgets-resources/piw-utils";
import { createElement } from "react";
import { PopupMenu as PopupMenuComponent } from "./components/PopupMenu";

import { BasicItemsType, CustomItemsType, PopupMenuPreviewProps } from "../typings/PopupMenuProps";

export function getPreviewCss(): string {
    return require("./ui/PopupMenu.scss");
}

export let dynamicDocument: Document = document;
export let dynamicWindow: Window = window;

export function preview(props: PopupMenuPreviewProps) {
    const basicItems: BasicItemsType[] = [];
    const customItems: CustomItemsType[] = [];
    const styles = parseStyle(props.style);

    const iframe: HTMLIFrameElement | null = document.querySelector(".page-editor-iframe");
    const iframeWindow = iframe?.contentWindow;
    const iframeDocument = iframe?.contentDocument;
    dynamicWindow = preview && iframeWindow ? iframeWindow : window;
    dynamicDocument = preview && iframeDocument ? iframeDocument : document;

    if (props.renderMode === "basic") {
        props.basicItems.forEach(item => {
            basicItems.push({
                itemType: item.itemType,
                caption: item.caption,
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
