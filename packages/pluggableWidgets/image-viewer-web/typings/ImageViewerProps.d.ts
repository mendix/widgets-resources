/**
 * This file was generated from ImageViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, WebIcon, WebImage } from "mendix";

export type DatasourceEnum = "image" | "imageUrl" | "icon";

export type WidthUnitEnum = "auto" | "pixels" | "percentage";

export type HeightUnitEnum = "auto" | "pixels";

export type OnClickTypeEnum = "action" | "enlarge";

export interface ImageViewerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: DatasourceEnum;
    imageObject?: DynamicValue<WebImage>;
    imageUrl?: DynamicValue<string>;
    imageIcon?: DynamicValue<WebIcon>;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    iconSize: number;
    responsive: boolean;
    onClickType: OnClickTypeEnum;
    onClick?: ActionValue;
}

export interface ImageViewerPreviewProps {
    class: string;
    style: string;
    datasource: DatasourceEnum;
    imageObject: string;
    imageUrl: string;
    imageIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    iconSize: number | null;
    responsive: boolean;
    onClickType: OnClickTypeEnum;
    onClick: {} | null;
}
