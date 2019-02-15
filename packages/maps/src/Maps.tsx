import React, { Component } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

import { MapsProps } from "../typings/MapsProps";

export class Maps extends Component<MapsProps> {
    private readonly onRegionChangeHandler = this.onRegionChange.bind(this);

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
                {this.renderDynamicMarker()}
                {this.renderStaticMarkers()}
            </MapView>
        );
    }

    renderDynamicMarker(): JSX.Element | undefined {
        if (this.props.markerLatitude.value == null || this.props.markerLongitude.value == null) {
            return;
        }

        return this.renderMarker(
            0,
            Number(this.props.markerLatitude.value),
            Number(this.props.markerLongitude.value),
            this.props.markerTitle.value,
            this.props.markerDescription.value,
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
        action?: PluginWidget.ActionValue
    ): JSX.Element {
        const onPress = () => onMarkerPress(action);
        return (
            <Marker
                key={"map_marker_" + index}
                title={title}
                description={description}
                coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                }}
                onPress={onPress}
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
}

function onMarkerPress(action?: PluginWidget.ActionValue): void {
    if (action && action.canExecute) {
        action.execute();
    }
}
