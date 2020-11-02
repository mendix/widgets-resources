import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import { Component, createElement } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";

import { BarcodeScannerProps } from "../typings/BarcodeScannerProps";
import { BarcodeScannerStyle, defaultBarcodeScannerStyle } from "./ui/styles";
import { executeAction } from "@widgets-resources/piw-utils";

export type Props = BarcodeScannerProps<BarcodeScannerStyle>;

export class BarcodeScanner extends Component<Props> {
    private readonly styles = flattenStyles(defaultBarcodeScannerStyle, this.props.style);
    private readonly onBarCodeReadHandler = throttle(this.onBarCodeRead.bind(this), 2000);

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                <RNCamera
                    testID={this.props.name}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                >
                    {this.props.showMask && (
                        <BarcodeMask
                            edgeColor={this.styles.mask.color}
                            width={this.styles.mask.width}
                            height={this.styles.mask.height}
                            backgroundColor={this.styles.mask.backgroundColor}
                            showAnimatedLine={this.props.showAnimatedLine}
                        />
                    )}
                </RNCamera>
            </View>
        );
    }

    private onBarCodeRead(event: { data: string }): void {
        if (this.props.barcode.status !== ValueStatus.Available || !event.data) {
            return;
        }

        if (event.data !== this.props.barcode.value) {
            this.props.barcode.setValue(event.data);
        }

        executeAction(this.props.onDetect);
    }
}

export function throttle<F extends (...params: any[]) => void>(fn: F, threshold: number): F {
    let wait = false;
    return function invokeFn(this: any, ...args: any[]) {
        if (!wait) {
            fn(...args);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, threshold);
        }
    } as F;
}
