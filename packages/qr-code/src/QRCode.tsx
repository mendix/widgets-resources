import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";
import RNQRCode from "react-native-qrcode-svg";

import { QRCodeProps } from "../typings/QRCodeProps";
import { defaultQRCodeStyle } from "./ui/Styles";

export class QRCode extends Component<QRCodeProps<undefined>> {
    private readonly styles = flattenStyles(defaultQRCodeStyle, this.props.style);

    render(): JSX.Element | null {
        const value = this.props.value && this.props.value.value ? this.props.value.value : this.props.defaultValue;

        if (!value) {
            return null;
        }

        return (
            <View style={this.styles.container}>
                <RNQRCode
                    value={value}
                    size={this.styles.qrcode.size}
                    color={this.styles.qrcode.color}
                    backgroundColor={this.styles.qrcode.backgroundColor}
                />
            </View>
        );
    }
}
