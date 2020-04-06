import { createElement, ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import googleApiWrapper from "./GoogleApi";
import { Alert } from "@widgets-resources/piw-utils";
import { getDimensions } from "../utils";
import { Marker, SharedProps } from "../../typings";

export interface GoogleMapsProps extends SharedProps {
    scriptsLoaded?: boolean;
    mapStyles?: string;

    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
}

const GoogleMap = (props: GoogleMapsProps): ReactElement => {
    const map = useRef<google.maps.Map>();
    const googleMapsRef = useRef<HTMLDivElement>(null);
    const defaultCenterLocation: google.maps.LatLngLiteral = { lat: 51.9066346, lng: 4.4861703 };
    let bounds!: google.maps.LatLngBounds;

    const [markers, setMarkers] = useState<google.maps.Marker[]>([]); //Used to manage and remove markers from the map
    const [validationMessage, setValidationMessage] = useState(props.validationMessage);

    useEffect(() => {
        if (props.scriptsLoaded) {
            createUpdateMap();
        }
    }, []);

    useEffect(() => {
        createUpdateMap();
    }, [props.locations, props.currentLocation]);

    const createUpdateMap = (): void => {
        const mapOptions: google.maps.MapOptions = {
            zoom: props.zoomLevel,
            zoomControl: props.optionZoomControl,
            scrollwheel: props.optionScroll,
            draggable: props.optionDrag,
            streetViewControl: props.optionStreetView,
            mapTypeControl: props.mapTypeControl,
            fullscreenControl: props.fullScreenControl,
            rotateControl: props.rotateControl,
            minZoom: 1,
            maxZoom: 20,
            styles: getMapStyles()
        };
        if (googleMapsRef.current && !map.current) {
            map.current = new google.maps.Map(googleMapsRef.current, mapOptions);
            bounds = new google.maps.LatLngBounds().extend(defaultCenterLocation);
        } else if (map.current) {
            map.current.setOptions(mapOptions);
        }
        addMarkers();
    };

    const addMarkers = (): void => {
        markers.forEach(marker => marker.setMap(null));
        if (props.locations && props.locations.length > 0) {
            setMarkers([]);
            bounds = new google.maps.LatLngBounds();
            setMarkers(
                props.locations.reduce<google.maps.Marker[]>((markerArray, currentLocation) => {
                    const marker = addMarker(currentLocation);
                    if (marker) {
                        markerArray.push(marker);
                    }
                    return markerArray;
                }, [])
            );
        }
        addCurrentLocation();
        updateCamera();
    };

    const addCurrentLocation = () => {
        if (props.currentLocation) {
            const currentLocationMarker = addMarker(props.currentLocation);
            if (currentLocationMarker) {
                markers.push(currentLocationMarker);
            }
        }
    };

    const addMarker = (marker: Marker): google.maps.Marker | undefined => {
        if (map.current) {
            if (!bounds) {
                bounds = bounds = new google.maps.LatLngBounds();
            }
            bounds.extend({
                lat: marker.latitude,
                lng: marker.longitude
            });
            const mapMarker = new google.maps.Marker({
                position: {
                    lat: marker.latitude,
                    lng: marker.longitude
                },
                icon: {
                    url: marker.url,
                    scaledSize: new google.maps.Size(32, 32)
                },
                title: marker.title
            });
            if (marker.title) {
                const infoContent = document.createElement("span");
                infoContent.innerHTML = marker.title || "";
                if (marker.onClick) {
                    infoContent.style.cursor = "pointer";
                    infoContent.onclick = marker.onClick;
                }
                const infoWindow = new google.maps.InfoWindow({
                    content: infoContent
                });
                mapMarker.addListener("click", () => {
                    infoWindow.open(map.current, mapMarker);
                });
            } else {
                if (marker.onClick) {
                    mapMarker.addListener("click", () => {
                        marker.onClick!();
                    });
                } else {
                    mapMarker.setClickable(false);
                }
            }
            mapMarker.setMap(map.current);
            return mapMarker;
        }
        return undefined;
    };

    const updateCamera = (): void => {
        const { zoomLevel, autoZoom } = props;
        setTimeout(() => {
            if (bounds && map.current) {
                try {
                    if (!autoZoom) {
                        map.current.setCenter(getCenter());
                        map.current.setZoom(zoomLevel);
                    } else {
                        map.current.fitBounds(bounds);
                    }
                } catch (error) {
                    setValidationMessage(`Invalid map bounds ${error.message}`);
                }
            }
        }, 0);
    };

    const getCenter = (): google.maps.LatLngLiteral => {
        return {
            lat: markers[0]?.getPosition()?.lat() ?? defaultCenterLocation.lat,
            lng: markers[0]?.getPosition()?.lng() ?? defaultCenterLocation.lng
        };
    };

    const getMapStyles = (): google.maps.MapTypeStyle[] => {
        if (props.mapStyles && props.mapStyles.trim()) {
            try {
                return JSON.parse(props.mapStyles);
            } catch (error) {
                setValidationMessage(`invalid Map styles, ${error.message}`);
            }
        }

        return [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];
    };

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            {validationMessage && (
                <Alert bootstrapStyle="danger" className="widget-google-maps-alert">
                    {validationMessage}
                </Alert>
            )}
            <div className="widget-google-maps-wrapper">
                <div className="widget-google-maps" ref={googleMapsRef} />
            </div>
        </div>
    );
};

export default googleApiWrapper("https://maps.googleapis.com/maps/api/js?key=")(GoogleMap);
