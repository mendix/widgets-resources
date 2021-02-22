/**
 * This file was generated from Datagrid.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

export type HidableEnum = "yes" | "hidden" | "no";

export type ShowContentAsEnum = "attribute" | "dynamicText" | "customContent";

export type WidthEnum = "autoFill" | "autoFit" | "manual";

export type AlignmentEnum = "left" | "center" | "right";

export interface ColumnsType {
    header?: DynamicValue<string>;
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
    filter?: ReactNode;
    showContentAs: ShowContentAsEnum;
    attribute?: ListAttributeValue<string | BigJs.Big | boolean | Date>;
    content?: ListWidgetValue;
    dynamicText?: ListExpressionValue<string>;
    width: WidthEnum;
    size: number;
    alignment: AlignmentEnum;
    columnClass?: ListExpressionValue<string>;
}

export type PaginationEnum = "buttons" | "virtualScrolling";

export type PagingPositionEnum = "bottom" | "top";

export interface ColumnsPreviewType {
    header: string;
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
    filter: { widgetCount: number; renderer: ComponentType };
    showContentAs: ShowContentAsEnum;
    attribute: string;
    content: { widgetCount: number; renderer: ComponentType };
    dynamicText: string;
    width: WidthEnum;
    size: number | null;
    alignment: AlignmentEnum;
    columnClass: string;
}

export interface DatagridContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: ListValue;
    columns: ColumnsType[];
    showEmptyPlaceholder: boolean;
    emptyPlaceholder?: ReactNode;
    onClick?: ListActionValue;
    rowClass?: ListExpressionValue<string>;
    columnsFilterable: boolean;
    pageSize: number;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    configurationAttribute?: EditableValue<string>;
    onConfigurationChange?: ActionValue;
}

export interface DatagridPreviewProps {
    class: string;
    style: string;
    datasource: {} | null;
    columns: ColumnsPreviewType[];
    showEmptyPlaceholder: boolean;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType };
    onClick: {} | null;
    rowClass: string;
    columnsFilterable: boolean;
    pageSize: number | null;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    configurationAttribute: string;
    onConfigurationChange: {} | null;
}
