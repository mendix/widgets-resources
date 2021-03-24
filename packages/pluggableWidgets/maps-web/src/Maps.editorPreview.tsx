import { createElement, ReactNode, Fragment } from "react";
import { MapSwitcher } from "./components/MapSwitcher";

import { MapsPreviewProps } from "../typings/MapsProps";
import { Marker } from "../typings/shared";
import { Alert, parseStyle } from "@mendix/piw-utils-internal";
import { translateZoom } from "./utils/zoom";

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
        <Fragment>
            {(props.mapProvider === "mapBox" || props.mapProvider === "hereMaps") && (
                <Alert bootstrapStyle="warning">
                    Provider unavailable without API Key, preview is not possible at the moment
                </Alert>
            )}
            <MapSwitcher
                attributionControl={props.attributionControl}
                autoZoom={false}
                className={props.class}
                currentLocation={locations[0]}
                fullscreenControl={props.fullScreenControl}
                height={Number(props.height)}
                heightUnit={props.heightUnit}
                locations={locations}
                mapProvider={props.mapProvider}
                mapStyles={props.mapStyles}
                mapTypeControl={props.mapTypeControl}
                optionDrag={false}
                optionScroll={false}
                optionZoomControl={props.optionZoomControl}
                rotateControl={props.rotateControl}
                showCurrentLocation={props.showCurrentLocation}
                streetViewControl={props.optionStreetView}
                style={parseStyle(props.style)}
                width={Number(props.width)}
                widthUnit={props.widthUnit}
                zoomLevel={props.zoom === "automatic" ? translateZoom("street") : translateZoom(props.zoom)}
            />
        </Fragment>
    );
};

export function getPreviewCss(): string {
    return require("leaflet/dist/leaflet.css") + require("./ui/Maps.css") + require("./ui/GoogleMapsPreview.css");
}
