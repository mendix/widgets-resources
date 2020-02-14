/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, WebImage } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type TypeEnum = "advanced" | "basic";

export type DataSourceTypeEnum = "static" | "dynamic";

export type ShapeEnum = "default" | "image";

export interface MarkersType {
    description?: DynamicValue<string>;
    location: DynamicValue<string>;
    onClick?: ActionValue;
    shape: ShapeEnum;
    customMarker?: DynamicValue<WebImage>;
}

export type ZoomEnum = "world" | "continent" | "city" | "street" | "buildings";

export interface MarkersPreviewType {
    description?: string;
    location: string;
    onClick: ActionPreview;
    shape: ShapeEnum;
    customMarker?: WebImage;
}

export interface MarkersVisibilityType {
    description: boolean;
    location: boolean;
    onClick: boolean;
    shape: boolean;
    customMarker: boolean;
}

export interface MapsContainerProps extends CommonProps {
    type: TypeEnum;
    dataSourceType: DataSourceTypeEnum;
    markers: MarkersType[];
    zoom: ZoomEnum;
    apiKey?: DynamicValue<string>;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    type: TypeEnum;
    dataSourceType: DataSourceTypeEnum;
    markers: MarkersPreviewType[];
    zoom: ZoomEnum;
    apiKey?: string;
}

export interface VisibilityMap {
    type: boolean;
    dataSourceType: boolean;
    markers: MarkersVisibilityType[] | boolean;
    zoom: boolean;
    apiKey: boolean;
}
