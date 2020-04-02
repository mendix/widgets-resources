import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useEffect, useMemo, useState } from "react";
import { MapsContainerProps, Marker } from "../typings";
import GoogleMap from "./components/GoogleMap";
import { ValueStatus } from "mendix";
import "./ui/Maps.css";
import { analyzeMarkers, getCurrentUserLocation, translateZoom } from "./utils";

const Maps = (props: MapsContainerProps): ReactNode => {
    const locations = useMemo(() => analyzeMarkers(props.markers, props.dynamicMarkers), [
        props.dynamicMarkers,
        props.markers
    ]);
    const [currentLocation, setCurrentLocation] = useState<Marker>();
    console.warn("Maps: ", locations);

    useEffect(() => {
        console.log("Maps: COMPONENT DID MOUNT");
        if (props.showCurrentLocation) {
            getCurrentUserLocation()
                .then(marker => {
                    setCurrentLocation(marker);
                })
                .catch(error => console.error(error.message));
        }
    }, []);
    return (
        <GoogleMap
            autoZoom={props.zoom === "automatic"}
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
            locations={locations}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
            showCurrentLocation={props.showCurrentLocation}
            currentLocation={currentLocation}
            optionZoomControl={props.optionZoomControl}
            optionScroll={props.optionScroll}
            optionDrag={props.optionDrag}
            optionStreetView={props.optionStreetView}
            mapTypeControl={props.mapTypeControl}
            fullScreenControl={props.fullScreenControl}
            rotateControl={props.rotateControl}
            mapStyles={props.mapStyles}
            divStyles={props.style}
        />
    );
};

export default hot(Maps);
