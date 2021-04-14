/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, NativeIcon } from "mendix";
import { Big } from "big.js";

export interface MarkersType {
    address?: DynamicValue<string>;
    latitude?: DynamicValue<Big>;
    longitude?: DynamicValue<Big>;
    title?: DynamicValue<string>;
    description?: DynamicValue<string>;
    onClick?: ActionValue;
    icon?: DynamicValue<NativeIcon>;
    iconSize: number;
    color: string;
}

export type DefaultZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MinZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MaxZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MapTypeEnum = "standard" | "satellite";

export type ProviderEnum = "default" | "google";

export interface MarkersPreviewType {
    address: string;
    latitude: string;
    longitude: string;
    title: string;
    description: string;
    onClick: {} | null;
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    iconSize: number | null;
    color: string;
}

export interface MapsProps<Style> {
    name: string;
    style: Style[];
    markers: MarkersType[];
    fitToMarkers: boolean;
    centerAddress?: DynamicValue<string>;
    centerLatitude?: DynamicValue<Big>;
    centerLongitude?: DynamicValue<Big>;
    defaultZoomLevel: DefaultZoomLevelEnum;
    minZoomLevel: MinZoomLevelEnum;
    maxZoomLevel: MaxZoomLevelEnum;
    mapType: MapTypeEnum;
    provider: ProviderEnum;
    interactive: boolean;
    showsUserLocation: boolean;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    markers: MarkersPreviewType[];
    fitToMarkers: boolean;
    centerAddress: string;
    centerLatitude: string;
    centerLongitude: string;
    defaultZoomLevel: DefaultZoomLevelEnum;
    minZoomLevel: MinZoomLevelEnum;
    maxZoomLevel: MaxZoomLevelEnum;
    mapType: MapTypeEnum;
    provider: ProviderEnum;
    interactive: boolean;
    showsUserLocation: boolean;
}
