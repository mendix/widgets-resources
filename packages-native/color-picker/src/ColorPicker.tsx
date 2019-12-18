import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import { Component, createElement } from "react";
import { View, ViewStyle } from "react-native";

import { HueGradient, LightnessGradient, SaturationGradient } from "react-native-color";
import tinycolor from "tinycolor2";
import { ColorPickerProps } from "../typings/ColorPickerProps";
import { AlphaGradient } from "./components/AlphaGradient";
import { PickerSlider } from "./components/PickerSlider";
import { ColorPickerStyle, defaultColorPickerStyle } from "./ui/Styles";
import HSLA = tinycolor.ColorFormats.HSLA;
import { executeAction } from "@widgets-resources/piw-utils";

interface State {
    color?: HSLA;
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
    readonly state: State = {
        color: undefined
    };

    render(): JSX.Element | null {
        if (!this.props.color || this.props.color.status !== ValueStatus.Available || !this.props.color.value) {
            return null;
        }

        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex).toHsl();

        return (
            <View style={this.styles.container} testID={`${this.props.name}`}>
                {this.renderPreview()}
                {this.renderHue(color)}
                {this.renderSaturation(color)}
                {this.renderLightness(color)}
                {this.props.format !== "hex" && this.renderAlpha(color)}
            </View>
        );
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
        if (this.props.color.value !== prevProps.color.value && this.state.color === prevState.color) {
            this.setState({ color: undefined });
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

        executeAction(this.props.onChange);
    }

    private setColor(): void {
        const color = tinycolor(this.state.color);
        switch (this.props.format) {
            case "hex":
                this.props.color.setValue(color.toHexString());
                break;
            case "hsl":
                this.props.color.setValue(color.toHslString());
                break;
            case "hsv":
                this.props.color.setValue(color.toHsvString());
                break;
            case "rgb":
                this.props.color.setValue(color.toRgbString());
                break;
        }
    }

    private getColor(): string {
        const color = tinycolor(this.state.color);
        switch (this.props.format) {
            case "hex":
                return color.toHexString();
            case "hsl":
                return color.toHslString();
            case "hsv":
                return color.toHsvString();
            case "rgb":
                return color.toRgbString();
        }
        return "";
    }

    private renderPreview(): JSX.Element {
        return (
            <View
                testID={`${this.props.name}$preview`}
                style={[this.styles.preview, { backgroundColor: this.props.color.value }]}
            />
        );
    }

    private renderHue(color: HSLA): JSX.Element {
        return (
            <PickerSlider
                testID={`${this.props.name}$hue`}
                value={color.h}
                onValueChange={this.onChangeHueHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={1}
                maximumValue={359}
                component={<HueGradient gradientSteps={this.defaultSteps} />}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
            />
        );
    }

    private renderSaturation(color: HSLA): JSX.Element {
        return (
            <PickerSlider
                testID={`${this.props.name}$saturation`}
                value={color.s}
                onValueChange={this.onChangeSaturationHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<SaturationGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
            />
        );
    }

    private renderLightness(color: HSLA): JSX.Element {
        return (
            <PickerSlider
                testID={`${this.props.name}$lightness`}
                value={color.l}
                onValueChange={this.onChangeLightnessHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<LightnessGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
            />
        );
    }

    private renderAlpha(color: HSLA): JSX.Element {
        return (
            <PickerSlider
                testID={`${this.props.name}$alpha`}
                value={color.a}
                onValueChange={this.onChangeAlphaHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                component={<AlphaGradient color={color} gradientSteps={this.defaultSteps} />}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
            />
        );
    }

    private readonly getThumbStyle = (color: HSLA): ViewStyle => ({
        borderWidth: 1,
        borderColor: tinycolor(color).toHexString()
    });
}
