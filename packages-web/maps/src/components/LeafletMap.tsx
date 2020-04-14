import { createElement, ReactElement, useEffect, useRef } from "react";
import {
    FeatureGroup,
    LatLngLiteral,
    Map,
    MapOptions,
    Marker as LeafletMarker,
    icon,
    tileLayer,
    TileLayerOptions,
    TileLayer
} from "leaflet";
import classNames from "classnames";
import { Marker, SharedProps } from "../../typings/shared";
import { MapProviderEnum } from "../../typings/MapsProps";
import { getDimensions } from "../utils/dimension";
import { Option } from "../utils/data";
import { customUrls, mapAttr } from "../utils/leaflet";

export interface LeafletProps extends SharedProps {
    mapProvider: MapProviderEnum;
    attributionControl: boolean;
}

export function LeafletMap(props: LeafletProps): ReactElement {
    const map = useRef<Map>();
    const leafletDivNode = useRef<HTMLDivElement>(null);
    const defaultCenterLocation: LatLngLiteral = { lat: 51.906688, lng: 4.48837 };
    const markerGroup = useRef<FeatureGroup>(new FeatureGroup());

    useEffect(() => {
        const mapOptions: MapOptions = {
            scrollWheelZoom: props.optionScroll,
            zoomControl: props.optionZoomControl,
            attributionControl: props.attributionControl,
            zoom: props.zoomLevel,
            minZoom: 1,
            maxZoom: 18, // Max zoom for HERE, OSM & MapBox
            dragging: props.optionDrag,
            center: defaultCenterLocation,
            closePopupOnClick: false
        };
        if (leafletDivNode.current && !map.current) {
            map.current = new Map(leafletDivNode.current, mapOptions)
                .addLayer(baseMapLayer(props.mapProvider, props.mapsToken))
                .addLayer(markerGroup.current);
        }

        return () => {
            if (map.current) {
                map.current.off();
                map.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map.current) {
            addMarkers(
                map.current,
                markerGroup.current,
                props.locations,
                props.currentLocation,
                props.zoomLevel,
                props.autoZoom
            );
        }
    }, [map.current, markerGroup.current, props.locations, props.currentLocation, props.zoomLevel, props.autoZoom]);

    return (
        <div className={classNames("widget-maps", props.className)} style={{ ...props.style, ...getDimensions(props) }}>
            <div className="widget-leaflet-maps-wrapper">
                <div className="widget-leaflet-maps" ref={leafletDivNode} />
            </div>
        </div>
    );
}

function addMarkers(
    map: Map,
    markerGroup: FeatureGroup,
    locations: Marker[],
    currentLocation: Option<Marker>,
    zoomLevel: number,
    autoZoom: boolean
): void {
    markerGroup.clearLayers();
    const defaultCenterLocation = { lat: 51.906688, lng: 4.48837 };

    locations
        .concat(currentLocation ? [currentLocation] : [])
        .map(location => addMarker(location))
        .filter(m => m)
        .forEach(marker => markerGroup.addLayer(marker));

    const bounds = markerGroup.getBounds();

    if (bounds.isValid()) {
        map.fitBounds(bounds, { animate: false }).invalidateSize();
    }
    if (!autoZoom) {
        map.panTo(
            {
                lat: locations?.[0]?.latitude ?? defaultCenterLocation.lat,
                lng: locations?.[0]?.longitude ?? defaultCenterLocation.lng
            },
            { animate: false }
        );
        map.setZoom(zoomLevel);
    }
}

function addMarker(marker: Marker): LeafletMarker {
    const mapMarker = new LeafletMarker([Number(marker.latitude), Number(marker.longitude)], {
        title: marker.title,
        alt: marker.title
    });
    if (marker.title) {
        mapMarker.setTooltipContent(marker.title);
        if (marker.onClick) {
            const infoContent = document.createElement("span");
            infoContent.innerHTML = marker.title || "";
            infoContent.style.cursor = "pointer";
            infoContent.onclick = marker.onClick;
            mapMarker.bindPopup(infoContent).openPopup();
        } else {
            mapMarker.bindPopup(marker.title).openPopup();
        }
    } else {
        if (marker.onClick) {
            mapMarker.on("click", () => {
                marker.onClick!();
            });
        }
    }
    if (marker.url) {
        mapMarker.setIcon(
            icon({
                iconUrl: marker.url,
                iconSize: [32, 32],
                className: "marker"
            })
        );
    }
    return mapMarker;
}

function baseMapLayer(mapProvider: MapProviderEnum, mapsToken?: string): TileLayer {
    let urlTemplate;
    let mapAttribution;
    if (mapProvider === "mapBox") {
        urlTemplate = customUrls.mapbox + mapsToken;
        mapAttribution = mapAttr.mapboxAttr;
    } else if (mapProvider === "hereMaps" && mapsToken && mapsToken.indexOf(",") > 0) {
        const splitToken = mapsToken.split(",");
        urlTemplate = customUrls.hereMaps + `app_id=${splitToken[0]}&app_code=${splitToken[1]}`;
        mapAttribution = mapAttr.hereMapsAttr;
    } else {
        urlTemplate = customUrls.openStreetMap;
        mapAttribution = mapAttr.openStreetMapAttr;
    }

    return tileLayer(urlTemplate, {
        attribution: mapAttribution,
        id: mapProvider === "mapBox" ? "mapbox.streets" : undefined
    } as TileLayerOptions);
}
