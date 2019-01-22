import React, { Component } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";

interface Props {
    inputValue?: PluginWidget.EditableValue<string>;
    onChange?: PluginWidget.ActionValue;
}

export class BarcodeScanner extends Component<Props> {
    private readonly onBarCodeReadHandler = this.onBarCodeRead.bind(this);

    render(): JSX.Element {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <RNCamera
                    style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                />
            </View>
        );
    }

    private onBarCodeRead(event: { data: string }): void {
        if (this.props.inputValue && this.props.inputValue.status === PluginWidget.ValueStatus.Available) {
            this.props.inputValue.setValue(event.data);

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }
}
