import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useState } from "react";
import { MapsContainerProps } from "../typings/MapsProps";
import GoogleMap, { ModeledMarker } from "./components/GoogleMap";
import { analyzeDynamicMarker, analyzeStaticMarker, translateZoom } from "./utils/Utils";
import { ValueStatus } from "mendix";
import "./ui/Maps.css";

const Maps = (props: MapsContainerProps): ReactNode => {
    const currentMarkers: ModeledMarker[] = [];
    const [locations, setLocations] = useState<ModeledMarker[]>(currentMarkers);

    currentMarkers.push(...props.markers.map(marker => analyzeStaticMarker(marker)));
    props.dynamicMarkers.forEach(marker => {
        if (marker.markersDS && marker.markersDS.status === ValueStatus.Available) {
            console.warn("Extracting markers");
            marker.markersDS.items?.forEach(item => {
                currentMarkers.push(analyzeDynamicMarker(marker, item));
            });
        }
    });

    if (currentMarkers.length !== locations.length) {
        setLocations(currentMarkers);
    }

    console.warn(locations);
    return (
        <GoogleMap
            autoZoom
            zoomLevel={translateZoom(props.zoom)}
            mapsToken={props.apiKey && props.apiKey.status === ValueStatus.Available ? props.apiKey.value : undefined}
            defaultCenterLatitude={51.906855}
            defaultCenterLongitude={4.488367}
            locations={locations}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
        />
    );
};

export default hot(Maps);
