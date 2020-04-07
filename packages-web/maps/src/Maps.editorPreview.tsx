import { createElement, ReactNode } from "react";
import { MapsPreviewProps, Marker } from "../typings";
import { MapSwitcher } from "./components/MapSwitcher";
import { parseStyle } from "@widgets-resources/piw-utils";
import { translateZoom } from "./utils";

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
            mapProvider={props.mapProvider}
            locations={locations}
            autoZoom={false}
            zoomLevel={props.zoom === "automatic" ? translateZoom("street") : translateZoom(props.zoom)}
            mapsToken={props.apiKey}
            widthUnit={props.widthUnit}
            width={Number(props.width)}
            heightUnit={props.heightUnit}
            height={Number(props.height)}
            showCurrentLocation={props.showCurrentLocation}
            currentLocation={locations[0]}
            optionZoomControl={props.optionZoomControl}
            optionScroll={false}
            optionDrag={false}
            optionStreetView={props.optionStreetView}
            mapTypeControl={props.mapTypeControl}
            fullScreenControl={props.fullScreenControl}
            rotateControl={props.rotateControl}
            className={props.class}
            mapStyles={props.mapStyles}
            style={parseStyle(props.style)}
            attributionControl={props.attributionControl}
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
