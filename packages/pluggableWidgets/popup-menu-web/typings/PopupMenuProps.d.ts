/**
 * This file was generated from PopupMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type ItemTypeEnum = "item" | "divider";

export type StyleClassEnum =
    | "defaultStyle"
    | "inverseStyle"
    | "primaryStyle"
    | "infoStyle"
    | "successStyle"
    | "warningStyle"
    | "dangerStyle";

export interface BasicItemsType {
    itemType: ItemTypeEnum;
    caption?: DynamicValue<string>;
    visible?: DynamicValue<boolean>;
    action?: ActionValue;
    styleClass: StyleClassEnum;
}

export interface CustomItemsType {
    content: ReactNode;
    visible?: DynamicValue<boolean>;
    action?: ActionValue;
}

export type TriggerEnum = "onclick" | "onhover";

export type PositionEnum = "left" | "right" | "top" | "bottom";

export interface BasicItemsPreviewType {
    itemType: ItemTypeEnum;
    caption: string;
    visible: string;
    action: {} | null;
    styleClass: StyleClassEnum;
}

export interface CustomItemsPreviewType {
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    visible: string;
    action: {} | null;
}

export interface PopupMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advancedMode: boolean;
    menuTrigger?: ReactNode;
    basicItems: BasicItemsType[];
    customItems: CustomItemsType[];
    trigger: TriggerEnum;
    position: PositionEnum;
    menuToggle: boolean;
}

export interface PopupMenuPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    advancedMode: boolean;
    menuTrigger: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    basicItems: BasicItemsPreviewType[];
    customItems: CustomItemsPreviewType[];
    trigger: TriggerEnum;
    position: PositionEnum;
    menuToggle: boolean;
}
