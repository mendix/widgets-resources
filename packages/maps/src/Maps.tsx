import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Alert } from "react-native";
import Geocoder from "react-native-geocoder";
import MapView, { Marker, Region } from "react-native-maps";

import { MapsProps } from "../typings/MapsProps";
import { defaultMapsStyle, MapsStyle } from "./ui/Styles";

type LatLong = [number, number];
interface MapsState {
    geocodeCache: {
        [address: string]: LatLong | undefined;
    };
}

export class Maps extends Component<MapsProps<MapsStyle>, MapsState> {
    private readonly onRegionChangeHandler = this.onRegionChange.bind(this);
    private readonly styles = flattenStyles(defaultMapsStyle, this.props.style);

    readonly state: MapsState = {
        geocodeCache: {}
    };

    get region(): Region | undefined {
        if (
            this.props.latitude.value == null ||
            this.props.longitude.value == null ||
            this.props.latitudeDelta.value == null ||
            this.props.longitudeDelta.value == null
        ) {
            return;
        }

        return {
            latitude: Number(this.props.latitude.value),
            longitude: Number(this.props.longitude.value),
            latitudeDelta: Number(this.props.latitudeDelta.value),
            longitudeDelta: Number(this.props.longitudeDelta.value)
        };
    }

    render(): JSX.Element {
        const showsTraffic = this.props.mapType !== "satellite" ? true : false;

        return (
            <MapView
                provider={this.props.provider === "default" ? null : this.props.provider}
                region={this.region}
                onRegionChangeComplete={this.onRegionChangeHandler}
                mapType={this.props.mapType}
                showsUserLocation={this.props.showsUserLocation}
                showsMyLocationButton={this.props.showsMyLocationButton}
                showsTraffic={showsTraffic}
                zoomEnabled={this.props.zoomEnabled}
                minZoomLevel={this.props.minZoomLevel}
                maxZoomLevel={this.props.maxZoomLevel}
                rotateEnabled={this.props.rotateEnabled}
                scrollEnabled={this.props.scrollEnabled}
                pitchEnabled={this.props.pitchEnabled}
                style={this.styles.container}
            >
                {this.renderDynamicMarker()}
                {this.renderStaticMarkers()}
            </MapView>
        );
    }

    renderDynamicMarker(): JSX.Element | null {
        const latLong = this.getLatLong(
            this.props.markerLatitude && this.props.markerLatitude.value,
            this.props.markerLongitude && this.props.markerLongitude.value,
            this.props.markerAddress && this.props.markerAddress.value
        );

        if (!latLong) {
            return null;
        }

        return this.renderMarker(
            0,
            latLong[0],
            latLong[1],
            this.props.markerTitle && this.props.markerTitle.value,
            this.props.markerDescription && this.props.markerDescription.value,
            this.props.onMarkerPress
        );
    }

    renderStaticMarkers(): JSX.Element[] | undefined {
        if (!this.props.markers || this.props.markers.length === 0) {
            return;
        }

        return this.props.markers.map((marker, index) =>
            this.renderMarker(
                index + 1,
                Number(marker.latitude),
                Number(marker.longitude),
                marker.title,
                marker.description,
                marker.action
            )
        );
    }

    renderMarker(
        index: number,
        latitude: number,
        longitude: number,
        title?: string,
        description?: string,
        action?: ActionValue
    ): JSX.Element {
        const onPress = () => onMarkerPress(action);

        return (
            <Marker
                key={"map_marker_" + index}
                title={title}
                description={description}
                coordinate={{ latitude, longitude }}
                onPress={onPress}
                pinColor={this.styles.marker.color}
                opacity={this.styles.marker.opacity}
            />
        );
    }

    private onRegionChange(region: Region): void {
        this.props.latitude.setTextValue(String(region.latitude));
        this.props.longitude.setTextValue(String(region.longitude));
        this.props.latitudeDelta.setTextValue(String(region.latitudeDelta));
        this.props.longitudeDelta.setTextValue(String(region.longitudeDelta));

        if (this.props.onRegionChange && this.props.onRegionChange.canExecute) {
            this.props.onRegionChange.execute();
        }
    }

    private getLatLong(latitude?: BigJs.Big, longitude?: BigJs.Big, address?: string): LatLong | undefined {
        if (latitude && longitude) {
            return [Number(latitude), Number(longitude)];
        }

        if (address) {
            const cachedValue = this.state.geocodeCache[address];
            if (cachedValue) {
                return cachedValue;
            }

            this.geocodeAndCache(address);
        }

        return;
    }

    private geocodeAndCache(address: string): void {
        Geocoder.geocodeAddress(address)
            .then(results => {
                if (results.length === 0) {
                    throw new Error("No results found for the given address");
                }

                if (this.props.markerLatitude && this.props.markerLongitude) {
                    this.props.markerLatitude.setTextValue(String(results[0].position.lat));
                    this.props.markerLatitude.setTextValue(String(results[0].position.lng));
                } else {
                    this.setState({
                        geocodeCache: {
                            ...this.state.geocodeCache,
                            [address]: [results[0].position.lat, results[0].position.lng]
                        }
                    });
                }
            })
            .catch(() => {
                Alert.alert("Could not find the given address:", address);
            });
    }
}

function onMarkerPress(action?: ActionValue): void {
    if (action && action.canExecute) {
        action.execute();
    }
}
