import { Component, createElement, CSSProperties, ReactNode } from "react";
import classNames from "classnames";
import ReactResizeDetector from "react-resize-detector";

import googleApiWrapper from "./GoogleApi";
import { validLocation } from "../utils/Validations";
import { Alert } from "@widgets-resources/piw-utils";
import Utils from "../utils/Utils";
import { HeightUnitEnum, WidthUnitEnum } from "../../typings/MapsProps";

interface GoogleMapState {
    center: google.maps.LatLngLiteral;
    validationMessage?: string;
    resized: boolean;
    fetchingData?: boolean;
    locations?: Marker[];
    currentLocation?: Marker;
}

interface Marker {
    latitude: number;
    longitude: number;
    url: string;
    onClick?: () => void;
    description?: string;
}

export interface ModeledMarker {
    location: string;
    description?: string;
    customMarker?: string;
    action?: () => void;
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
                style={{ ...this.props.divStyles, ...Utils.getDimensions(this.props) }}
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
            this.getCurrentUserLocation();
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

    private analyzeLocations(): void {
        const unknownLatitudeLongitudes =
            this.props.locations?.filter(l => {
                const latLong = l.location.split(",");
                return !(latLong.length === 2 && parseFloat(latLong[0]) > 0 && parseFloat(latLong[1]) > 0);
            }) || [];
        const latitudeLongitudes =
            this.props.locations?.filter(
                location => !unknownLatitudeLongitudes.find(uLocation => uLocation.location === location.location)
            ) || [];

        if (unknownLatitudeLongitudes.length > 0) {
            if (!this.props.mapsToken) {
                this.setState({ validationMessage: "API key required in order to use markers containing address" });
                return;
            }
            this.setState({ fetchingData: true });
            Promise.all(
                unknownLatitudeLongitudes.map(location => fetch(this.obtainGeodecodeApiAddress(location.location)))
            )
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then((r: any) => {
                    // const results = [...r, ...latitudeLongitudes];
                    const results = latitudeLongitudes.map(location => {
                        const latLong = location.location.split(",");
                        const newObject: Marker = {
                            latitude: parseFloat(latLong[0]),
                            longitude: parseFloat(latLong[1]),
                            url: location.customMarker || "",
                            onClick: location.action,
                            description: location.description
                        };
                        return newObject;
                    });
                    results.push(
                        ...r
                            .filter((result: any) => result.results && result.results.length > 0)
                            .map((googleResult: any) => {
                                console.debug(googleResult);
                                const decodedLocation = googleResult.results[0].geometry.location;
                                const newObject: Marker = {
                                    latitude: decodedLocation.lat,
                                    longitude: decodedLocation.lng,
                                    url: "", // TODO: Match the location
                                    description: "Test", // TODO: Match the location
                                    onClick: () => {
                                        console.log("Pressed");
                                    }
                                };
                                return newObject;
                            })
                    );
                    if (this.state.currentLocation) {
                        results.push(this.state.currentLocation);
                    }
                    console.debug("Setting state to 1", results);
                    this.setState({ locations: results }, () => {
                        this.addMarkers(this.state.locations);
                    });
                });
        } else {
            const locations = latitudeLongitudes.map(location => {
                const latLong = location.location.split(",");
                const newObject: Marker = {
                    latitude: parseFloat(latLong[0]),
                    longitude: parseFloat(latLong[1]),
                    url: location.customMarker || "",
                    onClick: location.action,
                    description: location.description
                };
                return newObject;
            });
            if (this.state.currentLocation) {
                console.debug("Setting current location");
                locations.push(this.state.currentLocation);
            } else {
                console.debug("Current location not available");
            }

            console.debug("Setting state to 2", locations);

            this.setState(
                {
                    locations
                },
                () => {
                    this.addMarkers(this.state.locations);
                }
            );
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
                    icon: currentLocation.url,
                    title: currentLocation.description
                });
                const infoContent = document.createElement("span");
                infoContent.innerHTML = currentLocation.description || "";
                infoContent.style.cursor = "pointer";
                if (currentLocation.onClick) {
                    infoContent.onclick = () => {
                        if (currentLocation.onClick) {
                            currentLocation.onClick();
                        }
                    };
                }
                const infowindow = new google.maps.InfoWindow({
                    content: infoContent
                });

                if (currentLocation.description) {
                    marker.addListener("click", () => {
                        infowindow.open(this.map, marker);
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

    private getCurrentUserLocation(): void {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(
                        {
                            currentLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                url:
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAgwQECuLT1eNAAACtUlEQVRIx43Vy29VVRQG8F8r2LT0Vm2kDTUmgh1Zqsx0hpSZeuNIozMeiYaADhggjHwkRonGKbb9A6TKyCghJpRHIYoDH0QeI0tbiiFO1LaJ1LbLwd3cnn3vEbvu5J5vfWuvtb69zjotyqziBUOe8pgH8YdJPxv3tTlrsE2OWRAlvwWj+hvpLdlTuyMO2gCWXTbrFvo84kn3gX984m13ynP3u5xynbPLw5lvo93OJ+9FvWXh29wWwhXP/2d7VVeFMG1rc/Za+Gfa76lQhzEhTOVVtKfiP2jQpMxaHE2NtK2C76Xs/x9eO+LzlK5+cfPClabiWwyqqhpsOrjDNeGOx2uPx4RokG69N03XJ2DKAesb5AxhBCoWhHOZu9vZpjE6ozvjTAjzOnlVCLuy7GfTZR2y3XZvmUlHFKvYI4SXGRWWsrF5QwgnddaRilNC2F9g9VgShvle+CGTbkqY1omdxowZQsVNYTJr4ifhO34XvizAg0I4hJ1WhLBiCIeF8ESB+ZVwu1UXbhXgzeASXk/X1+K1hLClwJzFA62JsmpRR6IBy/+lqFZ/oa8A3wBPYzjRV4ziGchU6MOfXCoVcUYFQ447bge6zAq/Non4LSPCko0FxwEhnFKpI12+EcK+7BqXhU95RQi7s0EaF8KMw561wxGzQjhtXYG1Vwgv3R3l81lx3c40jfJpD2WcC8Jcbf2NCqGaudfZ70Y9eNK+LDsvitocQr9F4aoOjTagqmqgCd/guvB3mhl8KISxNS+UE0J4fxVqc1EIR9e00j4SwoT7i3BvWh9flDSSF3+ibKnC1nTEtQY5c+mup/CBMndvaiRM2JONFj32ulD39hQ7KlqbdxxMvS37xYzfsMmjBtVeu0Ufe9fivbrcYsR86cd1zvDqxZVXcNc6PWfINpvrn/cfjTtpoZn6LyulNWLKSWq8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAyLTEyVDE2OjE2OjQzKzAwOjAwPPYLaAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMi0xMlQxNjoxNjo0MyswMDowME2rs9QAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"
                            }
                        },
                        () => {
                            this.analyzeLocations();
                        }
                    );
                },
                () => {
                    console.debug("Current user location is not available");
                    this.analyzeLocations();
                }
            );
        }
    }
}

export default googleApiWrapper("https://maps.googleapis.com/maps/api/js?key=")(GoogleMap);
