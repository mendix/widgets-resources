import { hot } from "react-hot-loader/root";
import { createElement, ReactNode, useState } from "react";
import { DynamicMarkersType, MapsContainerProps, MarkersType } from "../typings/MapsProps";
import GoogleMap, { ModeledMarker } from "./components/GoogleMap";
import { translateZoom } from "./utils/Utils";
import { ObjectItem, ValueStatus } from "mendix";
import "./ui/Maps.css";

const Maps = (props: MapsContainerProps): ReactNode => {
    const currentMarkers: ModeledMarker[] = [];
    const [locations, setLocations] = useState<ModeledMarker[]>(currentMarkers);

    props.markers.map(marker => {
        currentMarkers.push(analyzeStaticMarker(marker));
    });
    props.dynamicMarkers.forEach(marker => {
        if (marker.markersDS && marker.markersDS.status === ValueStatus.Available) {
            console.warn("Extracting markers");
            marker.markersDS.items?.forEach(item => {
                currentMarkers.push(analyzeDynamicMarker(marker, item));
            });
        }
    });

    const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
        console.warn("Analyzing static marker");
        let location;
        if (marker.dataSourceType === "static") {
            if (marker.locationType === "address") {
                location = marker.address!;
            } else {
                location = `${marker.latitude},${marker.longitude}`;
            }
        } else {
            if (marker.locationType === "address") {
                if (marker.propertyContext === "attribute") {
                    location = marker.addressAttribute?.value!;
                } else {
                    location = marker.addressExpression?.value!;
                }
            } else {
                if (marker.propertyContext === "attribute") {
                    location = `${marker.latitudeAttribute?.value},${marker.longitudeAttribute?.value}`;
                } else {
                    location = `${marker.latitudeExpression?.value},${marker.longitudeExpression?.value}`;
                }
            }
        }

        return {
            location,
            action: marker.onClick?.execute,
            customMarker: marker.customMarker?.value?.uri
        };
    };

    const analyzeDynamicMarker = (marker: DynamicMarkersType, item: ObjectItem): ModeledMarker => {
        console.warn("Analyzing dynamic marker");
        const { locationType, address, latitude, longitude, onClickAttribute } = marker;
        let location;
        if (locationType === "address") {
            location = address ? address(item).value! : "";
        } else {
            location = `${latitude ? latitude(item).value : 0},${longitude ? longitude(item).value : 0}`;
        }
        return {
            location,
            action: onClickAttribute ? onClickAttribute(item).execute : undefined,
            customMarker: marker.customMarkerDynamic?.value?.uri
        };
    };

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
