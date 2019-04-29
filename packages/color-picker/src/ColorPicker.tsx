import { ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { fromHsv, HSV, TriangleColorPicker } from "react-native-color-picker";

import { ColorPickerProps } from "../typings/ColorPickerProps";
import { ColorPickerStyle, defaultColorWheelStyle } from "./ui/Styles";

export class ColorPicker extends Component<ColorPickerProps<ColorPickerStyle>> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultColorWheelStyle, this.props.style);

    render(): JSX.Element | null {
        return this.props.color.status === ValueStatus.Available ? (
            <TriangleColorPicker
                color={this.props.color.value}
                onColorChange={this.onChangeHandler}
                onColorSelected={this.onChangeCompleteHandler}
                style={this.styles.container}
            />
        ) : null;
    }

    private onChange(hsv: HSV): void {
        this.setValue(hsv);
    }

    private onChangeComplete(): void {
        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private setValue(hsv: HSV): void {
        if (this.props.color.status === ValueStatus.Available) {
            const value = fromHsv(hsv);
            this.props.color.setValue(value);
        }
    }
}
