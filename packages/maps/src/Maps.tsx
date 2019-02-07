import React, { Component } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Option } from "../../../typings/PluginWidget";
import { MapsProps } from "../typings/MapsProps";

export class Maps extends Component<MapsProps> {
    private readonly onRegionChangeHandler = this.onRegionChange.bind(this);
    private readonly onMarkerPressHandler = this.onMarkerPress.bind(this);

    get region(): Region | undefined {
        if (
            this.props.latitude.value == null ||
            this.props.longitude.value == null ||
            this.props.latitudeDelta.value == null ||
            this.props.longitudeDelta.value == null
        ) {
            return undefined;
        }

        return {
            latitude: Number(this.props.latitude.value),
            longitude: Number(this.props.longitude.value),
            latitudeDelta: Number(this.props.latitudeDelta.value),
            longitudeDelta: Number(this.props.longitudeDelta.value)
        };
    }

    render(): JSX.Element {
        const showsTraffic = this.props.mapType === "satellite" ? false : this.props.showsTraffic;
        const isAndroid = Platform.OS === "android";
        const mapType = this.props.mapType === "terrain" && !isAndroid ? "standard" : this.props.mapType;
        return (
            <MapView
                provider={this.props.provider === "default" ? null : this.props.provider}
                region={this.region}
                onRegionChangeComplete={this.onRegionChangeHandler}
                mapType={mapType}
                showsUserLocation={this.props.showsUserLocation}
                showsMyLocationButton={this.props.showsMyLocationButton}
                showsPointsOfInterest={this.props.showsPointsOfInterest}
                showsCompass={this.props.showsCompass}
                showsScale={this.props.showsScale}
                showsBuildings={this.props.showsBuildings}
                showsTraffic={showsTraffic}
                showsIndoors={this.props.showsIndoors}
                zoomEnabled={this.props.zoomEnabled}
                minZoomLevel={this.props.minZoomLevel}
                maxZoomLevel={this.props.maxZoomLevel}
                rotateEnabled={this.props.rotateEnabled}
                scrollEnabled={this.props.scrollEnabled}
                pitchEnabled={this.props.pitchEnabled}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {this.renderMarker()}
                {this.renderMarkers()}
            </MapView>
        );
    }

    renderMarker(): JSX.Element | undefined {
        if (this.props.markerLatitude.value == null || this.props.markerLongitude.value == null) {
            return;
        }

        return this.createMarker(
            this.props.markerTitle.value,
            this.props.markerDescription.value,
            Number(this.props.markerLatitude.value),
            Number(this.props.markerLongitude.value)
        );
    }

    renderMarkers(): JSX.Element[] | undefined {
        if (!this.props.markers || this.props.markers.length === 0) {
            return;
        }

        const markers: JSX.Element[] = [];
        this.props.markers.forEach(marker => {
            if (marker.latitude && marker.longitude) {
                markers.push(
                    this.createMarker(
                        marker.title,
                        marker.description,
                        Number(marker.latitude),
                        Number(marker.longitude)
                    )
                );
            }
        });

        return markers;
    }

    createMarker(title: Option<string>, description: Option<string>, latitude: number, longitude: number): JSX.Element {
        return (
            <Marker
                title={title}
                description={description}
                coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                }}
                onPress={this.onMarkerPressHandler}
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

    private onMarkerPress(): void {
        if (this.props.onMarkerPress && this.props.onMarkerPress.canExecute) {
            this.props.onMarkerPress.execute();
        }
    }
}
