/**
 * This file was generated from TreeNode.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { DynamicValue, ListValue, ListExpressionValue, ListWidgetValue, WebIcon } from "mendix";

export type HeaderTypeEnum = "text" | "custom";

export type ShowIconEnum = "left" | "right" | "no";

export interface TreeNodeContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advancedMode: boolean;
    datasource: ListValue;
    headerType: HeaderTypeEnum;
    headerContent?: ListWidgetValue;
    headerCaption?: ListExpressionValue<string>;
    hasChildren: boolean;
    startExpanded: boolean;
    children?: ListWidgetValue;
    animate: boolean;
    showIcon: ShowIconEnum;
    expandedIcon?: DynamicValue<WebIcon>;
    collapsedIcon?: DynamicValue<WebIcon>;
    animateIcon: boolean;
}

export interface TreeNodePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    advancedMode: boolean;
    datasource: {} | { type: string } | null;
    headerType: HeaderTypeEnum;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    headerCaption: string;
    hasChildren: boolean;
    startExpanded: boolean;
    children: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    animate: boolean;
    showIcon: ShowIconEnum;
    expandedIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    collapsedIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    animateIcon: boolean;
}
