import { createElement, ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { LoadScript } from "@react-google-maps/api";
import { Marker, SharedProps } from "../../typings/shared";
import { getGoogleMapsStyles } from "../utils/google";
import { getDimensions } from "../utils/dimension";
import { Option } from "../utils/data";

export interface GoogleMapsProps extends SharedProps {
    mapStyles?: string;

    optionStreetView: boolean;
    mapTypeControl: boolean;
    fullScreenControl: boolean;
    rotateControl: boolean;
}

export function GoogleMap(props: GoogleMapsProps): ReactElement {
    const map = useRef<google.maps.Map>();
    const googleMapsDivNode = useRef<HTMLDivElement>(null);
    const markers = useRef<google.maps.Marker[]>([]); // Used to manage and remove markers from the map
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded && googleMapsDivNode.current) {
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
            if (!map.current) {
                map.current = new google.maps.Map(googleMapsDivNode.current, mapOptions);
            } else {
                map.current.setOptions(mapOptions);
            }
        }
    }, [loaded, googleMapsDivNode.current]);

    useEffect(() => {
        if (map.current) {
            addMarkers(
                map.current,
                markers.current,
                props.locations,
                props.currentLocation,
                props.zoomLevel,
                props.autoZoom
            );
        }
    }, [map.current, props.locations, props.currentLocation, props.zoomLevel, props.autoZoom]);

    return (
        <LoadScript
            id="_com.mendix.widget.custom.Maps.Maps"
            googleMapsApiKey={props.mapsToken}
            onLoad={() => setLoaded(true)}
        >
            <div
                className={classNames("widget-maps", props.className)}
                style={{ ...props.style, ...getDimensions(props) }}
            >
                <div className="widget-google-maps-wrapper">
                    <div className="widget-google-maps" ref={googleMapsDivNode} />
                </div>
            </div>
        </LoadScript>
    );
}

function addMarkers(
    map: google.maps.Map,
    markers: google.maps.Marker[],
    locations: Marker[],
    currentLocation: Option<Marker>,
    zoomLevel: number,
    autoZoom: boolean
): void {
    markers.forEach(marker => marker.setMap(null));
    markers.splice(0, markers.length);

    const bounds = new google.maps.LatLngBounds();
    const defaultCenterLocation = { lat: 51.906688, lng: 4.48837 };
    markers.push(
        ...locations
            .concat(currentLocation ? [currentLocation] : [])
            .map(location => addMarker(map, bounds, location))
            .filter(m => m)
    );
    if (!markers.length) {
        bounds.extend(defaultCenterLocation);
    }
    if (!autoZoom) {
        map.setCenter({
            lat: markers?.[0]?.getPosition()?.lat() ?? defaultCenterLocation.lat,
            lng: markers?.[0]?.getPosition()?.lng() ?? defaultCenterLocation.lng
        });
        map.setZoom(zoomLevel);
    } else {
        map.fitBounds(bounds);
    }
}

function addMarker(map: google.maps.Map, bounds: google.maps.LatLngBounds, marker: Marker): google.maps.Marker {
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
            infoWindow.open(map, mapMarker);
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
    mapMarker.setMap(map);
    return mapMarker;
}
