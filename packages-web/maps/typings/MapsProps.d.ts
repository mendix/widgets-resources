/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue, ListValue, ObjectItem, WebImage } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

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
    title?: string;
    titleAttribute?: EditableValue<string>;
    titleExpression?: DynamicValue<string>;
    latitude: BigJs.Big;
    latitudeAttribute?: EditableValue<BigJs.Big>;
    latitudeExpression?: DynamicValue<BigJs.Big>;
    longitude: BigJs.Big;
    longitudeAttribute?: EditableValue<BigJs.Big>;
    longitudeExpression?: DynamicValue<BigJs.Big>;
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
    title?: (item: ObjectItem) => EditableValue<string>;
    latitude?: (item: ObjectItem) => EditableValue<BigJs.Big>;
    longitude?: (item: ObjectItem) => EditableValue<BigJs.Big>;
    onClickAttribute?: (item: ObjectItem) => ActionValue;
    markerStyleDynamic: MarkerStyleDynamicEnum;
    customMarkerDynamic?: DynamicValue<WebImage>;
}

export type ZoomEnum = "world" | "continent" | "city" | "street" | "buildings";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type MapProviderEnum = "googleMaps" | "openStreet" | "mapBox" | "hereMaps";

export interface MarkersPreviewType {
    dataSourceType: DataSourceTypeEnum;
    locationType: LocationTypeEnum;
    propertyContext: PropertyContextEnum;
    address?: string;
    addressAttribute?: string;
    addressExpression?: string;
    title?: string;
    titleAttribute?: string;
    titleExpression?: string;
    latitude: BigJs.Big;
    latitudeAttribute?: string;
    latitudeExpression?: BigJs.Big;
    longitude: BigJs.Big;
    longitudeAttribute?: string;
    longitudeExpression?: BigJs.Big;
    onClick?: ActionPreview;
    markerStyle: MarkerStyleEnum;
    customMarker?: WebImage;
}

export interface DynamicMarkersPreviewType {
    markersDS?: ListValue;
    locationType: LocationTypeEnum;
    address?: (item: ObjectItem) => string;
    title?: (item: ObjectItem) => string;
    latitude?: (item: ObjectItem) => string;
    longitude?: (item: ObjectItem) => string;
    onClickAttribute?: (item: ObjectItem) => ActionPreview;
    markerStyleDynamic: MarkerStyleDynamicEnum;
    customMarkerDynamic?: WebImage;
}

export interface MarkersVisibilityType {
    dataSourceType: boolean;
    locationType: boolean;
    propertyContext: boolean;
    address: boolean;
    addressAttribute: boolean;
    addressExpression: boolean;
    title: boolean;
    titleAttribute: boolean;
    titleExpression: boolean;
    latitude: boolean;
    latitudeAttribute: boolean;
    latitudeExpression: boolean;
    longitude: boolean;
    longitudeAttribute: boolean;
    longitudeExpression: boolean;
    onClick: boolean;
    markerStyle: boolean;
    customMarker: boolean;
}

export interface DynamicMarkersVisibilityType {
    markersDS: boolean;
    locationType: boolean;
    address: boolean;
    title: boolean;
    latitude: boolean;
    longitude: boolean;
    onClickAttribute: boolean;
    markerStyleDynamic: boolean;
    customMarkerDynamic: boolean;
}

export interface MapsContainerProps extends CommonProps {
    markers: MarkersType[];
    dynamicMarkers: DynamicMarkersType[];
    apiKey?: DynamicValue<string>;
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
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    advanced: boolean;
    mapProvider: MapProviderEnum;
    mapStyles?: string;
}

export interface MapsPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    markers: MarkersPreviewType[];
    dynamicMarkers: DynamicMarkersPreviewType[];
    apiKey?: string;
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
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    advanced: boolean;
    mapProvider: MapProviderEnum;
    mapStyles?: string;
}

export interface VisibilityMap {
    markers: MarkersVisibilityType[] | boolean;
    dynamicMarkers: DynamicMarkersVisibilityType[] | boolean;
    apiKey: boolean;
    zoom: boolean;
    showCurrentLocation: boolean;
    optionDrag: boolean;
    optionScroll: boolean;
    optionZoomControl: boolean;
    attributionControl: boolean;
    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
    widthUnit: boolean;
    width: boolean;
    heightUnit: boolean;
    height: boolean;
    advanced: boolean;
    mapProvider: boolean;
    mapStyles: boolean;
}
