import { Component, createElement } from "react";
import * as classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import { Alert } from "./Alert";
import googleApiWrapper from "./GoogleApi";
import { Container, MapUtils } from "../utils/namespace";
import Utils from "../utils/Utils";
import { validLocation } from "../utils/Validations";

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
    resized: boolean;
}

export class GoogleMap extends Component<GoogleMapsProps, GoogleMapState> {
    private map!: google.maps.Map;
    private defaultCenterLocation: google.maps.LatLngLiteral = { lat: 51.9066346, lng: 4.4861703 };
    private markers: google.maps.Marker[] = [];
    private bounds!: google.maps.LatLngBounds;
    private googleMapsNode?: HTMLDivElement;
    private readonly onResizeHandle = this.onResize.bind(this);

    readonly state: GoogleMapState = {
        center: this.getDefaultCenter(this.props),
        alertMessage: this.props.alertMessage,
        resized: false
    };

    render() {
        return createElement("div", {
                className: classNames("widget-maps", this.props.className),
                style: { ...this.props.divStyles, ...Utils.getDimensions(this.props) }
            },
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-google-maps-alert"
            }, this.state.alertMessage),
            createElement("div",
                {
                    className: "widget-google-maps-wrapper"
                },
                createElement("div", {
                    className: "widget-google-maps",
                    ref: this.getRef
                })
            ),
            createElement(ReactResizeDetector, {
                handleWidth: true,
                handleHeight: true,
                refreshRate: 100,
                refreshMode: "throttle",
                onResize: this.onResizeHandle
            })
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
        if (nextProps.scriptsLoaded && (this.props.allLocations !== nextProps.allLocations || !this.map)) {
            this.createUpdateMap(nextProps);
            this.setState({ resized: false });
        }
    }

    componentDidUpdate() {
        if (this.map && !this.props.fetchingData && !this.state.resized) {
            this.map.setCenter(this.state.center);
        }
    }

    private getDefaultCenter(props: GoogleMapsProps): google.maps.LatLngLiteral {
        const { defaultCenterLatitude, defaultCenterLongitude } = props;
        const location = {
            latitude: defaultCenterLatitude && parseFloat(defaultCenterLatitude),
            longitude: defaultCenterLongitude && parseFloat(defaultCenterLongitude)
        };
        if (validLocation(location)) {
            return {
                lat: parseFloat(defaultCenterLatitude!),
                lng: parseFloat(defaultCenterLongitude!)
            };
        }

        return this.defaultCenterLocation;
    }

    private onResize() {
        // When map is placed on the non default tab, the maps has no size.
        // Therefor it need to update on the first view.
        if (this.map && !this.state.resized) {
            this.createUpdateMap(this.props);
            this.setState({ resized: true });
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
            // this.map.addListener("dragend", () => {
            //     this.setState({ dragged: true });
            // });
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
