import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useEffect, useState } from "react";
import { MapsContainerProps, Marker } from "../typings";
import { ValueStatus } from "mendix";

import { getCurrentUserLocation, translateZoom, useLocationResolver } from "./utils";
import { MapSwitcher } from "./components/MapSwitcher";

import "leaflet/dist/leaflet.css";
import "./ui/Maps.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const Maps = (props: MapsContainerProps): ReactNode => {
    const [, locations] = useLocationResolver(props.markers, props.dynamicMarkers, props.geodecodeApiKey?.value);
    const [currentLocation, setCurrentLocation] = useState<Marker>();

    useEffect(() => {
        if (props.showCurrentLocation) {
            getCurrentUserLocation()
                .then(marker => {
                    setCurrentLocation(marker);
                })
                .catch(error => console.error(error.message));
        }
    }, []);

    return (
        <MapSwitcher
            mapProvider={props.mapProvider}
            locations={locations}
            autoZoom={props.zoom === "automatic"}
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
            widthUnit={props.widthUnit}
            width={Number(props.width)}
            heightUnit={props.heightUnit}
            height={Number(props.height)}
            showCurrentLocation={props.showCurrentLocation}
            currentLocation={currentLocation}
            optionZoomControl={props.optionZoomControl}
            optionScroll={props.optionScroll}
            optionDrag={props.optionDrag}
            optionStreetView={props.optionStreetView}
            mapTypeControl={props.mapTypeControl}
            fullScreenControl={props.fullScreenControl}
            rotateControl={props.rotateControl}
            className={props.class}
            mapStyles={props.mapStyles}
            style={props.style}
            attributionControl={props.attributionControl}
        />
    );
};

export default hot(Maps);
