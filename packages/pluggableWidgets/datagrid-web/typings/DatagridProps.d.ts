/**
 * This file was generated from Datagrid.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

export type WidthEnum = "autoFill" | "autoFit" | "manual";

export type HidableEnum = "yes" | "hidden" | "no";

export interface ColumnsType {
    attribute: ListAttributeValue<string | BigJs.Big | boolean | Date>;
    header: DynamicValue<string>;
    hasWidgets: boolean;
    filter?: ReactNode;
    content?: ListWidgetValue;
    width: WidthEnum;
    size: number;
    columnClass?: ListExpressionValue<string>;
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
}

export type PagingPositionEnum = "bottom" | "top";

export interface ColumnsPreviewType {
    attribute: string;
    header: string;
    hasWidgets: boolean;
    filter: { widgetCount: number; renderer: ComponentType };
    content: { widgetCount: number; renderer: ComponentType };
    width: WidthEnum;
    size: number | null;
    columnClass: string;
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
}

export interface DatagridContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    datasource: ListValue;
    columns: ColumnsType[];
    showEmptyPlaceholder: boolean;
    emptyPlaceholder?: ReactNode;
    rowClass?: ListExpressionValue<string>;
    columnsFilterable: boolean;
    pageSize: number;
    pagingEnabled: boolean;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    configurationAttribute?: EditableValue<string>;
}

export interface DatagridPreviewProps {
    class: string;
    style: string;
    datasource: {} | null;
    columns: ColumnsPreviewType[];
    showEmptyPlaceholder: boolean;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType };
    rowClass: string;
    columnsFilterable: boolean;
    pageSize: number | null;
    pagingEnabled: boolean;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    configurationAttribute: string;
}
