import React, { Component } from "react";
import RNQRCode from "react-native-qrcode-svg";

import { QRCodeProps } from "../typings/QRCodeProps";

export class QRCode extends Component<QRCodeProps> {
    render(): JSX.Element | null {
        if (!this.props.value.value) {
            return null;
        }

        return (
            <RNQRCode
                value={this.props.value.value}
                size={this.props.size}
                color={this.props.color}
                backgroundColor={this.props.backgroundColor}
            />
        );
    }
}
