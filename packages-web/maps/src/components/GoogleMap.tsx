import { createElement, Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
    GoogleMap as GoogleMapComponent,
    Marker as MarkerComponent,
    InfoWindow,
    LoadScript
} from "@react-google-maps/api";
import { Marker, SharedProps } from "../../typings/shared";
import { getGoogleMapsStyles } from "../utils/google";
import { getDimensions } from "../utils/dimension";
import { translateZoom } from "../utils/zoom";
import { Option } from "../utils/data";
import { Alert } from "@widgets-resources/piw-utils";

export interface GoogleMapsProps extends SharedProps {
    mapStyles?: string;
    streetViewControl: boolean;
    mapTypeControl: boolean;
    fullscreenControl: boolean;
    rotateControl: boolean;
}

export function GoogleMap(props: GoogleMapsProps): ReactElement {
    const map = useRef<google.maps.Map>();
    const center = useRef<google.maps.LatLngLiteral>({
        lat: 51.906688,
        lng: 4.48837
    });
    const [selectedMarker, setSelectedMarker] = useState<Option<Marker>>();
    const [error, setError] = useState("");
    const {
        autoZoom,
        fullscreenControl,
        mapTypeControl,
        mapStyles,
        optionZoomControl: zoomControl,
        optionScroll: scrollwheel,
        optionDrag: draggable,
        streetViewControl,
        rotateControl,
        zoomLevel
    } = props;

    useEffect(() => {
        if (map.current) {
            const bounds = new google.maps.LatLngBounds();
            props.locations
                .concat(props.currentLocation ? [props.currentLocation] : [])
                .filter(m => !!m)
                .forEach(marker => {
                    bounds.extend({
                        lat: marker.latitude,
                        lng: marker.longitude
                    });
                });
            if (bounds.isEmpty()) {
                bounds.extend(center.current);
            }
            if (props.autoZoom) {
                map.current.fitBounds(bounds);
            } else {
                map.current.setCenter(bounds.getCenter());
            }
        }
    }, [map.current, props.locations, props.currentLocation, props.autoZoom]);

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            {error && <Alert bootstrapStyle="danger">{error}</Alert>}
            <div className="widget-google-maps-wrapper">
                <LoadScript
                    googleMapsApiKey={props.mapsToken}
                    id="_com.mendix.widget.custom.Maps.Maps"
                    loadingElement={<div className="spinner" />}
                    onError={error => setError(error.message)}
                >
                    <GoogleMapComponent
                        mapContainerClassName="widget-google-maps"
                        options={{
                            draggable,
                            fullscreenControl,
                            mapTypeControl,
                            maxZoom: 20,
                            minZoom: 1,
                            rotateControl,
                            scrollwheel,
                            streetViewControl,
                            styles: getGoogleMapsStyles(mapStyles),
                            zoomControl
                        }}
                        onLoad={googleMapRef => {
                            map.current = googleMapRef;
                        }}
                        onCenterChanged={() => {
                            if (map.current) {
                                center.current = map.current.getCenter().toJSON();
                            }
                        }}
                        zoom={autoZoom ? translateZoom("city") : zoomLevel}
                        center={center.current}
                    >
                        {props.locations
                            .concat(props.currentLocation ? [props.currentLocation] : [])
                            .filter(m => !!m)
                            .map((marker, index) => (
                                <GoogleMapsMarker
                                    key={`marker_${index}`}
                                    marker={marker}
                                    selectedMarker={selectedMarker}
                                    setSelectedMarker={setSelectedMarker}
                                />
                            ))}
                    </GoogleMapComponent>
                </LoadScript>
            </div>
        </div>
    );
}

function GoogleMapsMarker({
    marker,
    selectedMarker,
    setSelectedMarker
}: {
    marker: Marker;
    selectedMarker: Option<Marker>;
    setSelectedMarker: Dispatch<SetStateAction<Option<Marker>>>;
}): ReactElement {
    const markerRef = useRef<google.maps.MVCObject>();
    return (
        <MarkerComponent
            position={{
                lat: marker.latitude,
                lng: marker.longitude
            }}
            title={marker.title}
            clickable={!!marker.title || !!marker.onClick}
            onLoad={ref => {
                markerRef.current = ref;
            }}
            onClick={
                marker.title ? () => setSelectedMarker(prev => (prev !== marker ? marker : undefined)) : marker.onClick
            }
        >
            {selectedMarker === marker && markerRef.current && (
                <InfoWindow
                    anchor={markerRef.current}
                    onCloseClick={() => setSelectedMarker(prev => (prev === marker ? undefined : prev))}
                >
                    <span style={{ cursor: marker.onClick ? "pointer" : "none" }} onClick={marker.onClick}>
                        {marker.title}
                    </span>
                </InfoWindow>
            )}
        </MarkerComponent>
    );
}
