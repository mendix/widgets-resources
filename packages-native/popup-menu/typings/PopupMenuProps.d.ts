/**
 * This file was generated from PopupMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type RenderModeEnum = "basic" | "custom";

export type ItemTypeEnum = "item" | "divider";

export type StyleClassEnum = "default" | "primary" | "danger";

export interface ItemsBasicType {
    itemType: ItemTypeEnum;
    caption?: string;
    action?: ActionValue;
    styleClass: StyleClassEnum;
}

export interface ItemsComplexType {
    content: ReactNode;
    action?: ActionValue;
}

export interface PopupMenuProps<Style> extends CommonProps<Style> {
    menuTriggerer?: ReactNode;
    renderMode: RenderModeEnum;
    itemsBasic: ItemsBasicType[];
    itemsComplex: ItemsComplexType[];
    handleBackButtonAndroid: boolean;
}
