/**
 * This file was generated from ImageViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, WebIcon, WebImage } from "mendix";

export type DatasourceEnum = "image" | "imageUrl" | "icon";

export type OnClickTypeEnum = "action" | "enlarge";

export type WidthUnitEnum = "auto" | "pixels" | "percentage";

export type HeightUnitEnum = "auto" | "pixels";

export type DisplayAsEnum = "fullImage" | "thumbnail";

export interface ImageViewerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: DatasourceEnum;
    imageObject?: DynamicValue<WebImage>;
    imageUrl?: DynamicValue<string>;
    imageIcon?: DynamicValue<WebIcon>;
    onClickType: OnClickTypeEnum;
    onClick?: ActionValue;
    alternativeText?: DynamicValue<string>;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    iconSize: number;
    displayAs: DisplayAsEnum;
    responsive: boolean;
}

export interface ImageViewerPreviewProps {
    class: string;
    style: string;
    datasource: DatasourceEnum;
    imageObject: string;
    imageUrl: string;
    imageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    onClickType: OnClickTypeEnum;
    onClick: {} | null;
    alternativeText: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    iconSize: number | null;
    displayAs: DisplayAsEnum;
    responsive: boolean;
}
