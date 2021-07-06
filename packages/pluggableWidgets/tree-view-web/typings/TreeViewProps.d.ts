/**
 * This file was generated from TreeView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ListValue, ListExpressionValue, ListWidgetValue } from "mendix";

export type HeaderTypeEnum = "text" | "custom";

export interface TreeViewContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: ListValue;
    headerType: HeaderTypeEnum;
    headerContent?: ListWidgetValue;
    headerCaption?: ListExpressionValue<string>;
    hasChildren: boolean;
    startExpanded: boolean;
    children?: ListWidgetValue;
}

export interface TreeViewPreviewProps {
    class: string;
    style: string;
    datasource: {} | { type: string } | null;
    headerType: HeaderTypeEnum;
    headerContent: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    headerCaption: string;
    hasChildren: boolean;
    startExpanded: boolean;
    children: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
}
