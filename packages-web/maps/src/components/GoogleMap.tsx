import { Component, createElement, CSSProperties, ReactNode } from "react";
import classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import googleApiWrapper from "./GoogleApi";
import { validLocation } from "../utils/Validations";
import { Alert } from "@widgets-resources/piw-utils";
import { analyzeLocations, getCurrentUserLocation, getDimensions, Marker, ModeledMarker } from "../utils/Utils";
import { HeightUnitEnum, WidthUnitEnum } from "../../typings/MapsProps";

interface GoogleMapState {
    center: google.maps.LatLngLiteral;
    validationMessage?: string;
    resized: boolean;
    fetchingData?: boolean;
    locations?: Marker[];
    currentLocation?: Marker;
}

export interface GoogleMapsProps {
    scriptsLoaded?: boolean;
    validationMessage?: string;
    autoZoom: boolean;
    zoomLevel: number;
    mapsToken?: string;
    className?: string;
    defaultCenterLatitude: number;
    defaultCenterLongitude: number;
    locations?: ModeledMarker[];
    showCurrentLocation: boolean;
    mapStyles?: string;
    divStyles?: CSSProperties;

    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
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
        validationMessage: this.props.validationMessage,
        resized: false,
        locations: [],
        currentLocation: undefined
    };

    render(): ReactNode {
        return (
            <div
                className={classNames("widget-maps", this.props.className)}
                style={{ ...this.props.divStyles, ...getDimensions(this.props) }}
            >
                {this.state.validationMessage && (
                    <Alert bootstrapStyle="danger" className="widget-google-maps-alert">
                        {this.state.validationMessage}
                    </Alert>
                )}
                <div className="widget-google-maps-wrapper">
                    <div className="widget-google-maps" ref={this.getRef} />
                </div>
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    refreshRate={100}
                    refreshMode="throttle"
                    onResize={this.onResizeHandle}
                />
            </div>
        );
    }

    componentDidMount(): void {
        if (this.props.scriptsLoaded) {
            this.updateMarkers();
            if (this.props.showCurrentLocation) {
                getCurrentUserLocation().then(marker => this.setState({ currentLocation: marker }));
                // TODO: Add current location marker to the map
            }
            this.createUpdateMap(this.props);
        }
    }

    updateMarkers() {
        this.setState({ fetchingData: true });
        analyzeLocations(this.props.locations, this.props.mapsToken)
            .then(markers => {
                this.setState({ locations: markers }, () => this.addMarkers(markers));
            })
            .catch(error => {
                this.setState({ fetchingData: false, validationMessage: error.message });
            });
    }

    componentWillReceiveProps(nextProps: GoogleMapsProps): void {
        if (nextProps.validationMessage !== this.props.validationMessage) {
            this.setState({ validationMessage: nextProps.validationMessage });
        }
        if (nextProps.scriptsLoaded) {
            if (!this.map) {
                this.createUpdateMap(nextProps);
                this.setState({ resized: false });
            } else {
                this.updateMarkers();
            }
        }
    }

    componentDidUpdate(): void {
        if (this.map && !this.state.fetchingData && !this.state.resized) {
            if (!this.state.currentLocation) {
                this.map.setCenter(this.state.center);
            } else {
                const { latitude: lat, longitude: lng } = this.state.currentLocation;
                this.map.setCenter({
                    lat,
                    lng
                });
            }
        }
    }

    private getDefaultCenter(props: GoogleMapsProps): google.maps.LatLngLiteral {
        const { defaultCenterLatitude, defaultCenterLongitude } = props;
        const location = {
            latitude: defaultCenterLatitude,
            longitude: defaultCenterLongitude
        };
        if (validLocation(location)) {
            return {
                lat: defaultCenterLatitude,
                lng: defaultCenterLongitude
            };
        }

        return this.defaultCenterLocation;
    }

    private onResize(): void {
        // When map is placed on the non default tab, the maps has no size.
        // Therefor it need to update on the first view.
        if (this.map && !this.state.resized) {
            this.createUpdateMap(this.props);
            this.setState({ resized: true });
        }
    }

    private getRef = (node: HTMLDivElement): void => {
        this.googleMapsNode = node;
    };

    private createUpdateMap = (props: GoogleMapsProps): void => {
        const mapOptions: google.maps.MapOptions = {
            zoom: props.zoomLevel,
            zoomControl: true,
            scrollwheel: true,
            draggable: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
            rotateControl: true,
            minZoom: 1,
            maxZoom: 20,
            styles: this.getMapStyles()
        };
        if (this.googleMapsNode && !this.map) {
            this.map = new google.maps.Map(this.googleMapsNode, mapOptions);
        } else if (this.map) {
            this.map.setOptions(mapOptions);
        }
        //TODO: Markers only updating once, force to refresh markers when receive new ones
        //TODO: Implement cache
        this.updateMarkers();
    };

    private addMarkers = (mapLocations?: Marker[]): void => {
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
                    icon: currentLocation.url,
                    title: currentLocation.title
                });
                if (currentLocation.title) {
                    const infoContent = document.createElement("span");
                    infoContent.innerHTML = currentLocation.title || "";
                    infoContent.style.cursor = "pointer";
                    if (currentLocation.onClick) {
                        infoContent.onclick = () => {
                            if (currentLocation.onClick) {
                                currentLocation.onClick();
                            }
                        };
                    }
                    const infoWindow = new google.maps.InfoWindow({
                        content: infoContent
                    });
                    marker.addListener("click", () => {
                        infoWindow.open(this.map, marker);
                    });
                } else {
                    if (currentLocation.onClick) {
                        marker.addListener("click", () => {
                            currentLocation.onClick!();
                        });
                    } else {
                        marker.setClickable(false);
                    }
                }
                markerArray.push(marker);

                return markerArray;
            }, []);
            this.setMapOnMarkers(this.map);
            this.setBounds(this.bounds);
        }
    };

    private setBounds = (mapBounds?: google.maps.LatLngBounds): void => {
        const { defaultCenterLatitude, defaultCenterLongitude, zoomLevel, autoZoom } = this.props;
        setTimeout(() => {
            if (mapBounds && this.map) {
                try {
                    //TODO: Apply Zoom to fit only if is automatic
                    this.map.fitBounds(mapBounds);
                    if (!autoZoom) {
                        if (defaultCenterLatitude && defaultCenterLongitude) {
                            this.map.setCenter({
                                lat: defaultCenterLatitude,
                                lng: defaultCenterLongitude
                            });
                        }
                        this.map.setZoom(zoomLevel);
                    }
                } catch (error) {
                    this.setState({ validationMessage: `Invalid map bounds ${error.message}` });
                }
            }
        }, 0);
    };

    private setMapOnMarkers = (map?: google.maps.Map): void => {
        if (this.markers && this.markers.length && map) {
            this.markers.forEach(marker => marker.setMap(map));
        }
    };

    private getMapStyles(): google.maps.MapTypeStyle[] {
        if (this.props.mapStyles && this.props.mapStyles.trim()) {
            try {
                return JSON.parse(this.props.mapStyles);
            } catch (error) {
                this.setState({ validationMessage: `invalid Map styles, ${error.message}` });
            }
        }

        return [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];
    }
}

export default googleApiWrapper("https://maps.googleapis.com/maps/api/js?key=")(GoogleMap);
