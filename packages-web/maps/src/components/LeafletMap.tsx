import { createElement, ReactElement, useEffect, useRef } from "react";
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
    const map = useRef<Map>();
    const center = { lat: 51.906688, lng: 4.48837 };
    const {
        autoZoom,
        attributionControl,
        className,
        currentLocation,
        locations,
        mapProvider,
        mapsToken,
        optionScroll: scrollWheelZoom,
        optionZoomControl: zoomControl,
        style,
        zoomLevel: zoom,
        optionDrag: dragging
    } = props;

    useEffect(() => {
        if (map.current) {
            const { leafletElement: mapRef } = map.current;
            const bounds = latLngBounds(
                locations
                    .concat(currentLocation ? [currentLocation] : [])
                    .filter(m => !!m)
                    .map(m => [m.latitude, m.longitude])
            );
            if (bounds.isValid()) {
                if (autoZoom) {
                    mapRef.fitBounds(bounds, { padding: [0.5, 0.5] }).invalidateSize();
                } else {
                    mapRef.panTo(bounds.getCenter(), { animate: false });
                }
            }
        }
    }, [map.current, locations, currentLocation, autoZoom]);

    return (
        <div className={classNames("widget-maps", className)} style={{ ...style, ...getDimensions(props) }}>
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
                >
                    <TileLayer
                        {...baseMapLayer(mapProvider, mapsToken)}
                        id={mapProvider === "mapBox" ? "mapbox.streets" : undefined}
                    />
                    {locations
                        .concat(currentLocation ? [currentLocation] : [])
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
