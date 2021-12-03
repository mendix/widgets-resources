/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, NativeIcon, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type LocationTypeEnum = "address" | "latlng";

export interface MarkersType {
    locationType: LocationTypeEnum;
    address?: DynamicValue<string>;
    latitude?: DynamicValue<Big>;
    longitude?: DynamicValue<Big>;
    title?: DynamicValue<string>;
    description?: DynamicValue<string>;
    onClick?: ActionValue;
    icon?: DynamicValue<NativeIcon>;
    iconSize: number;
    iconColor: string;
}

export type LocationDynamicTypeEnum = "address" | "latlng";

export interface DynamicMarkersType {
    markersDS?: ListValue;
    locationDynamicType: LocationDynamicTypeEnum;
    address?: ListAttributeValue<string>;
    latitude?: ListAttributeValue<Big>;
    longitude?: ListAttributeValue<Big>;
    title?: ListAttributeValue<string>;
    description?: ListAttributeValue<string>;
    onClick?: ListActionValue;
    icon?: DynamicValue<NativeIcon>;
    iconSize: number;
    iconColor: string;
}

export type DefaultZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MinZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MaxZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MapTypeEnum = "standard" | "satellite";

export type ProviderEnum = "default" | "google";

export interface MarkersPreviewType {
    locationType: LocationTypeEnum;
    address: string;
    latitude: string;
    longitude: string;
    title: string;
    description: string;
    onClick: {} | null;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    iconSize: number | null;
    iconColor: string;
}

export interface DynamicMarkersPreviewType {
    markersDS: {} | { type: string } | null;
    locationDynamicType: LocationDynamicTypeEnum;
    address: string;
    latitude: string;
    longitude: string;
    title: string;
    description: string;
    onClick: {} | null;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    iconSize: number | null;
    iconColor: string;
}

export interface MapsProps<Style> {
    name: string;
    style: Style[];
    markers: MarkersType[];
    dynamicMarkers: DynamicMarkersType[];
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
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    markers: MarkersPreviewType[];
    dynamicMarkers: DynamicMarkersPreviewType[];
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
