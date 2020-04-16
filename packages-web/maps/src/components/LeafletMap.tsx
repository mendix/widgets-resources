import { createElement, ReactElement, useEffect, useRef, useState } from "react";
import { Map, Marker as MarkerComponent, Popup, TileLayer } from "react-leaflet";
import classNames from "classnames";
import { Marker, SharedProps } from "../../typings/shared";
import { MapProviderEnum } from "../../typings/MapsProps";
import { getDimensions } from "../utils/dimension";
import { translateZoom } from "../utils/zoom";
import { latLngBounds } from "leaflet";
import { baseMapLayer } from "../utils/leaflet";

export interface LeafletProps extends SharedProps {
    mapProvider: MapProviderEnum;
    attributionControl: boolean;
}

export function LeafletMap(props: LeafletProps): ReactElement {
    const [isLoaded, setIsLoaded] = useState(false);
    const center = { lat: 51.906688, lng: 4.48837 };
    const map = useRef<Map>();
    const {
        autoZoom,
        attributionControl,
        optionScroll: scrollWheelZoom,
        optionZoomControl: zoomControl,
        zoomLevel: zoom,
        optionDrag: dragging
    } = props;

    useEffect(() => {
        if (map.current && isLoaded) {
            const { leafletElement: mapRef } = map.current;
            const bounds = latLngBounds(
                props.locations
                    .concat(props.currentLocation ? [props.currentLocation] : [])
                    .filter(m => !!m)
                    .map(m => [m.latitude, m.longitude])
            );
            if (bounds.isValid()) {
                if (props.autoZoom) {
                    mapRef.fitBounds(bounds, { padding: [0.5, 0.5] }).invalidateSize();
                } else {
                    mapRef.panTo(bounds.getCenter(), { animate: false });
                }
            }
        }
    }, [map.current, isLoaded, props.locations, props.currentLocation, props.autoZoom]);

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            <div className="widget-leaflet-maps-wrapper">
                <Map
                    attributionControl={attributionControl}
                    center={center}
                    className="widget-leaflet-maps"
                    dragging={dragging}
                    maxZoom={18}
                    minZoom={1}
                    ref={ref => {
                        if (ref && ref !== map.current) {
                            map.current = ref;
                        }
                    }}
                    scrollWheelZoom={scrollWheelZoom}
                    zoom={autoZoom ? translateZoom("city") : zoom}
                    zoomControl={zoomControl}
                    whenReady={() => {
                        setIsLoaded(true);
                    }}
                >
                    <TileLayer
                        {...baseMapLayer(props.mapProvider, props.mapsToken)}
                        id={props.mapProvider === "mapBox" ? "mapbox.streets" : undefined}
                    />
                    {props.locations
                        .concat(props.currentLocation ? [props.currentLocation] : [])
                        .filter(m => !!m)
                        .map((marker, index) => (
                            <LeafletMarker marker={marker} key={`marker_${index}`} />
                        ))}
                </Map>
            </div>
        </div>
    );
}

function LeafletMarker({ marker }: { marker: Marker }): ReactElement {
    return (
        <MarkerComponent
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onclick={marker.title ? undefined : marker.onClick}
            interactive={!!marker.title || !!marker.onClick}
            title={marker.title}
        >
            {marker.title && (
                <Popup>
                    <span style={{ cursor: marker.onClick ? "pointer" : "none" }} onClick={marker.onClick}>
                        {marker.title}
                    </span>
                </Popup>
            )}
        </MarkerComponent>
    );
}
