import { createElement, ReactNode, useEffect, useState } from "react";
import { MapSwitcher } from "./components/MapSwitcher";

import { MapsContainerProps } from "../typings/MapsProps";
import { useLocationResolver } from "./utils/geodecode";
import { getCurrentUserLocation } from "./utils/location";
import { Marker } from "../typings/shared";
import { translateZoom } from "./utils/zoom";

import "leaflet/dist/leaflet.css";
import "./ui/Maps.css";

export default function Maps(props: MapsContainerProps): ReactNode {
    const [locations] = useLocationResolver(
        props.markers,
        props.dynamicMarkers,
        !props.advanced
            ? props.apiKeyExp?.value ?? props.apiKey
            : props.geodecodeApiKeyExp?.value ?? props.geodecodeApiKey
    );
    const [currentLocation, setCurrentLocation] = useState<Marker>();

    useEffect(() => {
        if (props.showCurrentLocation) {
            getCurrentUserLocation()
                .then(setCurrentLocation)
                .catch(e => console.error(e));
        }
    }, []);

    return (
        <MapSwitcher
            attributionControl={props.attributionControl}
            autoZoom={props.zoom === "automatic"}
            className={props.class}
            currentLocation={currentLocation}
            fullscreenControl={props.fullScreenControl}
            height={props.height}
            heightUnit={props.heightUnit}
            locations={locations}
            mapsToken={props.apiKeyExp?.value ?? props.apiKey}
            mapProvider={props.mapProvider}
            mapStyles={props.mapStyles}
            mapTypeControl={props.mapTypeControl}
            optionDrag={props.optionDrag}
            optionScroll={props.optionScroll}
            optionZoomControl={props.optionZoomControl}
            rotateControl={props.rotateControl}
            showCurrentLocation={props.showCurrentLocation}
            streetViewControl={props.optionStreetView}
            style={props.style}
            width={props.width}
            widthUnit={props.widthUnit}
            zoomLevel={translateZoom(props.zoom)}
        />
    );
}
