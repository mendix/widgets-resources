import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useEffect, useMemo, useState } from "react";
import { MapsContainerProps, Marker, ModeledMarker } from "../typings";
import GoogleMap from "./components/GoogleMap";
import { ValueStatus } from "mendix";
import "./ui/Maps.css";
import {
    analyzeDataSource,
    analyzeLocations,
    analyzeStaticMarker,
    getCurrentUserLocation,
    translateZoom
} from "./utils";

const Maps = (props: MapsContainerProps): ReactNode => {
    const [locations, setLocations] = useState<Marker[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Marker>();

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

    // Code defined inside analyzeMarkers
    const markers = useMemo(() => {
        const markers: ModeledMarker[] = [];
        markers.push(...props.markers.map(marker => analyzeStaticMarker(marker)));
        markers.push(
            ...props.dynamicMarkers
                .map(marker => analyzeDataSource(marker))
                .reduce((prev, current) => [...prev, ...current], [])
        );
        return markers;
    }, [props.markers, props.dynamicMarkers]);

    const promise = useMemo(() => analyzeLocations(markers, props.apiKey?.value), [markers, props.apiKey]);

    useEffect(() => {
        console.log("Maps: COMPONENT DID UPDATE");
        //TODO: Race condition right here
        promise
            .then(locations => {
                console.warn("ALL PROMISES RESOLVED");
                setLocations(locations);
            })
            .catch(() => setLocations([]));

        // analyzeMarkers(props.markers, props.dynamicMarkers, props.apiKey?.value).then(locations => {
        //     setLocations(locations);
        // }).catch(() => setLocations([]));
    }, [promise]);

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
