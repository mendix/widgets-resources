/**
 * This file was generated from Gallery.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import {
    DynamicValue,
    ListValue,
    ListActionValue,
    ListAttributeValue,
    ListExpressionValue,
    ListWidgetValue
} from "mendix";
import { Big } from "big.js";

export type PaginationEnum = "buttons" | "virtualScrolling";

export type PagingPositionEnum = "below" | "above";

export type ShowEmptyPlaceholderEnum = "none" | "custom";

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

export interface GalleryContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advanced: boolean;
    datasource: ListValue;
    content?: ListWidgetValue;
    desktopItems: number;
    tabletItems: number;
    phoneItems: number;
    pageSize: number;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder?: ReactNode;
    itemClass?: ListExpressionValue<string>;
    onClick?: ListActionValue;
    filterList: FilterListType[];
    filtersPlaceholder?: ReactNode;
    sortList: SortListType[];
    filterSectionTitle?: DynamicValue<string>;
    emptyMessageTitle?: DynamicValue<string>;
}

export interface GalleryPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    advanced: boolean;
    datasource: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    desktopItems: number | null;
    tabletItems: number | null;
    phoneItems: number | null;
    pageSize: number | null;
    pagination: PaginationEnum;
    pagingPosition: PagingPositionEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    itemClass: string;
    onClick: {} | null;
    filterList: FilterListPreviewType[];
    filtersPlaceholder: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    sortList: SortListPreviewType[];
    filterSectionTitle: string;
    emptyMessageTitle: string;
}
