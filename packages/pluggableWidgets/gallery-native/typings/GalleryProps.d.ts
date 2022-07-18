/**
 * This file was generated from Gallery.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, ListValue, ListActionValue, ListExpressionValue, ListWidgetValue } from "mendix";

export type ScrollDirectionEnum = "vertical" | "horizontal";

export type PaginationEnum = "buttons" | "virtualScrolling";

export type PagingPositionEnum = "below" | "above";

export type ShowEmptyPlaceholderEnum = "none" | "custom";

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
    pagingPosition: PagingPositionEnum;
    pagingButtonText: string;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder?: ReactNode;
    itemClass?: ListExpressionValue<string>;
    onClick?: ListActionValue;
    pullDown?: ActionValue;
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
    pagingPosition: PagingPositionEnum;
    pagingButtonText: string;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    emptyPlaceholder: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    itemClass: string;
    onClick: {} | null;
    pullDown: {} | null;
}
