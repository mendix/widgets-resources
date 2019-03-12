import { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { Platform, StyleSheet, TouchableHighlight, View } from "react-native";

export class Marker extends Component<MarkerProps> {
    render(): JSX.Element {
        return (
            <TouchableHighlight>
                <View
                    style={
                        this.props.enabled
                            ? [
                                  styles.markerStyle,
                                  this.props.markerStyle,
                                  this.props.pressed && styles.pressedMarkerStyle,
                                  this.props.pressed && this.props.pressedMarkerStyle
                              ]
                            : [styles.markerStyle, styles.disabled, this.props.markerStyle]
                    }
                />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    markerStyle: {
        ...Platform.select({
            ios: {
                height: 30,
                width: 30,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                backgroundColor: "#FFFFFF",
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.2
            },
            android: {
                height: 12,
                width: 12,
                borderRadius: 12,
                backgroundColor: "#0D8675"
            }
        })
    },
    pressedMarkerStyle: {
        ...Platform.select({
            ios: {},
            android: {
                height: 20,
                width: 20,
                borderRadius: 20
            }
        })
    },
    disabled: {
        backgroundColor: "#d3d3d3",
        elevation: 0,
        shadowOpacity: 0
    }
});
