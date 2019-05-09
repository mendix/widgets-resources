import { ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";

import { BarcodeScannerProps } from "../typings/BarcodeScannerProps";
import { BarcodeScannerStyle, defaultBarcodeScannerStyle } from "./ui/styles";

export type Props = BarcodeScannerProps<BarcodeScannerStyle>;

export class BarcodeScanner extends Component<Props> {
    private readonly styles = flattenStyles(defaultBarcodeScannerStyle, this.props.style);
    private readonly onBarCodeReadHandler = this.onBarCodeRead.bind(this);

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                <RNCamera
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                />
            </View>
        );
    }

    private onBarCodeRead(event: { data: string }): void {
        if (this.props.barcode.status !== ValueStatus.Available || event.data === this.props.barcode.value) {
            return;
        }

        this.props.barcode.setValue(event.data);

        if (this.props.onDetect && this.props.onDetect.canExecute) {
            this.props.onDetect.execute();
        }
    }
}
