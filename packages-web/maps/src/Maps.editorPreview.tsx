import { createElement, ReactNode } from "react";
import { MapSwitcher } from "./components/MapSwitcher";

import { MapsPreviewProps } from "../typings/MapsProps";
import { Marker } from "../typings/shared";
import { parseStyle } from "@widgets-resources/piw-utils";
import { translateZoom } from "./utils/zoom";

import "leaflet-defaulticon-compatibility";

declare function require(name: string): string;

export const preview = (props: MapsPreviewProps): ReactNode => {
    const locations: Marker[] = [
        {
            latitude: 51.906688,
            longitude: 4.48837,
            title: "Mendix Office Rotterdam",
            url: ""
        }
    ];
    return (
        <MapSwitcher
            attributionControl={props.attributionControl}
            autoZoom={false}
            className={props.class}
            currentLocation={locations[0]}
            fullScreenControl={props.fullScreenControl}
            height={Number(props.height)}
            heightUnit={props.heightUnit}
            locations={locations}
            mapsToken={props.apiKey}
            mapProvider={props.mapProvider}
            mapStyles={props.mapStyles}
            mapTypeControl={props.mapTypeControl}
            optionDrag={false}
            optionScroll={false}
            optionStreetView={props.optionStreetView}
            optionZoomControl={props.optionZoomControl}
            rotateControl={props.rotateControl}
            showCurrentLocation={props.showCurrentLocation}
            style={parseStyle(props.style)}
            width={Number(props.width)}
            widthUnit={props.widthUnit}
            zoomLevel={props.zoom === "automatic" ? translateZoom("street") : translateZoom(props.zoom)}
        />
    );
};

export function getPreviewCss(): string {
    return (
        require("leaflet/dist/leaflet.css") +
        require("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css") +
        require("./ui/Maps.css") +
        require("./ui/GoogleMapsPreview.css")
    );
}
