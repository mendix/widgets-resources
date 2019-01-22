import React, { Component } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface Props {
    markerTitle: PluginWidget.EditableValue<string>;
    markerDescription: PluginWidget.EditableValue<string>;
    markerLatitude: PluginWidget.EditableValue<BigJs.Big>;
    markerLongitude: PluginWidget.EditableValue<BigJs.Big>;
    onMarkerPress?: PluginWidget.ActionValue;

    latitude: PluginWidget.EditableValue<BigJs.Big>;
    longitude: PluginWidget.EditableValue<BigJs.Big>;
    latitudeDelta: PluginWidget.EditableValue<BigJs.Big>;
    longitudeDelta: PluginWidget.EditableValue<BigJs.Big>;
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
            latitude: Number(this.props.latitude.value),
            longitude: Number(this.props.longitude.value),
            latitudeDelta: Number(this.props.latitudeDelta.value),
            longitudeDelta: Number(this.props.longitudeDelta.value)
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
                    latitude: Number(this.props.markerLatitude.value),
                    longitude: Number(this.props.markerLongitude.value)
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
