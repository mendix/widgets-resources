import { Component, createElement, ReactNode } from "react";

import { Alert } from "./Alert";
import classNames from "classnames";
import * as Picker from "react-color";

import "../ui/ColorPicker.scss";

export interface ColorPickerProps {
    className?: string;
    color: string;
    type: PickerType;
    mode: Mode;
    disabled: boolean;
    disableAlpha?: boolean;
    style?: object;
    displayColorPicker: boolean;
    onChange?: Picker.ColorChangeHandler;
    close?: () => void;
    alertMessage?: string;
    onChangeComplete?: Picker.ColorChangeHandler;
    defaultColors: Array<{ color: string }>;
}

export type PickerType =
    | "sketch"
    | "chrome"
    | "block"
    | "github"
    | "twitter"
    | "circle"
    | "hue"
    | "slider"
    | "compact"
    | "material"
    | "swatches";

export type Mode = "popover" | "input" | "inline";

export class ColorPicker extends Component<ColorPickerProps, {}> {
    private components: { [P in PickerType]: any } = {
        sketch: Picker.SketchPicker,
        chrome: Picker.ChromePicker,
        block: Picker.BlockPicker,
        github: Picker.GithubPicker,
        twitter: Picker.TwitterPicker,
        circle: Picker.CirclePicker,
        hue: Picker.HuePicker,
        slider: Picker.SliderPicker,
        compact: Picker.CompactPicker,
        material: Picker.MaterialPicker,
        swatches: Picker.SwatchesPicker
    };

    render(): ReactNode {
        return createElement(
            "div",
            {
                className: classNames("widget-color-picker-picker", this.props.className, {
                    "widget-color-picker-disabled": this.props.disabled
                }),
                style: this.props.style
            },
            this.props.children,
            this.props.displayColorPicker || this.props.mode === "inline" ? this.renderPicker() : null,
            createElement(Alert, { className: "widget-color-picker-alert" }, this.props.alertMessage)
        );
    }

    private renderPicker(): ReactNode {
        const { defaultColors, disabled, mode, type } = this.props;
        const colors = defaultColors.map(color => color.color);
        const supportPopover = mode !== "inline" && type !== "hue" && type !== "slider";

        return createElement(
            "div",
            {
                className: classNames({
                    "widget-color-picker-popover": supportPopover,
                    "widget-color-picker-no-popover": mode !== "inline"
                })
            },
            mode !== "inline"
                ? createElement("div", { className: "widget-color-picker-cover", onClick: this.props.close })
                : null,
            disabled ? createElement("div", { className: "widget-color-picker-overlay" }) : null,
            createElement(this.components[type], {
                color: this.props.color,
                colors: defaultColors.length > 0 && type !== "swatches" ? colors : undefined,
                onChange: this.props.onChange,
                onChangeComplete: this.props.onChangeComplete,
                presetColors: defaultColors.length > 0 ? colors : undefined,
                triangle: "hide",
                disableAlpha: this.props.disableAlpha,
                styles: type === "slider" ? { default: { wrap: {} } } : {}
            })
            // styles, is a temp work around for issue https://github.com/casesandberg/react-color/issues/585
        );
    }
}
