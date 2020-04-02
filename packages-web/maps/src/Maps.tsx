import { hot } from "react-hot-loader/root";
import { createElement, ReactNode } from "react";
import { MapsContainerProps, ModeledMarker } from "../typings";
import GoogleMap from "./components/GoogleMap";
import { ValueStatus } from "mendix";
import "./ui/Maps.css";
import { analyzeDataSource, analyzeStaticMarker, translateZoom } from "./utils";

const Maps = (props: MapsContainerProps): ReactNode => {
    const currentMarkers: ModeledMarker[] = [];

    currentMarkers.push(...props.markers.map(marker => analyzeStaticMarker(marker)));
    currentMarkers.push(
        ...props.dynamicMarkers
            .map(marker => analyzeDataSource(marker))
            .reduce((prev, current) => [...prev, ...current], [])
    );

    return (
        <GoogleMap
            autoZoom={props.zoom === "automatic"}
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
            locations={currentMarkers}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
            showCurrentLocation={props.showCurrentLocation}
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
