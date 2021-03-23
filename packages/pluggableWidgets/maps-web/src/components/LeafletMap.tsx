import { createElement, ReactElement, useEffect, useRef } from "react";
import { Map, Marker as MarkerComponent, Popup, TileLayer } from "react-leaflet";
import classNames from "classnames";
import { SharedProps } from "../../typings/shared";
import { MapProviderEnum } from "../../typings/MapsProps";
import { getDimensions } from "../utils/dimension";
import { translateZoom } from "../utils/zoom";
import { latLngBounds, Icon as LeafletIcon } from "leaflet";
import { baseMapLayer } from "../utils/leaflet";

export interface LeafletProps extends SharedProps {
    mapProvider: MapProviderEnum;
    attributionControl: boolean;
}

/**
 * There is an ongoing issue in `react-leaflet` that fails to properly set the icon urls in the
 * default marker implementation. Issue https://github.com/PaulLeCam/react-leaflet/issues/453
 * describes the problem and also proposes a few solutions. But all of them require a hackish method
 * to override `leaflet`'s implementation of the default Icon. Instead, we always set the
 * `Marker.icon` prop instead of relying on the default. So if a custom icon is set, we use that.
 * If not, we reuse a leaflet icon that's the same as the default implementation should be.
 */
const defaultMarkerIcon = new LeafletIcon({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

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
                    <TileLayer {...baseMapLayer(mapProvider, mapsToken)} />
                    {locations
                        .concat(currentLocation ? [currentLocation] : [])
                        .filter(m => !!m)
                        .map((marker, index) => (
                            <MarkerComponent
                                key={`marker_${index}`}
                                position={{ lat: marker.latitude, lng: marker.longitude }}
                                onclick={marker.title ? undefined : marker.onClick}
                                interactive={!!marker.title || !!marker.onClick}
                                title={marker.title}
                                icon={
                                    marker.url
                                        ? new LeafletIcon({
                                              iconUrl: marker.url,
                                              iconRetinaUrl: marker.url
                                          })
                                        : defaultMarkerIcon
                                }
                            >
                                {marker.title && (
                                    <Popup>
                                        <span
                                            style={{ cursor: marker.onClick ? "pointer" : "none" }}
                                            onClick={marker.onClick}
                                        >
                                            {marker.title}
                                        </span>
                                    </Popup>
                                )}
                            </MarkerComponent>
                        ))}
                </Map>
            </div>
        </div>
    );
}
