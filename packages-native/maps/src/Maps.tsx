import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ActionValue, DynamicValue } from "mendix";
import { Icon } from "mendix/components/native/Icon";
import { Component, createElement, createRef } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import MapView, { LatLng, Marker as MarkerView } from "react-native-maps";

import { DefaultZoomLevelEnum, MapsProps, MarkersType as MarkerProps } from "../typings/MapsProps";
import { defaultMapsStyle, MapsStyle } from "./ui/Styles";
import { CachedGeocoder } from "./util/CachedGeocoder";
import { executeAction } from "@widgets-resources/piw-utils";

type Props = MapsProps<MapsStyle>;

interface State {
    status: Status;
    markers?: Marker[];
}

const enum Status {
    LoadingMarkers = "loadingMarkers",
    LoadingMap = "loadingMap",
    MapReady = "mapReady",
    CameraAlmostReady = "cameraAlmostReady",
    CameraReady = "cameraReady"
}

interface Marker {
    key: string;
    props: MarkerProps;
    coordinate: LatLng;
}

export class Maps extends Component<Props, State> {
    readonly state: State = {
        status: Status.LoadingMarkers
    };

    private readonly onMapReadyHandler = this.onMapReady.bind(this);
    private readonly onRegionChangeCompleteHandler = this.onRegionChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultMapsStyle, this.props.style);
    private readonly mapViewRef = createRef<MapView>();
    private readonly geocoder = new CachedGeocoder();

    componentDidMount(): void {
        this.parseMarkers();
    }

    componentDidUpdate(): void {
        if (this.state.status === Status.LoadingMarkers) {
            this.parseMarkers();
        }
    }

    UNSAFE_componentWillReceiveProps(): void {
        if (this.state.status === Status.CameraReady) {
            this.parseMarkers();
        }
    }

    render(): JSX.Element {
        return (
            <View style={this.styles.container} testID={this.props.name}>
                {this.state.status !== Status.LoadingMarkers && (
                    <MapView
                        ref={this.mapViewRef}
                        provider={this.props.provider === "default" ? null : this.props.provider}
                        mapType={this.props.mapType}
                        showsUserLocation={this.props.showsUserLocation}
                        showsMyLocationButton={this.props.showsUserLocation}
                        showsTraffic={false}
                        minZoomLevel={toZoomValue(this.props.minZoomLevel)}
                        maxZoomLevel={toZoomValue(this.props.maxZoomLevel)}
                        rotateEnabled={this.props.interactive}
                        scrollEnabled={this.props.interactive}
                        pitchEnabled={false}
                        zoomEnabled={this.props.interactive}
                        style={{ flex: 1, alignSelf: "stretch" }}
                        liteMode={!this.props.interactive}
                        cacheEnabled={!this.props.interactive}
                        showsPointsOfInterest={false}
                        mapPadding={{ top: 40, right: 20, bottom: 20, left: 20 }}
                        onMapReady={this.onMapReadyHandler}
                        onRegionChangeComplete={this.onRegionChangeCompleteHandler}
                    >
                        {this.state.markers && this.state.markers.map(marker => this.renderMarker(marker))}
                    </MapView>
                )}
                {(this.state.status === Status.LoadingMarkers || this.state.status === Status.LoadingMap) && (
                    <View style={this.styles.loadingOverlay}>
                        <ActivityIndicator color={this.styles.loadingIndicator.color} size="large" />
                    </View>
                )}
            </View>
        );
    }

    private renderMarker({ key, props, coordinate }: Marker): JSX.Element {
        return (
            <MarkerView
                key={key}
                coordinate={coordinate}
                title={this.props.interactive ? props.title && props.title.value : ""}
                description={this.props.interactive ? props.description && props.description.value : ""}
                onPress={this.props.interactive ? () => onMarkerPress(props.onClick) : undefined}
                pinColor={props.color || this.styles.marker.color}
                opacity={this.styles.marker.opacity}
            >
                {props.icon && props.icon.value && (
                    <Icon
                        icon={props.icon.value}
                        color={props.color || this.styles.marker.color}
                        size={props.iconSize}
                    />
                )}
            </MarkerView>
        );
    }

    private onMapReady(): void {
        if (Platform.OS === "android") {
            this.updateCamera(false);
            this.setState({ status: this.props.interactive ? Status.MapReady : Status.CameraReady });
        }
        this.onRegionChangeComplete();
    }

    private onRegionChangeComplete(): void {
        if (Platform.OS === "android" && this.state.status === Status.MapReady) {
            this.setState({ status: Status.CameraReady });
        }

        if (Platform.OS === "ios") {
            switch (this.state.status) {
                case Status.LoadingMap:
                    this.setState({ status: Status.MapReady });
                    this.updateCamera(false);
                    break;
                case Status.MapReady:
                    this.setState({
                        status: this.props.provider === "default" ? Status.CameraAlmostReady : Status.CameraReady
                    });
                    break;
                case Status.CameraAlmostReady:
                    this.setState({ status: Status.CameraReady });
            }
        }
    }

    private async parseMarkers(): Promise<void> {
        const parsedMarkers = await Promise.all(
            this.props.markers.map(async (marker, index) => ({
                key: `map_marker_${index}`,
                props: marker,
                coordinate: await this.parseCoordinate(marker.latitude, marker.longitude, marker.address)
            }))
        );

        if (parsedMarkers.some(marker => marker.coordinate == null)) {
            return;
        }

        this.setState(
            {
                // eslint-disable-next-line react/no-access-state-in-setstate
                status: this.state.status === Status.LoadingMarkers ? Status.LoadingMap : this.state.status,
                markers: parsedMarkers as Marker[]
            },
            () => {
                if (this.state.status === Status.CameraReady) {
                    this.updateCamera(true);
                }
            }
        );
    }

    private async updateCamera(animate: boolean): Promise<void> {
        if (!this.mapViewRef.current) {
            return;
        }

        if (this.props.fitToMarkers && this.props.markers.length > 1) {
            this.mapViewRef.current.fitToElements(animate);
            return;
        }

        const camera = {
            center: await this.getCenter(),
            zoom: toZoomValue(this.props.defaultZoomLevel),
            altitude: toAltitude(this.props.defaultZoomLevel)
        };

        if (animate) {
            this.mapViewRef.current.animateCamera(camera);
        } else {
            this.mapViewRef.current.setCamera(camera);
        }
    }

    private async getCenter(): Promise<LatLng> {
        const center =
            this.props.markers.length === 1 && this.props.fitToMarkers
                ? await this.parseCoordinate(
                      this.props.markers[0].latitude,
                      this.props.markers[0].longitude,
                      this.props.markers[0].address
                  )
                : await this.parseCoordinate(
                      this.props.centerLatitude,
                      this.props.centerLongitude,
                      this.props.centerAddress
                  );

        return center || { latitude: 51.9066346, longitude: 4.4861703 };
    }

    private parseCoordinate(
        latitudeProp?: DynamicValue<BigJs.Big>,
        longitudeProp?: DynamicValue<BigJs.Big>,
        addressProp?: DynamicValue<string>
    ): Promise<LatLng | null> {
        if (latitudeProp && latitudeProp.value && longitudeProp && longitudeProp.value) {
            const latitude = Number(latitudeProp.value);
            const longitude = Number(longitudeProp.value);

            if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
                throw new Error(`Invalid coordinate provided: (${latitude}, ${longitude})`);
            }

            return Promise.resolve({ latitude, longitude });
        }

        if (addressProp && addressProp.value) {
            return this.geocoder.geocode(addressProp.value);
        }

        return Promise.resolve(null);
    }
}

function isValidLatitude(latitude: number): boolean {
    return !isNaN(latitude) && latitude <= 90 && latitude >= -90;
}

function isValidLongitude(longitude: number): boolean {
    return !isNaN(longitude) && longitude <= 180 && longitude >= -180;
}

function onMarkerPress(action?: ActionValue): void {
    executeAction(action);
}

function toZoomValue(level: DefaultZoomLevelEnum): number {
    switch (level) {
        case "world":
            return 3;
        case "continent":
            return 5;
        case "country":
            return 7;
        case "city":
            return 10;
        case "town":
            return 12;
        case "streets":
            return 15;
        case "building":
            return 20;
    }
}

function toAltitude(level: DefaultZoomLevelEnum): number {
    switch (level) {
        case "world":
            return 16026161;
        case "continent":
            return 4006540;
        case "country":
            return 1001635;
        case "city":
            return 125204;
        case "town":
            return 31301;
        case "streets":
            return 3914;
        case "building":
            return 122;
    }
}
