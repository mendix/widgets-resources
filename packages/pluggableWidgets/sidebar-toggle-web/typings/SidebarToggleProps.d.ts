/**
 * This file was generated from SidebarToggle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, WebIcon } from "mendix";

export type RenderModeEnum = "button" | "link";

export type RoleEnum =
    | "button"
    | "link"
    | "checkbox"
    | "tab"
    | "menu_item"
    | "menu_item_checkbox"
    | "menu_item_radio"
    | "option"
    | "switch"
    | "tree_item";

export interface SidebarToggleContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    caption?: DynamicValue<string>;
    tooltip?: DynamicValue<string>;
    icon?: DynamicValue<WebIcon>;
    renderMode: RenderModeEnum;
    role: RoleEnum;
}

export interface SidebarTogglePreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    caption: string;
    tooltip: string;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    renderMode: RenderModeEnum;
    role: RoleEnum;
}
