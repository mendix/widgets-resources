/**
 * This file was generated from PopupMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type TypeEnum = "basic" | "freeModaling";

export interface ItemsBasicType {
    caption: string;
    color?: string;
    condition?: DynamicValue<boolean>;
    action?: ActionValue;
}

export type RenderModeEnum = "contextMenu" | "notAnimatedContextMenu" | "slideInMenu" | "popOpver";

export type PreferredLocationEnum = "auto" | "bottom" | "left" | "right" | "top";

export interface PopupMenuProps<Style> extends CommonProps<Style> {
    menuTriggerer?: ReactNode;
    type: TypeEnum;
    itemsBasic: ItemsBasicType[];
    renderMode: RenderModeEnum;
    preferredLocation: PreferredLocationEnum;
    handleBackButtonAndroid: boolean;
}
