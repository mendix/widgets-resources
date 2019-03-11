import { flattenStyles, Style } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { View, ViewStyle } from "react-native";
import RNQRCode from "react-native-qrcode-svg";

import { QRCodeProps } from "../typings/QRCodeProps";

interface QRCodeStyle extends Style {
    container: ViewStyle;
    qrcode: {
        size: number;
        color: string;
        backgroundColor: string;
    };
}

const defaultQRCodeStyle: QRCodeStyle = {
    container: {},
    qrcode: {
        size: 100,
        color: "black",
        backgroundColor: "white"
    }
};

export class QRCode extends Component<QRCodeProps<undefined>> {
    private readonly styles = flattenStyles(defaultQRCodeStyle, this.props.style);

    render(): JSX.Element | null {
        if (!this.props.value.value) {
            return null;
        }

        return (
            <View style={this.styles.container}>
                <RNQRCode
                    value={this.props.value.value}
                    size={this.styles.qrcode.size}
                    color={this.styles.qrcode.color}
                    backgroundColor={this.styles.qrcode.backgroundColor}
                />
            </View>
        );
    }
}
