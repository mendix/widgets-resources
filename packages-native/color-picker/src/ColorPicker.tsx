import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import { Component, createElement, ReactElement, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { HueGradient, LightnessGradient, SaturationGradient } from "react-native-color";
import tinycolor from "tinycolor2";
import { ColorPickerProps } from "../typings/ColorPickerProps";
import { PickerSlider } from "./components/PickerSlider";
import { AlphaGradient } from "./components/AlphaGradient";
import { DisabledHueGradient } from "./components/DisabledHueGradient";
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

    render(): ReactNode {
        if (!this.props.color || this.props.color.status !== ValueStatus.Available || !this.props.color.value) {
            return null;
        }

        const colorHex = this.state.color ? this.getColor() : this.props.color.value;
        const color = tinycolor(colorHex).toHsl();

        return (
            <View style={this.styles.container} testID={`${this.props.name}`}>
                {this.renderPreview(color)}
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
            this.props.color.setValue(this.getColor());
        }

        executeAction(this.props.onChange);
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
    }

    private renderPreview(color: HSLA): ReactNode {
        return (
            this.props.showPreview && (
                <View
                    testID={`${this.props.name}$preview`}
                    style={[this.styles.preview, { backgroundColor: tinycolor(color).toHslString() }]}
                />
            )
        );
    }

    private renderHue(color: HSLA): ReactElement {
        const component = this.props.color.readOnly ? (
            <DisabledHueGradient color={color} />
        ) : (
            <HueGradient gradientSteps={this.defaultSteps} />
        );
        return (
            <PickerSlider
                testID={`${this.props.name}$hue`}
                value={color.h}
                onValueChange={this.onChangeHueHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={1}
                maximumValue={359}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
                disabled={this.props.color.readOnly}
            >
                {component}
            </PickerSlider>
        );
    }

    private renderSaturation(color: HSLA): ReactNode {
        if (!this.props.showSaturation || this.props.color.readOnly) {
            return null;
        }
        return (
            <PickerSlider
                testID={`${this.props.name}$saturation`}
                value={color.s}
                onValueChange={this.onChangeSaturationHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
                disabled={this.props.color.readOnly}
            >
                <SaturationGradient color={color} gradientSteps={this.defaultSteps} />
            </PickerSlider>
        );
    }

    private renderLightness(color: HSLA): ReactNode {
        if (!this.props.showLightness || this.props.color.readOnly) {
            return null;
        }
        return (
            <PickerSlider
                testID={`${this.props.name}$lightness`}
                value={color.l}
                onValueChange={this.onChangeLightnessHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
                disabled={this.props.color.readOnly}
            >
                <LightnessGradient color={color} gradientSteps={this.defaultSteps} />
            </PickerSlider>
        );
    }

    private renderAlpha(color: HSLA): ReactNode {
        if (!this.props.showAlpha || this.props.color.readOnly) {
            return null;
        }
        return (
            <PickerSlider
                testID={`${this.props.name}$alpha`}
                value={color.a}
                onValueChange={this.onChangeAlphaHandler}
                onValueChangeComplete={this.onChangeCompleteHandler}
                step={0.01}
                thumbTintColor={tinycolor(color).toHslString()}
                thumbStyle={this.getThumbStyle(color)}
                disabled={this.props.color.readOnly}
            >
                <AlphaGradient color={color} gradientSteps={this.defaultSteps} />
            </PickerSlider>
        );
    }

    private readonly getThumbStyle = (color: HSLA): ViewStyle => ({
        borderWidth: 1,
        borderColor: tinycolor(color).toHexString()
    });
}
