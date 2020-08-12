/**
 * This file was generated from Datagrid.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";

export type FilterableEnum = "yes" | "no" | "custom";

export type HidableEnum = "yes" | "hidden" | "no";

export interface ColumnsType {
    attribute: ListAttributeValue<string | BigJs.Big | boolean | Date>;
    header: DynamicValue<string>;
    hasWidgets: boolean;
    content?: ListWidgetValue;
    sortable: boolean;
    filterable: FilterableEnum;
    customFilter?: ReactNode;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
}

export type PagingPositionEnum = "bottom" | "top";

export interface ColumnsPreviewType {
    attribute: string;
    header: string;
    hasWidgets: boolean;
    content: { widgetCount: number; renderer: ComponentType };
    sortable: boolean;
    filterable: FilterableEnum;
    customFilter: { widgetCount: number; renderer: ComponentType };
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
    showHeader: boolean;
    headerWidgets?: ReactNode;
    showFooter: boolean;
    footerWidgets?: ReactNode;
    pageSize: number;
    pagingEnabled: boolean;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsFilterable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
}

export interface DatagridPreviewProps {
    class: string;
    style: string;
    datasource: {} | null;
    columns: ColumnsPreviewType[];
    showHeader: boolean;
    headerWidgets: { widgetCount: number; renderer: ComponentType };
    showFooter: boolean;
    footerWidgets: { widgetCount: number; renderer: ComponentType };
    pageSize: number | null;
    pagingEnabled: boolean;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsFilterable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
}
