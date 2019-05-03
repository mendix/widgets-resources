import { Component, createElement } from "react";
import { View, ViewProps } from "react-native";
import { RNCameraProps } from "react-native-camera";

export class RNCamera extends Component<RNCameraProps & ViewProps> {
    static constants = {
        Aspect: {},
        BarCodeType: {},
        Type: {},
        CaptureMode: {},
        CaptureTarget: {},
        CaptureQuality: {},
        Orientation: {},
        FlashMode: {},
        TorchMode: {}
    };

    render(): JSX.Element {
        return <View style={this.props.style} />;
    }
}
