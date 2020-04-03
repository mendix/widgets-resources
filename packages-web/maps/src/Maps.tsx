import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useEffect, useState } from "react";
import { MapsContainerProps, Marker } from "../typings";
import GoogleMap from "./components/GoogleMap";
import { ValueStatus } from "mendix";
import "./ui/Maps.css";
import { getCurrentUserLocation, translateZoom, useLocationResolver } from "./utils";

const Maps = (props: MapsContainerProps): ReactNode => {
    // const [locations, setLocations] = useState<Marker[]>([]);
    const [locations] = useLocationResolver(props.markers, props.dynamicMarkers, props.apiKey?.value);
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

    // useEffect(() => {
    //     if(!loading){
    //         setLocations(resolvedLocations);
    //     }
    // }, [loading, resolvedLocations]);

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
