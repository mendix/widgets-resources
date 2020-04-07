/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ObjectItem, WebImage } from "mendix";

export type DataSourceTypeEnum = "static" | "dynamic";

export type LocationTypeEnum = "address" | "latlng";

export type PropertyContextEnum = "attribute" | "expression";

export type MarkerStyleEnum = "default" | "image";

export interface MarkersType {
    dataSourceType: DataSourceTypeEnum;
    locationType: LocationTypeEnum;
    propertyContext: PropertyContextEnum;
    address?: string;
    addressAttribute?: EditableValue<string>;
    addressExpression?: DynamicValue<string>;
    latitude: BigJs.Big;
    latitudeAttribute?: EditableValue<BigJs.Big>;
    latitudeExpression?: DynamicValue<BigJs.Big>;
    longitude: BigJs.Big;
    longitudeAttribute?: EditableValue<BigJs.Big>;
    longitudeExpression?: DynamicValue<BigJs.Big>;
    title?: string;
    titleAttribute?: EditableValue<string>;
    titleExpression?: DynamicValue<string>;
    onClick?: ActionValue;
    markerStyle: MarkerStyleEnum;
    customMarker?: DynamicValue<WebImage>;
}

export type LocationTypeEnum = "address" | "latlng";

export type MarkerStyleDynamicEnum = "default" | "image";

export interface DynamicMarkersType {
    markersDS?: ListValue;
    locationType: LocationTypeEnum;
    address?: (item: ObjectItem) => EditableValue<string>;
    latitude?: (item: ObjectItem) => EditableValue<BigJs.Big>;
    longitude?: (item: ObjectItem) => EditableValue<BigJs.Big>;
    title?: (item: ObjectItem) => EditableValue<string>;
    onClickAttribute?: (item: ObjectItem) => ActionValue;
    markerStyleDynamic: MarkerStyleDynamicEnum;
    customMarkerDynamic?: DynamicValue<WebImage>;
}

export type ZoomEnum = "automatic" | "world" | "continent" | "city" | "street" | "buildings";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type MapProviderEnum = "googleMaps" | "openStreet" | "mapBox" | "hereMaps";

export interface MarkersPreviewType {
    dataSourceType: DataSourceTypeEnum;
    locationType: LocationTypeEnum;
    propertyContext: PropertyContextEnum;
    address: string;
    addressAttribute: string;
    addressExpression: string;
    latitude: number | null;
    latitudeAttribute: string;
    latitudeExpression: string;
    longitude: number | null;
    longitudeAttribute: string;
    longitudeExpression: string;
    title: string;
    titleAttribute: string;
    titleExpression: string;
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
    tabIndex: number;
    markers: MarkersType[];
    dynamicMarkers: DynamicMarkersType[];
    apiKey?: DynamicValue<string>;
    geodecodeApiKey?: DynamicValue<string>;
    zoom: ZoomEnum;
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
    width: BigJs.Big;
    heightUnit: HeightUnitEnum;
    height: BigJs.Big;
    advanced: boolean;
    mapProvider: MapProviderEnum;
    mapStyles?: string;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    markers: MarkersPreviewType[];
    dynamicMarkers: DynamicMarkersPreviewType[];
    apiKey: string;
    geodecodeApiKey: string;
    zoom: ZoomEnum;
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
    advanced: boolean;
    mapProvider: MapProviderEnum;
    mapStyles: string;
}
