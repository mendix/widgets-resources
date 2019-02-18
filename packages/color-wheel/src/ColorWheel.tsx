import colorsys from "colorsys";
import { Component, createElement } from "react";
import { ColorWheel as RNColorWheel, HSV } from "react-native-color-wheel";

import { ColorWheelProps } from "../typings/ColorWheelProps";

export class ColorWheel extends Component<ColorWheelProps> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);

    render(): JSX.Element | null {
        return this.props.color.status === PluginWidget.ValueStatus.Available ? (
            <RNColorWheel
                initialColor={this.props.color.value}
                thumbSize={this.props.handleSize}
                onColorChange={this.onChangeHandler}
                onColorChangeComplete={this.onChangeCompleteHandler}
            />
        ) : null;
    }

    private onChange(hsv: HSV): void {
        this.setValue(hsv);

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private onChangeComplete(hsv: HSV): void {
        this.setValue(hsv);

        if (this.props.onChangeComplete && this.props.onChangeComplete.canExecute) {
            this.props.onChangeComplete.execute();
        }
    }

    private setValue(hsv: HSV): void {
        if (this.props.color.status === PluginWidget.ValueStatus.Available) {
            const value = colorsys.hsvToHex(hsv);
            this.props.color.setValue(value);
        }
    }
}
