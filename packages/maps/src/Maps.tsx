import React, { Component } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface Props {
    markerTitle: PluginWidget.EditableValue<string | undefined>;
    markerDescription: PluginWidget.EditableValue<string | undefined>;
    markerLatitude: PluginWidget.EditableValue<number | undefined>;
    markerLongitude: PluginWidget.EditableValue<number | undefined>;
    onMarkerPress?: PluginWidget.ActionValue;

    latitude: PluginWidget.EditableValue<number | undefined>;
    longitude: PluginWidget.EditableValue<number | undefined>;
    latitudeDelta: PluginWidget.EditableValue<number | undefined>;
    longitudeDelta: PluginWidget.EditableValue<number | undefined>;
    onRegionChange?: PluginWidget.ActionValue;

    mapType: "standard" | "satellite" | "hybrid";
    showsUserLocation: boolean;
    showsMyLocationButton: boolean;
    showsPointsOfInterest: boolean;
    showsCompass: boolean;
    showsScale: boolean;
    showsBuildings: boolean;
    showsTraffic: boolean;
    showsIndoors: boolean;

    zoomEnabled: boolean;
    minZoomLevel: number;
    maxZoomLevel: number;
    rotateEnabled: boolean;
    scrollEnabled: boolean;
    pitchEnabled: boolean;
}

export class Maps extends Component<Props> {
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
            latitude: this.props.latitude.value,
            longitude: this.props.longitude.value,
            latitudeDelta: this.props.latitudeDelta.value,
            longitudeDelta: this.props.longitudeDelta.value
        };
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {!this.region ? (
                    <Text>No region defined</Text>
                ) : (
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={this.region}
                        onRegionChangeComplete={this.onRegionChangeHandler}
                        mapType={this.props.mapType}
                        showsUserLocation={this.props.showsUserLocation}
                        showsMyLocationButton={this.props.showsMyLocationButton}
                        showsPointsOfInterest={this.props.showsPointsOfInterest}
                        showsCompass={this.props.showsCompass}
                        showsScale={this.props.showsScale}
                        showsBuildings={this.props.showsBuildings}
                        showsTraffic={this.props.showsTraffic}
                        showsIndoors={this.props.showsIndoors}
                        zoomEnabled={this.props.zoomEnabled}
                        minZoomLevel={this.props.minZoomLevel}
                        maxZoomLevel={this.props.maxZoomLevel}
                        rotateEnabled={this.props.rotateEnabled}
                        scrollEnabled={this.props.scrollEnabled}
                        pitchEnabled={this.props.pitchEnabled}
                    >
                        {this.renderMarker()}
                    </MapView>
                )}
            </View>
        );
    }

    renderMarker(): JSX.Element | undefined {
        if (this.props.markerLatitude.value == null || this.props.markerLongitude.value == null) {
            return;
        }

        return (
            <Marker
                title={this.props.markerTitle.value}
                description={this.props.markerDescription.value}
                coordinate={{
                    latitude: this.props.markerLatitude.value,
                    longitude: this.props.markerLongitude.value
                }}
                onPress={this.onMarkerPressHandler}
            />
        );
    }

    private onRegionChange(region: Region): void {
        this.props.latitude.setValue(region.latitude);
        this.props.longitude.setValue(region.longitude);
        this.props.latitudeDelta.setValue(region.latitudeDelta);
        this.props.longitudeDelta.setValue(region.longitudeDelta);

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
