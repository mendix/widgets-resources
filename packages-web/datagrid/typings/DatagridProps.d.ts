/**
 * This file was generated from Datagrid.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue, ListValue, ObjectItem } from "mendix";

export type HidableEnum = "yes" | "hidden" | "no";

export interface ColumnsType {
    attribute: (item: ObjectItem) => EditableValue<string | BigJs.Big | boolean | Date>;
    header: DynamicValue<string>;
    hasWidgets: boolean;
    content: ReactNode;
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
    affixColumn: boolean;
}

export type PagingPositionEnum = "bottom" | "top";

export interface ColumnsPreviewType {
    attribute: string;
    header: string;
    hasWidgets: boolean;
    content: { widgetCount: number; renderer: ComponentType };
    sortable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
    affixColumn: boolean;
}

export interface DatagridContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    datasource: ListValue;
    columns: ColumnsType[];
    affixHeader: boolean;
    headerWidgets?: ReactNode;
    affixFooter: boolean;
    footerWidgets?: ReactNode;
    pagingEnabled: boolean;
    pageSize?: number;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    userConfigStorage?: EditableValue<string>;
}

export interface DatagridPreviewProps {
    class: string;
    style: string;
    datasource: {} | null;
    columns: ColumnsPreviewType[];
    affixHeader: boolean;
    headerWidgets: { widgetCount: number; renderer: ComponentType };
    affixFooter: boolean;
    footerWidgets: { widgetCount: number; renderer: ComponentType };
    pagingEnabled: boolean;
    pageSize: number | null;
    pagingPosition: PagingPositionEnum;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    userConfigStorage: string;
}
