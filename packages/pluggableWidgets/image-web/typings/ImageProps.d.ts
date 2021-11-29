/**
 * This file was generated from Image.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, WebIcon, WebImage } from "mendix";

export type DatasourceEnum = "image" | "imageUrl" | "icon";

export type OnClickTypeEnum = "action" | "enlarge";

export type WidthUnitEnum = "auto" | "pixels" | "percentage";

export type HeightUnitEnum = "auto" | "pixels";

export type DisplayAsEnum = "fullImage" | "thumbnail";

export interface ImageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: DatasourceEnum;
    imageObject?: DynamicValue<WebImage>;
    defaultImageDynamic?: DynamicValue<WebImage>;
    imageUrl?: DynamicValue<string>;
    imageIcon?: DynamicValue<WebIcon>;
    isBackgroundImage: boolean;
    children?: ReactNode;
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

export interface ImagePreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    datasource: DatasourceEnum;
    imageObject: { type: "static"; imageUrl: string } | { type: "dynamic"; entity: string } | null;
    defaultImageDynamic: { type: "static"; imageUrl: string } | { type: "dynamic"; entity: string } | null;
    imageUrl: string;
    imageIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    isBackgroundImage: boolean;
    children: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
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
