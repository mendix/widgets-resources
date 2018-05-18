import { Component, createElement } from "react";

import { Alert } from "./Alert";
import * as classNames from "classnames";
import * as Picker from "react-color";

import "../ui/ColorPicker.scss";

interface ColorPickerProps {
    className?: string;
    color: string;
    type: PickerType;
    mode: Mode;
    disabled: boolean;
    style?: object;
    displayColorPicker: boolean;
    onChange?: Picker.ColorChangeHandler;
    close?: () => void;
    alertMessage?: string;
    onChangeComplete?: Picker.ColorChangeHandler;
}

export type PickerType = "sketch" | "chrome" | "block" | "github" | "twitter" | "circle" | "hue" |
    "alpha" | "slider" | "compact" | "material" | "swatches";

export type Mode = "popover" | "input" | "inline";

export class ColorPicker extends Component<ColorPickerProps, {}> {
    private components: any = {
        sketch: Picker.SketchPicker,
        chrome: Picker.ChromePicker,
        block: Picker.BlockPicker,
        github: Picker.GithubPicker,
        twitter: Picker.TwitterPicker,
        circle: Picker.CirclePicker,
        hue: Picker.HuePicker,
        alpha: Picker.AlphaPicker,
        slider: Picker.SliderPicker,
        compact: Picker.CompactPicker,
        material: Picker.MaterialPicker,
        swatches: Picker.SwatchesPicker
    };

    render() {
        return createElement("div", {
            className: classNames("widget-color-picker", this.props.className),
            style: this.props.style
        },
            this.props.children,
            (this.props.displayColorPicker || this.props.mode === "inline")
                ? this.renderPicker()
                : null,
            createElement(Alert, { className: "widget-color-picker-alert" }, this.props.alertMessage)
        );
    }

    private renderPicker() {
        const { mode, type } = this.props;

        return createElement("div", {
            className: classNames(
                {
                    "widget-color-picker-popover": (mode !== "inline" && type !== "alpha" && type !== "slider")
                }
            )
        },
            mode !== "inline"
                ? createElement("div", { className: "widget-color-picker-cover", onClick: this.props.close })
                : null,
            createElement(this.components[type], {
                color: this.props.color,
                onChange: this.props.onChange,
                onChangeComplete: this.props.onChangeComplete,
                triangle: "hide"
            })
        );
    }
}
