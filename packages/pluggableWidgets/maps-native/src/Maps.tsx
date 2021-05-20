import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { ActionValue, ValueStatus, Option } from "mendix";
import { Icon } from "mendix/components/native/Icon";
import { Component, createElement, createRef } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import MapView, { LatLng, Marker as MarkerView } from "react-native-maps";
import { Big } from "big.js";

import { DefaultZoomLevelEnum, DynamicMarkersType, MapsProps, MarkersType } from "../typings/MapsProps";
import { ModeledMarker } from "../typings/shared";
import { defaultMapsStyle, MapsStyle } from "./ui/Styles";
import { CachedGeocoder } from "./util/CachedGeocoder";
import { executeAction } from "@mendix/piw-utils-internal";
import { convertDynamicModeledMarker, convertStaticModeledMarker } from "./util/data";

export type Props = MapsProps<MapsStyle>;

interface State {
    status: Status;
    markers?: Marker[];
    minZoomLevel: number;
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
    props: ModeledMarker;
    coordinate: LatLng;
}
export class Maps extends Component<Props, State> {
    readonly state: State = {
        status: Status.LoadingMarkers,
        minZoomLevel: 3
    };

    private readonly onMapReadyHandler = this.onMapReady.bind(this);
    private readonly onRegionChangeCompleteHandler = this.onRegionChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultMapsStyle, this.props.style);
    private readonly mapViewRef = createRef<MapView>();
    private readonly geocoder = new CachedGeocoder();

    componentDidMount(): void {
        if (!this.props.dynamicMarkers.length) {
            this.parseMarkers();
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State): void {
        if (this.props !== prevProps) {
            const markersChanged = didMarkersChange(prevState.markers, this.props.markers, this.props.dynamicMarkers);

            if (
                (this.state.status === Status.LoadingMarkers ||
                    (this.state.status === Status.CameraReady && markersChanged)) &&
                (!this.props.dynamicMarkers.length ||
                    this.props.dynamicMarkers.every(m => m.markersDS?.status === ValueStatus.Available))
            ) {
                // TODO: Only parse new or updated markers. No need to re-parse existing markers
                // TODO: Check for removed markers and remove them from the state
                this.parseMarkers();
            }
        }
    }

    render(): JSX.Element {
        return (
            <View style={this.styles.container} testID={this.props.name}>
                {this.state.status !== Status.LoadingMarkers ? (
                    <MapView
                        ref={this.mapViewRef}
                        provider={this.props.provider === "default" ? null : this.props.provider}
                        mapType={this.props.mapType}
                        showsUserLocation={this.props.showsUserLocation}
                        showsMyLocationButton={this.props.showsUserLocation}
                        showsTraffic={false}
                        minZoomLevel={this.state.minZoomLevel}
                        maxZoomLevel={toZoomValue(this.props.maxZoomLevel)}
                        rotateEnabled={this.props.interactive}
                        scrollEnabled={this.props.interactive}
                        pitchEnabled={false}
                        zoomEnabled={this.props.interactive}
                        style={{ flex: 1, alignSelf: "stretch" }}
                        liteMode={!this.props.interactive}
                        cacheEnabled={!this.props.interactive}
                        showsPointsOfInterest={false}
                        mapPadding={{ top: 48, right: 48, bottom: 48, left: 48 }}
                        onMapReady={this.onMapReadyHandler}
                        onRegionChangeComplete={this.onRegionChangeCompleteHandler}
                    >
                        {this.state.markers ? this.state.markers.map(marker => this.renderMarker(marker)) : null}
                    </MapView>
                ) : null}
                {this.state.status === Status.LoadingMarkers || this.state.status === Status.LoadingMap ? (
                    <View style={this.styles.loadingOverlay}>
                        <ActivityIndicator color={this.styles.loadingIndicator.color} size="large" />
                    </View>
                ) : null}
            </View>
        );
    }

    private renderMarker({ key, props, coordinate }: Marker): JSX.Element {
        return (
            <MarkerView
                key={key}
                coordinate={coordinate}
                title={this.props.interactive ? props.title : ""}
                description={this.props.interactive ? props.description : ""}
                onPress={this.props.interactive ? () => onMarkerPress(props.onClick) : undefined}
                pinColor={props.iconColor || this.styles.marker.color}
                opacity={this.styles.marker.opacity}
            >
                {props.icon && (
                    <Icon icon={props.icon} color={props.iconColor || this.styles.marker.color} size={props.iconSize} />
                )}
            </MarkerView>
        );
    }

    private async onMapReady(): Promise<void> {
        this.setState({ minZoomLevel: toZoomValue(this.props.minZoomLevel) });
        await this.updateCamera(false);
        if (Platform.OS === "android") {
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
                        status: Status.CameraReady
                    });
                    break;
            }
        }
    }

    private async parseMarkers(): Promise<void> {
        const markers = [
            ...this.props.markers.map(convertStaticModeledMarker),
            ...this.props.dynamicMarkers.flatMap(convertDynamicModeledMarker)
        ];

        const parsedMarkers = await Promise.all(
            markers.map(async (marker, index) => ({
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

    private async updateCamera(animated: boolean): Promise<void> {
        if (!this.mapViewRef.current) {
            return;
        }

        const camera = {
            center: await this.getCenter(),
            zoom: toZoomValue(this.props.defaultZoomLevel),
            altitude: toAltitude(this.props.defaultZoomLevel)
        };

        if (this.props.fitToMarkers && this.state.markers && this.state.markers.length > 1) {
            const coords = (this.state.markers as Marker[]).map(marker => marker.coordinate);
            this.mapViewRef.current.fitToCoordinates(coords, { animated });
        } else {
            if (animated) {
                this.mapViewRef.current.animateCamera(camera);
            } else {
                this.mapViewRef.current.setCamera(camera);
            }
        }
    }

    private async getCenter(): Promise<LatLng> {
        const { fitToMarkers, centerLatitude, centerLongitude, centerAddress } = this.props;
        const center =
            (isValidCoordinate(centerLatitude?.value) && isValidCoordinate(centerLongitude?.value)) || centerAddress
                ? await this.parseCoordinate(
                      Number(centerLatitude?.value),
                      Number(centerLongitude?.value),
                      centerAddress?.value
                  )
                : this.state.markers?.length === 1 && fitToMarkers
                ? this.state.markers[0].coordinate
                : { latitude: 51.9066346, longitude: 4.4861703 };

        return center as LatLng;
    }

    private parseCoordinate(
        latitude?: Option<number>,
        longitude?: Option<number>,
        address?: Option<string>
    ): Promise<LatLng> {
        if (isValidCoordinate(latitude) && isValidCoordinate(longitude)) {
            latitude = latitude as number;
            longitude = longitude as number;
            if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
                throw new Error(`Invalid coordinate provided: (${latitude}, ${longitude})`);
            }
            return Promise.resolve({ latitude, longitude });
        } else if (address) {
            return this.geocoder.geocode(address);
        } else {
            throw new Error(
                `Address: "${address}", Latitude: "${latitude}", Longitude: "${longitude}". None of these values could be parsed to coordinates.`
            );
        }
    }
}

function didMarkersChange(
    prevMarkers: Option<Marker[]>,
    newMarkers: MarkersType[],
    newDynamicMarkers: DynamicMarkersType[]
): boolean {
    const markers = newMarkers.flatMap(convertStaticModeledMarker) as ModeledMarker[];
    const dynamicMarkers = newDynamicMarkers.flatMap(convertDynamicModeledMarker) as ModeledMarker[];
    const combinedMarkers = [...dynamicMarkers, ...markers];

    return (
        prevMarkers?.length !== combinedMarkers?.length ||
        !!combinedMarkers?.filter(
            (marker: ModeledMarker) =>
                prevMarkers?.filter((prevMarker: Marker) => {
                    for (const [key, value] of Object.entries(marker)) {
                        if (value !== prevMarker.props[key]) {
                            return false;
                        }
                    }
                    return true;
                }).length !== prevMarkers.length
        ).length
    );
}

function isValidCoordinate(value: Option<Big | number>): boolean {
    return /-?\d{1,2}(?:\.\d+)?/.test(`${value}`);
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
