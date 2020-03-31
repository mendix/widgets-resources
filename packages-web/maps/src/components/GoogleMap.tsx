import { Component, createElement, CSSProperties, ReactNode } from "react";
import classNames from "classnames";

import googleApiWrapper from "./GoogleApi";
import { Alert } from "@widgets-resources/piw-utils";
import { getCurrentUserLocation, getDimensions } from "../utils";
import { HeightUnitEnum, Marker, ModeledMarker, WidthUnitEnum } from "../../typings";
import { analyzeLocations } from "../utils";

interface GoogleMapState {
    center: google.maps.LatLngLiteral;
    validationMessage?: string;
    currentLocation?: Marker;
}

export interface GoogleMapsProps {
    scriptsLoaded?: boolean;
    validationMessage?: string;
    autoZoom: boolean;
    zoomLevel: number;
    mapsToken?: string;
    className?: string;
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

    readonly state: GoogleMapState = {
        center: this.defaultCenterLocation,
        validationMessage: this.props.validationMessage,
        currentLocation: undefined
    };

    render(): ReactNode {
        console.log("RENDER");
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
            </div>
        );
    }

    componentDidMount(): void {
        console.log("DID MOUNT");
        if (this.props.scriptsLoaded) {
            if (this.props.showCurrentLocation) {
                getCurrentUserLocation().then(marker => {
                    this.setState({ currentLocation: marker }, () => this.updateMarkers());
                });
            }
            this.createUpdateMap(this.props);
        }
    }

    updateMarkers() {
        console.log("UPDATE MARKERS");
        analyzeLocations(this.props.locations, this.props.mapsToken)
            .then(markers => {
                this.addMarkers(markers);
            })
            .catch(error => {
                this.setState({ validationMessage: error.message });
            });
    }

    componentDidUpdate(prevProps: Readonly<GoogleMapsProps>): void {
        console.log("DID UPDATE", this.state);
        if (this.map) {
            if (prevProps.locations !== this.props.locations) {
                this.updateMarkers();
            }
            if (!this.state.currentLocation) {
                this.map.setCenter(this.state.center);
            } else {
                const { latitude: lat, longitude: lng } = this.state.currentLocation;
                this.map.setCenter({
                    lat,
                    lng
                });
            }
        } else {
            this.createUpdateMap(this.props);
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
        this.updateMarkers();
    };

    private addMarkers = (mapLocations?: Marker[]): void => {
        console.log("ADD MARKERS", mapLocations?.length ?? 0);
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
        if (mapLocations && mapLocations.length) {
            this.bounds = new google.maps.LatLngBounds();
            this.markers = mapLocations.reduce<google.maps.Marker[]>((markerArray, currentLocation) => {
                const marker = this.addMarker(currentLocation);
                markerArray.push(marker);

                return markerArray;
            }, []);
            if (this.state.currentLocation) {
                this.markers.push(this.addMarker(this.state.currentLocation));
            }
            this.setMapOnMarkers(this.map);
            this.setBounds(this.bounds);
        }
    };

    private addMarker(marker: Marker): google.maps.Marker {
        this.bounds.extend({
            lat: marker.latitude,
            lng: marker.longitude
        });
        const mapMarker = new google.maps.Marker({
            position: {
                lat: marker.latitude,
                lng: marker.longitude
            },
            icon: marker.url,
            title: marker.title
        });
        if (marker.title) {
            const infoContent = document.createElement("span");
            infoContent.innerHTML = marker.title || "";
            infoContent.style.cursor = "pointer";
            if (marker.onClick) {
                infoContent.onclick = () => {
                    if (marker.onClick) {
                        marker.onClick();
                    }
                };
            }
            const infoWindow = new google.maps.InfoWindow({
                content: infoContent
            });
            mapMarker.addListener("click", () => {
                infoWindow.open(this.map, mapMarker);
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
        return mapMarker;
    }

    private setBounds = (mapBounds?: google.maps.LatLngBounds): void => {
        const { zoomLevel, autoZoom } = this.props;
        setTimeout(() => {
            if (mapBounds && this.map) {
                try {
                    if (!autoZoom) {
                        console.log(this.markers[0]);
                        this.map.setCenter({
                            lat: this.markers[0].getPosition()?.lat() ?? this.state.center.lat,
                            lng: this.markers[0].getPosition()?.lng() ?? this.state.center.lng
                        });
                        this.map.setZoom(zoomLevel);
                    } else {
                        this.map.fitBounds(mapBounds);
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
