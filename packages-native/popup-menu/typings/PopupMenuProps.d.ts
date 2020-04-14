/**
 * This file was generated from PopupMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue } from "mendix";

export type RenderModeEnum = "basic" | "custom";

export type ItemTypeEnum = "item" | "divider";

export type StyleClassEnum = "default" | "primary" | "danger";

export interface BasicItemsType {
    itemType: ItemTypeEnum;
    caption?: string;
    action?: ActionValue;
    styleClass: StyleClassEnum;
}

export interface ComplexItemsType {
    content: ReactNode;
    action?: ActionValue;
}

export interface BasicItemsPreviewType {
    itemType: ItemTypeEnum;
    caption: string;
    action: {} | null;
    styleClass: StyleClassEnum;
}

export interface ComplexItemsPreviewType {
    content: { widgetCount: number; renderer: ComponentType };
    action: {} | null;
}

export interface PopupMenuProps<Style> {
    name: string;
    style: Style[];
    menuTriggerer?: ReactNode;
    renderMode: RenderModeEnum;
    basicItems: BasicItemsType[];
    complexItems: ComplexItemsType[];
}

export interface PopupMenuPreviewProps {
    class: string;
    style: string;
    menuTriggerer: { widgetCount: number; renderer: ComponentType };
    renderMode: RenderModeEnum;
    basicItems: BasicItemsPreviewType[];
    complexItems: ComplexItemsPreviewType[];
}
