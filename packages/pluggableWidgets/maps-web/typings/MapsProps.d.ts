/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListActionValue, ListAttributeValue, WebImage } from "mendix";

export type LocationTypeEnum = "address" | "latlng";

export type MarkerStyleEnum = "default" | "image";

export interface MarkersType {
    locationType: LocationTypeEnum;
    address?: DynamicValue<string>;
    latitude?: DynamicValue<string>;
    longitude?: DynamicValue<string>;
    title?: DynamicValue<string>;
    onClick?: ActionValue;
    markerStyle: MarkerStyleEnum;
    customMarker?: DynamicValue<WebImage>;
}

export type LocationTypeEnum = "address" | "latlng";

export type MarkerStyleDynamicEnum = "default" | "image";

export interface DynamicMarkersType {
    markersDS?: ListValue;
    locationType: LocationTypeEnum;
    address?: ListAttributeValue<string>;
    latitude?: ListAttributeValue<BigJs.Big>;
    longitude?: ListAttributeValue<BigJs.Big>;
    title?: ListAttributeValue<string>;
    onClickAttribute?: ListActionValue;
    markerStyleDynamic: MarkerStyleDynamicEnum;
    customMarkerDynamic?: DynamicValue<WebImage>;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type ZoomEnum = "automatic" | "world" | "continent" | "city" | "street" | "buildings";

export type MapProviderEnum = "googleMaps" | "openStreet" | "mapBox" | "hereMaps";

export interface MarkersPreviewType {
    locationType: LocationTypeEnum;
    address: string;
    latitude: string;
    longitude: string;
    title: string;
    onClick: {} | null;
    markerStyle: MarkerStyleEnum;
    customMarker: string;
}

export interface DynamicMarkersPreviewType {
    markersDS: {} | null;
    locationType: LocationTypeEnum;
    address: string;
    latitude: string;
    longitude: string;
    title: string;
    onClickAttribute: {} | null;
    markerStyleDynamic: MarkerStyleDynamicEnum;
    customMarkerDynamic: string;
}

export interface MapsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advanced: boolean;
    markers: MarkersType[];
    dynamicMarkers: DynamicMarkersType[];
    apiKey: string;
    apiKeyExp?: DynamicValue<string>;
    geodecodeApiKey: string;
    geodecodeApiKeyExp?: DynamicValue<string>;
    showCurrentLocation: boolean;
    optionDrag: boolean;
    optionScroll: boolean;
    optionZoomControl: boolean;
    attributionControl: boolean;
    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    zoom: ZoomEnum;
    mapProvider: MapProviderEnum;
    mapStyles: string;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    advanced: boolean;
    markers: MarkersPreviewType[];
    dynamicMarkers: DynamicMarkersPreviewType[];
    apiKey: string;
    apiKeyExp: string;
    geodecodeApiKey: string;
    geodecodeApiKeyExp: string;
    showCurrentLocation: boolean;
    optionDrag: boolean;
    optionScroll: boolean;
    optionZoomControl: boolean;
    attributionControl: boolean;
    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    zoom: ZoomEnum;
    mapProvider: MapProviderEnum;
    mapStyles: string;
}
