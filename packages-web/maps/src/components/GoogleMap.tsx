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
    const {
        optionZoomControl: zoomControl,
        optionScroll: scrollwheel,
        optionDrag: draggable,
        streetViewControl,
        mapTypeControl,
        fullscreenControl,
        rotateControl
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
    }, [map.current, props.locations, props.currentLocation]);

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            <div className="widget-google-maps-wrapper">
                <LoadScript
                    googleMapsApiKey={props.mapsToken}
                    id="_com.mendix.widget.custom.Maps.Maps"
                    loadingElement={<div className="spinner" />}
                >
                    <GoogleMapComponent
                        mapContainerClassName="widget-google-maps"
                        options={{
                            zoomControl,
                            scrollwheel,
                            draggable,
                            streetViewControl,
                            mapTypeControl,
                            fullscreenControl,
                            rotateControl,
                            minZoom: 1,
                            maxZoom: 20,
                            styles: getGoogleMapsStyles(props.mapStyles)
                        }}
                        onLoad={googleMapRef => {
                            map.current = googleMapRef;
                        }}
                        onCenterChanged={() => {
                            if (map.current) {
                                center.current = map.current.getCenter().toJSON();
                            }
                        }}
                        zoom={props.autoZoom ? translateZoom("city") : props.zoomLevel}
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
