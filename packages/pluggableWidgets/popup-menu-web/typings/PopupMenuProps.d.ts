/**
 * This file was generated from PopupMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type RenderModeEnum = "basic" | "custom";

export type ItemTypeEnum = "item" | "divider";

export type StyleClassEnum = "defaultStyle" | "primaryStyle" | "dangerStyle" | "customStyle";

export interface BasicItemsType {
    itemType: ItemTypeEnum;
    caption?: DynamicValue<string>;
    action?: ActionValue;
    styleClass: StyleClassEnum;
}

export interface CustomItemsType {
    content: ReactNode;
    action?: ActionValue;
}

export type TriggerEnum = "onclick" | "onhover";

export type PositionEnum = "left" | "right" | "top" | "bottom";

export interface BasicItemsPreviewType {
    itemType: ItemTypeEnum;
    caption: string;
    action: {} | null;
    styleClass: StyleClassEnum;
}

export interface CustomItemsPreviewType {
    content: { widgetCount: number; renderer: ComponentType };
    action: {} | null;
}

export interface PopupMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    menuTrigger?: ReactNode;
    renderMode: RenderModeEnum;
    basicItems: BasicItemsType[];
    customItems: CustomItemsType[];
    trigger: TriggerEnum;
    position: PositionEnum;
    menuToggle: boolean;
}

export interface PopupMenuPreviewProps {
    class: string;
    style: string;
    menuTrigger: { widgetCount: number; renderer: ComponentType };
    renderMode: RenderModeEnum;
    basicItems: BasicItemsPreviewType[];
    customItems: CustomItemsPreviewType[];
    trigger: TriggerEnum;
    position: PositionEnum;
    menuToggle: boolean;
}
