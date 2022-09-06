/**
 * This file was generated from Gallery.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import {
    ActionValue,
    DynamicValue,
    ListValue,
    ListActionValue,
    ListAttributeValue,
    ListExpressionValue,
    ListWidgetValue
} from "mendix";
import { Big } from "big.js";

export type ScrollDirectionEnum = "vertical" | "horizontal";

export type PaginationEnum = "virtualScrolling" | "buttons";

export interface FilterListType {
    filter: ListAttributeValue<string | Big | boolean | Date>;
}

export interface SortListType {
    attribute: ListAttributeValue<string | Big | boolean | Date>;
    caption: DynamicValue<string>;
}

export interface FilterListPreviewType {
    filter: string;
}

export interface SortListPreviewType {
    attribute: string;
    caption: string;
}

export interface GalleryProps<Style> {
    name: string;
    style: Style[];
    datasource: ListValue;
    content?: ListWidgetValue;
    scrollDirection: ScrollDirectionEnum;
    tabletColumns: number;
    phoneColumns: number;
    pageSize: number;
    pagination: PaginationEnum;
    loadMoreButtonCaption?: DynamicValue<string>;
    emptyPlaceholder?: ReactNode;
    itemClass?: ListExpressionValue<string>;
    onClick?: ListActionValue;
    pullDown?: ActionValue;
    filterList: FilterListType[];
    filtersPlaceholder?: ReactNode;
    sortList: SortListType[];
}

export interface GalleryPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    datasource: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    scrollDirection: ScrollDirectionEnum;
    tabletColumns: number | null;
    phoneColumns: number | null;
    pageSize: number | null;
    pagination: PaginationEnum;
    loadMoreButtonCaption: string;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    itemClass: string;
    onClick: {} | null;
    pullDown: {} | null;
    filterList: FilterListPreviewType[];
    filtersPlaceholder: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    sortList: SortListPreviewType[];
}
