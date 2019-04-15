/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ImageURISource } from "react-native";

interface CommonProps<Style> {
    style: Style[];
}

export interface MarkersType {
    address?: DynamicValue<string>;
    latitude?: DynamicValue<BigJs.Big>;
    longitude?: DynamicValue<BigJs.Big>;
    title?: DynamicValue<string>;
    description?: DynamicValue<string>;
    onPress?: ActionValue;
    icon?: any;
    iconSize: number;
    color?: string;
}

export type DefaultZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MinZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MaxZoomLevelEnum = "world" | "continent" | "country" | "city" | "town" | "streets" | "building";

export type MapTypeEnum = "standard" | "satellite";

export type ProviderEnum = "default" | "google";

export interface MapsProps<Style> extends CommonProps<Style> {
    markers: MarkersType[];
    fitToMarkers: boolean;
    centerAddress?: DynamicValue<string>;
    centerLatitude?: DynamicValue<BigJs.Big>;
    centerLongitude?: DynamicValue<BigJs.Big>;
    defaultZoomLevel: DefaultZoomLevelEnum;
    minZoomLevel: MinZoomLevelEnum;
    maxZoomLevel: MaxZoomLevelEnum;
    mapType: MapTypeEnum;
    provider: ProviderEnum;
    showsUserLocation: boolean;
    scrollEnabled: boolean;
}
