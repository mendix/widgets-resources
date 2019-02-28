/**
 * This file was generated from Maps.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface MarkersType {
    latitude: string;
    longitude: string;
    title?: string;
    description?: string;
    action?: ActionValue;
}

export type MapTypeEnum = "standard" | "satellite" | "hybrid" | "terrain";

export type ProviderEnum = "default" | "google";

export interface MapsProps extends CommonProps {
    markerTitle: EditableValue<string>;
    markerDescription: EditableValue<string>;
    markerLatitude: EditableValue<BigJs.Big>;
    markerLongitude: EditableValue<BigJs.Big>;
    markers: MarkersType[];
    latitude: EditableValue<BigJs.Big>;
    longitude: EditableValue<BigJs.Big>;
    latitudeDelta: EditableValue<BigJs.Big>;
    longitudeDelta: EditableValue<BigJs.Big>;
    mapType: MapTypeEnum;
    provider: ProviderEnum;
    showsUserLocation: boolean;
    showsMyLocationButton: boolean;
    showsPointsOfInterest: boolean;
    showsCompass: boolean;
    showsScale: boolean;
    showsBuildings: boolean;
    showsTraffic: boolean;
    showsIndoors: boolean;
    zoomEnabled: boolean;
    minZoomLevel: number;
    maxZoomLevel: number;
    rotateEnabled: boolean;
    scrollEnabled: boolean;
    pitchEnabled: boolean;
    onRegionChange?: ActionValue;
    onMarkerPress?: ActionValue;
}
