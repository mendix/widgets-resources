import { createElement, ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";

import googleApiWrapper from "./GoogleApi";
import { getDimensions, getGoogleMapsStyles } from "../utils";
import { Marker, SharedProps } from "../../typings";

export interface GoogleMapsProps extends SharedProps {
    scriptsLoaded?: boolean;
    mapStyles?: string;

    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
}

export const GoogleMap = (props: GoogleMapsProps): ReactElement => {
    const map = useRef<google.maps.Map>();
    const googleMapsRef = useRef<HTMLDivElement>(null);
    const defaultCenterLocation: google.maps.LatLngLiteral = { lat: 51.906688, lng: 4.48837 };
    let bounds!: google.maps.LatLngBounds;

    const markers = useRef<google.maps.Marker[]>([]); // Used to manage and remove markers from the map

    useEffect(() => {
        if (props.scriptsLoaded) {
            createMap();
        }
    }, [props.scriptsLoaded]);

    useEffect(() => {
        addMarkers();
    }, [props.locations, props.currentLocation]);

    const createMap = (): void => {
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
            styles: getGoogleMapsStyles(props.mapStyles)
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
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];
        if (props.locations && props.locations.length > 0) {
            bounds = new google.maps.LatLngBounds();
            markers.current = props.locations.reduce<google.maps.Marker[]>((markerArray, currentLocation) => {
                const marker = addMarker(currentLocation);
                if (marker) {
                    markerArray.push(marker);
                }
                return markerArray;
            }, []);
        }
        addCurrentLocation();
        updateCamera();
    };

    const addCurrentLocation = (): void => {
        if (map.current && props.currentLocation) {
            markers.current = props.locations
                .concat(props.currentLocation ? [props.currentLocation] : [])
                .map(addMarker)
                .filter(m => m);
        }
    };

    const addMarker = (marker: Marker): google.maps.Marker => {
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
            icon: marker.url
                ? {
                      url: marker.url,
                      scaledSize: new google.maps.Size(32, 32)
                  }
                : "",
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
        mapMarker.setMap(map.current!);
        return mapMarker;
    };

    const updateCamera = (): void => {
        const { zoomLevel, autoZoom } = props;
        if (bounds && map.current) {
            try {
                if (!autoZoom) {
                    map.current.setCenter(getCenter());
                    map.current.setZoom(zoomLevel);
                } else {
                    map.current.fitBounds(bounds);
                }
            } catch (error) {
                console.error(`Invalid map bounds ${error.message}`);
            }
        }
    };

    const getCenter = (): google.maps.LatLngLiteral => ({
        lat: markers.current?.[0]?.getPosition()?.lat() ?? defaultCenterLocation.lat,
        lng: markers.current?.[0]?.getPosition()?.lng() ?? defaultCenterLocation.lng
    });

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            <div className="widget-google-maps-wrapper">
                <div className="widget-google-maps" ref={googleMapsRef} />
            </div>
        </div>
    );
};

export default googleApiWrapper("https://maps.googleapis.com/maps/api/js?key=")(GoogleMap);
