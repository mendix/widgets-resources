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

export type TypeEnum = "basic" | "advanced";

export interface MarkersType {
    location: DynamicValue<string>;
    onClick?: ActionValue;
}

export type ShapeEnum = "default" | "image";

export type ZoomEnum = "world" | "continent" | "city" | "street" | "buildings";

export interface MarkersPreviewType {
    location: string;
    onClick: ActionPreview;
}

export interface MarkersVisibilityType {
    location: boolean;
    onClick: boolean;
}

export interface MapsContainerProps extends CommonProps {
    type: TypeEnum;
    markers: MarkersType[];
    shape: ShapeEnum;
    customMarker?: DynamicValue<WebImage>;
    zoom: ZoomEnum;
    apiKey?: DynamicValue<string>;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    type: TypeEnum;
    markers: MarkersPreviewType[];
    shape: ShapeEnum;
    customMarker?: WebImage;
    zoom: ZoomEnum;
    apiKey?: string;
}

export interface VisibilityMap {
    type: boolean;
    markers: MarkersVisibilityType[] | boolean;
    shape: boolean;
    customMarker: boolean;
    zoom: boolean;
    apiKey: boolean;
}
