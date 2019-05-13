import { ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";

import { HueGradient, LightnessGradient, SaturationGradient } from "react-native-color";
import tinycolor from "tinycolor2";
import { ColorPickerProps } from "../typings/ColorPickerProps";
import { PickerSlider } from "./components/PickerSlider";
import { ColorPickerStyle, defaultColorWheelStyle } from "./ui/Styles";
import HSL = tinycolor.ColorFormats.HSL;

interface ColorPickerState {
    color?: HSL;
}

export class ColorPicker extends Component<ColorPickerProps<ColorPickerStyle>, ColorPickerState> {
    private readonly onChangeHueHandler = this.onChangeHue.bind(this);
    private readonly onChangeSaturationHandler = this.onChangeSaturation.bind(this);
    private readonly onChangeLightnessHandler = this.onChangeLightness.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultColorWheelStyle, this.props.style);
    private readonly defaultSteps = 80;
    readonly state = {
        color: undefined
    };

    render(): JSX.Element | null {
        return this.props.color && this.props.color.status === ValueStatus.Available && this.props.color.value ? (
            <View style={this.styles.container}>
                {this.renderPreview()}
                {this.renderHue()}
                {this.renderSaturation()}
                {this.renderLightness()}
            </View>
        ) : null;
    }

    private onChangeHue(value: number): void {
        const color = tinycolor(this.props.color.value).toHsl();
        color.h = value;
        this.setState({ color });
    }

    private onChangeSaturation(value: number): void {
        const color = tinycolor(this.props.color.value).toHsl();
        color.s = value;
        this.setState({ color });
    }

    private onChangeLightness(value: number): void {
        const color = tinycolor(this.props.color.value).toHsl();
        color.l = value;
        this.setState({ color });
    }

    private onChangeComplete(): void {
        if (this.state.color) {
            this.props.color.setValue(tinycolor(this.state.color).toHexString());
        }
        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private renderPreview(): JSX.Element {
        return <View style={[this.styles.preview, { backgroundColor: this.props.color.value }]} />;
    }

    private renderHue(): JSX.Element | null {
        const colorHex = this.state.color ? tinycolor(this.state.color).toHexString() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.h}
                onValueChange={this.onChangeHueHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={1}
                maximumValue={359}
                component={<HueGradient gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex!}
            />
        ) : null;
    }

    private renderSaturation(): JSX.Element | null {
        const colorHex = this.state.color ? tinycolor(this.state.color).toHexString() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.s}
                onValueChange={this.onChangeSaturationHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                maximumValue={1}
                component={<SaturationGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
            />
        ) : null;
    }

    private renderLightness(): JSX.Element | null {
        const colorHex = this.state.color ? tinycolor(this.state.color).toHexString() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.l}
                onValueChange={this.onChangeLightnessHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                maximumValue={1}
                component={<LightnessGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
            />
        ) : null;
    }
}
