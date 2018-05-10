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
    private components: any = {
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

    private handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    private handleClose = () => {
        this.setState({ displayColorPicker: false });
    }

    private renderComponents() {
        if (this.props.mode === "input") {
            return createElement("div", { className: "input-group" },
                createElement("input", {
                    className: "form-control",
                    type: "text",
                    disabled: this.props.disabled,
                    placeholder: this.props.color
                }),
                createElement("span", {
                    ...this.getDefaultProps()
                }, createElement("div", {
                    className: "widget-color-picker-input-inner",
                    style: { background: this.props.color }
                }))
            );
        }

        return createElement("div", {
            ...this.getDefaultProps()
        }, createElement("div", {
            className: "widget-color-picker-inner",
            style: { background: this.props.color }
        }));
    }

    private renderPicker() {
        if (this.state.displayColorPicker || this.props.mode === "inline") {
            return createElement("div", {
                className: classNames({ "widget-color-picker-popover": !(this.props.mode === "inline") })
            },
                createElement("div", {
                    className: "widget-color-picker-cover",
                    onClick: this.handleClose
                }),
                createElement(this.components[this.props.type], {
                    color: this.props.color,
                    onChange: this.props.onChange,
                    onChangeComplete: this.props.onChangeComplete,
                    triangle: "hide"
                })
            );
        }
    }

    private getDefaultProps() {
        const { disabled, mode } = this.props;
        return {
            className: classNames(
                { "input-group-addon": mode === "input" },
                { "widget-color-picker-outer": mode !== "input" },
                { "widget-color-picker-disabled": disabled }
            ),
            ...(!disabled && mode !== "inline") ? { onClick: this.handleClick } : {}
        };
    }
}
