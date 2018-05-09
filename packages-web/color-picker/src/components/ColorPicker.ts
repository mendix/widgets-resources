import { Component, createElement } from "react";

import { Alert } from "./Alert";
import * as classNames from "classnames";
import * as Picker from "react-color";

import "../ui/ColorPicker.css";

interface ColorPickerProps {
    className?: string;
    color: string;
    type: PickerType;
    mode: Mode;
    disabled: boolean;
    onChange?: Picker.ColorChangeHandler;
    alertMessage?: string;
    onChangeComplete?: Picker.ColorChangeHandler;
}

interface ColorPickerState {
    displayColorPicker: boolean;
}

export type PickerType = "sketch" | "photoshop" | "chrome" | "block" | "github" | "twitter" | "circle" | "hue" |
    "aplha" | "slider" | "compact" | "material" | "swatches";

export type Mode = "popover" | "input" | "inline";

export class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    private components = {
        sketch: Picker.SketchPicker,
        photoshop: Picker.PhotoshopPicker,
        chrome: Picker.ChromePicker,
        block: Picker.BlockPicker,
        github: Picker.GithubPicker,
        twitter: Picker.TwitterPicker,
        circle: Picker.CirclePicker,
        hue: Picker.HuePicker,
        aplha: Picker.AlphaPicker,
        slider: Picker.SliderPicker,
        compact: Picker.CompactPicker,
        material: Picker.MaterialPicker,
        swatches: Picker.SwatchesPicker
    };

    constructor(props: ColorPickerProps) {
        super(props);

        this.state = {
            displayColorPicker: false
        };
    }

    render() {
        return createElement("div", {
            className: classNames(
                "widget-color-picker",
                this.props.className
            )
        }, this.renderComponents(),
            this.renderPicker(),
            createElement(Alert, { className: "widget-color-picker-alert" }, this.props.alertMessage)
        );
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    private renderComponents() {
        if (this.props.mode === "input") {
            return createElement("div", { className: "widget-color-picker-input-container" },
                createElement("input", {
                    className: classNames(`form-control widget-color-picker-button`),
                    type: "text",
                    value: this.props.color,
                    disabled: this.props.disabled
                }),
                createElement("div", {
                    className: "widget-color-picker-input"
                },
                    this.renderInnerOuterComponents()
                )
            );
        }

        return this.renderInnerOuterComponents();
    }

    private renderPicker() {
        if (this.state.displayColorPicker || this.props.mode === "inline") {
            return createElement("div", {
                className: classNames({ "widget-color-picker-popover": !(this.props.mode === "inline") })
            },
                createElement(this.components[this.props.type], {
                    color: this.props.color,
                    onChange: this.props.onChange,
                    onChangeComplete: this.props.onChangeComplete
                })
            );
        }
    }

    private renderInnerOuterComponents() {
        const { disabled, mode } = this.props;
        return createElement("div", {
            className: classNames(
                "widget-color-picker-outer",
                { "widget-color-picker-disabled": disabled },
                { "widget-color-picker-clickable": !(mode === "inline") }
            ),
            ...(!this.props.disabled && !(mode === "inline")) ? { onClick: this.handleClick } : {}
        }, createElement("div", {
            className: classNames(
                { "widget-color-picker-input-inner": mode === "input" },
                { "widget-color-picker-inner": !(mode === "input") }
            ),
            style: { background: this.props.color }
        }));
    }
}
