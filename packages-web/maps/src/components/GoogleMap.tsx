import { Component, createElement, CSSProperties, ReactNode } from "react";
import classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import googleApiWrapper from "./GoogleApi";
import { validLocation } from "../utils/Validations";
import { Alert } from "@widgets-resources/piw-utils";

interface GoogleMapState {
    center: google.maps.LatLngLiteral;
    validationMessage?: string;
    resized: boolean;
    fetchingData?: boolean;
    locations?: Marker[];
}

interface Marker {
    latitude: number;
    longitude: number;
    url: string;
    onClick: () => void;
}

interface ModeledMarker {
    location: string;
    action: () => void;
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
    mapStyles?: string;
    divStyles?: CSSProperties;
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
        resized: false
    };

    render(): ReactNode {
        return (
            <div className={classNames("widget-maps", this.props.className)} style={this.props.divStyles}>
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
            this.createUpdateMap(this.props);
        }
    }

    componentWillReceiveProps(nextProps: GoogleMapsProps): void {
        if (nextProps.validationMessage !== this.props.validationMessage) {
            this.setState({ validationMessage: nextProps.validationMessage });
        }
        if (nextProps.scriptsLoaded && !this.map) {
            this.createUpdateMap(nextProps);
            this.setState({ resized: false });
        }
        if ((!this.props.locations && nextProps.locations) || this.props.locations !== nextProps.locations) {
            this.analyzeLocations(nextProps.locations!);
        }
    }

    componentDidUpdate(): void {
        if (this.map && !this.state.fetchingData && !this.state.resized) {
            this.map.setCenter(this.state.center);
        }
    }

    private analyzeLocations(locations: ModeledMarker[]): void {
        const unknownLatitudeLongitudes = locations.filter(l => {
            const latLong = l.location.split(",");
            return !!(latLong.length === 2 && parseFloat(latLong[0]) && parseFloat(latLong[1]));
        });
        const latitudeLongitudes = locations.filter(
            location => !unknownLatitudeLongitudes.find(uLocation => uLocation.location === location.location)
        );

        if (unknownLatitudeLongitudes.length > 0) {
            if (!this.props.mapsToken) {
                this.setState({ validationMessage: "API key required in order to use markers containing address" });
                return;
            }
            this.setState({ fetchingData: true });
            Promise.all(
                unknownLatitudeLongitudes.map(location => fetch(this.obtainGeodecodeApiAddress(location.location)))
            ).then((r: any) => {
                // const results = [...r, ...latitudeLongitudes];
                const results = latitudeLongitudes.map(location => {
                    const latLong = location.location.split(",");
                    const newObject: Marker = {
                        latitude: parseFloat(latLong[0]),
                        longitude: parseFloat(latLong[1]),
                        url: "",
                        onClick: location.action
                    };
                    return newObject;
                });
                results.push(
                    ...r
                        .filter((result: any) => result.results.length > 0)
                        .map((googleResult: any) => {
                            const decodedLocation = googleResult.results[0].geometry.location;
                            const newObject: Marker = {
                                latitude: decodedLocation.lat,
                                longitude: decodedLocation.lng,
                                url: "",
                                onClick: () => {
                                    console.log("Pressed");
                                }
                            };
                            return newObject;
                        })
                );
                return results;
            });
        } else {
            this.setState({
                locations: latitudeLongitudes.map(location => {
                    const latLong = location.location.split(",");
                    const newObject: Marker = {
                        latitude: parseFloat(latLong[0]),
                        longitude: parseFloat(latLong[1]),
                        url: "",
                        onClick: location.action
                    };
                    return newObject;
                })
            });
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
            draggable: false,
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
        this.setDefaultCenter();
    };

    private setDefaultCenter = (): void => {
        if (!this.state.fetchingData) {
            this.addMarkers(this.state.locations);
        }
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
                    icon: currentLocation.url
                });
                if (currentLocation.onClick) {
                    marker.addListener("click", () => {
                        currentLocation.onClick();
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
    };

    private setBounds = (mapBounds?: google.maps.LatLngBounds): void => {
        const { defaultCenterLatitude, defaultCenterLongitude, zoomLevel, autoZoom } = this.props;
        setTimeout(() => {
            if (mapBounds && this.map) {
                try {
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

    private obtainGeodecodeApiAddress(address: string): string {
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${
            this.props.mapsToken
        }`;
    }
}

export default googleApiWrapper("https://maps.googleapis.com/maps/api/js?key=")(GoogleMap);
