import { createElement, ReactNode, useEffect, useState } from "react";
import { MapSwitcher } from "./components/MapSwitcher";

import { ValueStatus } from "mendix";
import { MapsContainerProps } from "../typings/MapsProps";
import { useLocationResolver } from "./utils/geodecode";
import { getCurrentUserLocation } from "./utils/location";
import { Marker } from "../typings/shared";
import { translateZoom } from "./utils/zoom";

import "leaflet/dist/leaflet.css";
import "./ui/Maps.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

export default function Maps(props: MapsContainerProps): ReactNode {
    const [locations] = useLocationResolver(
        props.markers,
        props.dynamicMarkers,
        !props.advanced ? props.apiKey?.value : props.geodecodeApiKey?.value
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
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
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
