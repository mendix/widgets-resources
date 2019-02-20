import { Component, createElement } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";

import { BarcodeScannerProps } from "../typings/BarcodeScannerProps";

export class BarcodeScanner extends Component<BarcodeScannerProps> {
    private readonly onBarCodeReadHandler = this.onBarCodeRead.bind(this);

    render(): JSX.Element {
        return (
            <View style={{ flex: 1, minHeight: 100, flexDirection: "column" }}>
                <RNCamera
                    style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                />
            </View>
        );
    }

    private onBarCodeRead(event: { data: string }): void {
        if (
            this.props.barcode.status !== PluginWidget.ValueStatus.Available ||
            event.data === this.props.barcode.value
        ) {
            return;
        }

        this.props.barcode.setValue(event.data);

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }
}
