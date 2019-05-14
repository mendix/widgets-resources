import { ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { View, ViewStyle } from "react-native";

import { HueGradient, LightnessGradient, SaturationGradient } from "react-native-color";
import tinycolor from "tinycolor2";
import { ColorPickerProps } from "../typings/ColorPickerProps";
import { AlphaGradient } from "./components/AlphaGradient";
import { PickerSlider } from "./components/PickerSlider";
import { ColorPickerStyle, defaultColorPickerStyle } from "./ui/Styles";
import HSL = tinycolor.ColorFormats.HSL;

interface State {
    color?: HSL;
}

const enum Format {
    RGB = "rgb",
    HEX = "hex",
    HSV = "hsv",
    HSL = "hsl"
}

export type Props = ColorPickerProps<ColorPickerStyle>;

export class ColorPicker extends Component<Props, State> {
    private readonly onChangeHueHandler = this.onChangeHue.bind(this);
    private readonly onChangeSaturationHandler = this.onChangeSaturation.bind(this);
    private readonly onChangeLightnessHandler = this.onChangeLightness.bind(this);
    private readonly onChangeAlphaHandler = this.onChangeAlpha.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultColorPickerStyle, this.props.style);
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
                {this.props.format !== Format.HEX && this.renderAlpha()}
            </View>
        ) : null;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
        if (this.props.color.value !== prevProps.color.value) {
            if (this.state.color === prevState.color) {
                this.setState({ color: undefined });
            }
        }
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

    private onChangeAlpha(value: number): void {
        const color = tinycolor(this.props.color.value).toHsl();
        color.a = value;
        this.setState({ color });
    }

    private onChangeComplete(): void {
        if (this.state.color && this.props.color.value !== this.getColor()) {
            this.setColor();
        }
        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private setColor(): void {
        const color = tinycolor(this.state.color);
        switch (this.props.format.toString()) {
            case Format.HEX:
                this.props.color.setValue(color.toHexString());
                break;
            case Format.HSL:
                this.props.color.setValue(color.toHslString());
                break;
            case Format.HSV:
                this.props.color.setValue(color.toHsvString());
                break;
            case Format.RGB:
                this.props.color.setValue(color.toRgbString());
                break;
        }
    }

    private getColor(): string {
        const color = tinycolor(this.state.color);
        switch (this.props.format.toString()) {
            case Format.HEX:
                return color.toHexString();
            case Format.HSL:
                return color.toHslString();
            case Format.HSV:
                return color.toHsvString();
            case Format.RGB:
                return color.toRgbString();
        }
        return "";
    }

    private renderPreview(): JSX.Element {
        return <View style={[this.styles.preview, { backgroundColor: this.props.color.value }]} />;
    }

    private renderHue(): JSX.Element | null {
        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.h}
                onValueChange={this.onChangeHueHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={1}
                maximumValue={359}
                component={<HueGradient gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
                thumbStyle={this.getThumbStyle(color)}
            />
        ) : null;
    }

    private renderSaturation(): JSX.Element | null {
        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.s}
                onValueChange={this.onChangeSaturationHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<SaturationGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
                thumbStyle={this.getThumbStyle(color)}
            />
        ) : null;
    }

    private renderLightness(): JSX.Element | null {
        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.l}
                onValueChange={this.onChangeLightnessHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<LightnessGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
                thumbStyle={this.getThumbStyle(color)}
            />
        ) : null;
    }

    private renderAlpha(): JSX.Element | null {
        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex!).toHsl();
        return colorHex ? (
            <PickerSlider
                value={color.a}
                onValueChange={this.onChangeAlphaHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<AlphaGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={colorHex}
                thumbStyle={this.getThumbStyle(color)}
            />
        ) : null;
    }

    getThumbStyle(color: HSL): ViewStyle {
        return { borderWidth: 1, borderColor: tinycolor(color).toHexString() };
    }
}
