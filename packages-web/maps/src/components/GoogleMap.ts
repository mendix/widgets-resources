import { Component, createElement } from "react";
import * as classNames from "classnames";

import { Alert } from "./Alert";
import googleApiWrapper from "./GoogleApi";
import { Container, MapUtils } from "../utils/namespace";
import Utils from "../utils/Utils";
type MapProps = Container.MapProps;
type DataSourceLocationProps = Container.DataSourceLocationProps;
type Location = Container.Location;
type SharedProps = MapUtils.SharedProps;

export interface GoogleMapsProps extends SharedProps, MapProps {
    scriptsLoaded?: boolean;
    onClickMarker?: (event: google.maps.MouseEvent, locationAttr: DataSourceLocationProps) => void;
}

export interface GoogleMapState {
    center: google.maps.LatLngLiteral;
    alertMessage?: string;
}

export class GoogleMap extends Component<GoogleMapsProps, GoogleMapState> {
    private map!: google.maps.Map;
    private defaultCenterLocation: google.maps.LatLngLiteral = { lat: 51.9107963, lng: 4.4789878 };
    private markers: google.maps.Marker[] = [];
    private bounds!: google.maps.LatLngBounds;
    private googleMapsNode?: HTMLDivElement;
    readonly state: GoogleMapState = {
        center: this.defaultCenterLocation,
        alertMessage: this.props.alertMessage
    };

    render() {
        return createElement("div", {},
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-google-maps-alert"
            }, this.state.alertMessage),
            createElement("div",
                {
                    className: classNames("widget-google-maps-wrapper", this.props.className),
                    style: { ...this.props.divStyles , ...Utils.getDimensions(this.props) }
                },
                createElement("div", {
                    className: "widget-google-maps",
                    ref: this.getRef
                })
            )
        );
    }

    componentDidMount() {
        if (this.props.scriptsLoaded) {
            this.createUpdateMap(this.props);
        }
    }

    componentWillReceiveProps(nextProps: GoogleMapsProps) {
        if (nextProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: nextProps.alertMessage });
        }
        if (nextProps.scriptsLoaded) {
            if (this.props.allLocations !== nextProps.allLocations || this.props.inPreviewMode) {
                this.createUpdateMap(nextProps);
            }
        }
    }

    componentDidUpdate() {
        if (this.map && !this.props.fetchingData) {
            this.map.setCenter(this.state.center);
        }
    }

    private getRef = (node: HTMLDivElement) => {
        this.googleMapsNode = node;
    }

    private createUpdateMap = (props: GoogleMapsProps) => {
        const mapOptions = {
            zoom: props.zoomLevel,
            zoomControl: props.optionZoomControl,
            scrollwheel: props.optionScroll,
            draggable: props.optionDrag,
            streetViewControl: props.optionStreetView,
            mapTypeControl: props.mapTypeControl,
            fullscreenControl: props.fullScreenControl,
            rotateControl: props.rotateControl,
            minZoom: 2,
            maxZoom: 20,
            styles: this.getMapStyles()
        };
        if (this.googleMapsNode && !this.map) {
            this.map = new google.maps.Map(this.googleMapsNode, { ...mapOptions });
        } else if (this.map) {
            this.map.setOptions({ ...mapOptions });
        }
        this.setDefaultCenter(props);
    }

    private setDefaultCenter = (props: GoogleMapsProps) => {
        if (!props.fetchingData && props.allLocations && props.allLocations.length) {
            this.addMarkers(props.allLocations);
        }
    }

    private addMarkers = (mapLocations?: Location[]) => {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
        if (mapLocations && mapLocations.length) {
            this.bounds = new google.maps.LatLngBounds();
            this.markers = mapLocations.reduce<google.maps.Marker[]>((markerArray, currentLocation) => {
                this.bounds.extend({
                    lat: currentLocation.latitude,
                    lng: currentLocation.longitude
                });
                const marker = new google.maps.Marker({
                    position: {
                        lat: currentLocation.latitude,
                        lng: currentLocation.longitude
                    },
                    icon: currentLocation.url
                });
                if (currentLocation.locationAttr && currentLocation.locationAttr.onClickEvent !== "doNothing") {
                    marker.addListener("click", (event: google.maps.MouseEvent) => {
                        if (this.props.onClickMarker && currentLocation.locationAttr) {
                            this.props.onClickMarker(event, currentLocation.locationAttr);
                        }
                    });
                } else {
                    marker.setClickable(false);
                }
                markerArray.push(marker);

                return markerArray;
            }, []);
            this.setMapOnMarkers(this.map);
            this.setBounds(this.bounds);
        }
    }

    private setBounds = (mapBounds?: google.maps.LatLngBounds) => {
        const { defaultCenterLatitude, defaultCenterLongitude, zoomLevel, autoZoom } = this.props;
        setTimeout(() => {
            if (mapBounds && this.map) {
                try {
                    this.map.fitBounds(mapBounds);
                    if (!autoZoom) {
                        if (defaultCenterLatitude && defaultCenterLongitude) {
                            this.map.setCenter({
                                lat: parseFloat(defaultCenterLatitude),
                                lng: parseFloat(defaultCenterLongitude)
                            });
                        }
                        this.map.setZoom(zoomLevel);
                    }
                } catch (error) {
                    this.setState({ alertMessage: `Invalid map bounds ${error.message}` });
                }
            }
        }, 0);
    }

    private setMapOnMarkers = (map?: google.maps.Map) => {
        if (this.markers && this.markers.length && map) {
            this.markers.forEach(marker => marker.setMap(map));
        }
    }

    private getMapStyles(): google.maps.MapTypeStyle[] {
        if (this.props.mapStyles && this.props.mapStyles.trim()) {
            try {
                return JSON.parse(this.props.mapStyles);
            } catch (error) {
                this.setState({ alertMessage: `invalid Map styles, ${error}` });
            }
        }

        return [ {
            featureType: "poi",
            elementType: "labels",
            stylers: [ { visibility: "off" } ]
        } ];
    }

}

export default googleApiWrapper(`https://maps.googleapis.com/maps/api/js?key=`)(GoogleMap);
