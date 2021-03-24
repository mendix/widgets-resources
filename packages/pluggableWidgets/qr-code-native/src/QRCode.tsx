import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { Component, createElement } from "react";
import { View } from "react-native";
import RNQRCode from "react-native-qrcode-svg";

import { QRCodeProps } from "../typings/QRCodeProps";
import { defaultQRCodeStyle } from "./ui/Styles";

export type Props = QRCodeProps<undefined>;

export class QRCode extends Component<Props> {
    private readonly styles = flattenStyles(defaultQRCodeStyle, this.props.style);

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                {this.props.value.value ? (
                    <RNQRCode
                        value={this.props.value.value}
                        size={this.styles.qrcode.size}
                        color={this.styles.qrcode.color}
                        backgroundColor={this.styles.qrcode.backgroundColor}
                    />
                ) : null}
            </View>
        );
    }
}
