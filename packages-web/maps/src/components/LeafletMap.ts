import { Component, createElement } from "react";
import {
    FeatureGroup,
    LatLngLiteral,
    LeafletEvent,
    Map,
    Marker,
    TileLayerOptions,
    icon,
    tileLayer
} from "leaflet";
import * as classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import { Container, MapUtils } from "../utils/namespace";
import Utils from "../utils/Utils";
import { Alert } from "./Alert";
type MapProps = Container.MapProps;
type DataSourceLocationProps = Container.DataSourceLocationProps;
type Location = Container.Location;
type SharedProps = MapUtils.SharedProps;

const customUrls = Utils.customUrls;
const mapAttr = Utils.mapAttr;

export interface LeafletMapProps extends SharedProps, MapProps {
    onClickMarker?: (event: LeafletEvent, locationAttr: DataSourceLocationProps) => void;
}

export interface LeafletMapState {
    center: LatLngLiteral;
    alertMessage?: string;
    resized: boolean;
}

export class LeafletMap extends Component<LeafletMapProps, LeafletMapState> {
    private leafletNode?: HTMLDivElement;
    private defaultCenterLocation: LatLngLiteral = { lat: 51.9107963, lng: 4.4789878 };
    private map?: Map;
    private markerGroup = new FeatureGroup();
    private readonly onResizeHandle = this.onResize.bind(this);

    readonly state: LeafletMapState = {
        center: this.defaultCenterLocation,
        resized: false
    };

    render() {
        return createElement("div", {
                className: classNames("widget-maps", this.props.className),
                style: { ...this.props.divStyles , ...Utils.getDimensions(this.props) }
            },
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-leaflet-maps-alert leaflet-control"
            }, this.state.alertMessage),
            createElement("div",
                {
                    className: "widget-leaflet-maps-wrapper"
                },
                createElement("div", {
                    className: "widget-leaflet-maps",
                    ref: this.getRef
                }),
                createElement(ReactResizeDetector, {
                    handleWidth: true,
                    handleHeight: true,
                    refreshRate: 100,
                    refreshMode: "throttle",
                    onResize: this.onResizeHandle
                })
            )
        );
    }

    componentDidMount() {
        if (this.leafletNode && !this.map) {
            this.map = new Map(this.leafletNode, {
                    scrollWheelZoom: this.props.optionScroll,
                    zoomControl: this.props.optionZoomControl,
                    attributionControl: this.props.attributionControl,
                    zoom: this.props.zoomLevel,
                    minZoom: 2,
                    // Work around for page scroll down to botom on first click on map in Chrome and IE
                    // https://github.com/Leaflet/Leaflet/issues/5392
                    keyboard: false,
                    dragging: this.props.optionDrag
                })
                .addLayer(this.setTileLayer());
            if (this.props.inPreviewMode) {
                this.setDefaultCenter(this.props);
            }
        }
    }

    componentWillReceiveProps(nextProps: LeafletMapProps) {
        if (nextProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: nextProps.alertMessage });
        }
        if (this.props.allLocations !== nextProps.allLocations) {
            this.setDefaultCenter(nextProps);
            this.setState({ resized: false });
        }
    }

    componentDidUpdate() {
        if (this.map && !this.props.fetchingData) {
            this.map.panTo(this.state.center);
        }
    }

    componentWillUnmount() {
        if (this.map) {
            this.map.remove();
        }
    }

    private onResize() {
        // When map is placed on the non default tab, the maps has no size.
        // Therefor it need to update on the first view.
        if (this.map && !this.state.resized) {
            this.setDefaultCenter(this.props);
            this.setBounds();
            this.setState({ resized: true });
        }
    }

    private getRef = (node: HTMLDivElement) => {
        this.leafletNode = node;
    }

    private setTileLayer = () => {
        const { mapProvider, mapsToken } = this.props;

        let urlTemplate = "";
        let mapAttribution = "";
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

    private setDefaultCenter = (props: LeafletMapProps) => {
        if (!props.fetchingData) {
            this.renderMarkers(props.allLocations);
        }
    }

    private renderMarkers = (locations?: Location[]) => {
        this.markerGroup.clearLayers();
        if (locations && locations.length) {
            locations.forEach(location => this.createMarker(location).then(marker =>
                this.markerGroup.addLayer(marker.on("click", event => {
                    if (this.props.onClickMarker && location.locationAttr && location.locationAttr.onClickEvent !== "doNothing") {
                        this.props.onClickMarker(event, location.locationAttr);
                    }
                }))).then(layer => this.map ? this.map.addLayer(layer) : undefined)
                .catch(reason => this.setState({ alertMessage: `${reason}` }))
            );
            this.setBounds();
        } else if (this.map) {
            this.map.removeLayer(this.markerGroup);
        }
    }

    private setBounds = () => {
        const { defaultCenterLatitude, defaultCenterLongitude, autoZoom, zoomLevel } = this.props;
        setTimeout(() => {
            if (this.map && this.markerGroup) {
                const bounds = this.markerGroup.getBounds();
                if (bounds.isValid()) {
                    this.map.fitBounds(this.markerGroup.getBounds(), { animate: false }).invalidateSize();
                }
                if (!autoZoom) {
                    if (defaultCenterLatitude && defaultCenterLongitude) {
                        this.map.panTo({
                            lat: parseFloat(defaultCenterLatitude),
                            lng: parseFloat(defaultCenterLongitude)
                        }, { animate: false });
                    }
                    this.map.setZoom(zoomLevel);
                }
            }
        }, 0);
    }

    private createMarker = (location: Location): Promise<Marker> =>
        new Promise((resolve) => {
            const { latitude, longitude, url } = location;
            if (url) {
                resolve(
                    new Marker([ Number(latitude), Number(longitude) ]).setIcon(icon({
                        iconUrl: url,
                        iconSize: [ 38, 95 ],
                        iconAnchor: [ 22, 94 ],
                        className: "marker"
                    }))
                );
            } else {
                resolve(new Marker([ Number(latitude), Number(longitude) ]));
            }
        })
}
