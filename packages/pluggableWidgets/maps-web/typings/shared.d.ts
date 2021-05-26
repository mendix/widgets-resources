import { Dimensions } from "@mendix/piw-utils-internal";
import { CSSProperties } from "react";
export interface ModeledMarker {
    address?: string;
    latitude?: number;
    longitude?: number;
    title?: string;
    customMarker?: string;
    action?: () => void;
}

export interface Marker {
    latitude: number;
    longitude: number;
    url: string;
    onClick?: () => void;
    title?: string;
}

export interface SharedProps extends Dimensions {
    autoZoom: boolean;
    optionZoomControl: boolean;
    zoomLevel: number;
    optionDrag: boolean;
    optionScroll: boolean;
    showCurrentLocation: boolean;
    currentLocation?: Marker;
    locations: Marker[];
    mapsToken?: string;
    className?: string;
    style?: CSSProperties;
}
