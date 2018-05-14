import { Component, createElement } from "react";

import { Alert } from "./Alert";
import { Label } from "./Label";
import * as classNames from "classnames";
import * as Picker from "react-color";

import "../ui/ColorPicker.css";

interface ColorPickerProps {
    className?: string;
    color: string;
    type: PickerType;
    mode: Mode;
    disabled: boolean;
    style?: object;
    label: string;
    labelWidth: number;
    onChange?: Picker.ColorChangeHandler;
    alertMessage?: string;
    onChangeComplete?: Picker.ColorChangeHandler;
    onInputChange?: (event: any) => void;
}

interface ColorPickerState {
    displayColorPicker: boolean;
}

export type PickerType = "sketch" | "chrome" | "block" | "github" | "twitter" | "circle" | "hue" |
    "aplha" | "slider" | "compact" | "material" | "swatches";

export type Mode = "popover" | "input" | "inline";

export class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    private components: any = {
        sketch: Picker.SketchPicker,
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
            ),
            style: this.props.style
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
            return createElement("div", { className: "widget-color-picker-input-container" },
                createElement("input", {
                    className: "form-control",
                    type: "text",
                    disabled: this.props.disabled,
                    value: this.props.color,
                    onChange: this.props.onInputChange
                }),
                this.renderLabelComponent()
            );
        }

        return this.renderLabelComponent();
    }

    private renderPicker() {
        if (this.state.displayColorPicker || this.props.mode === "inline") {
            return createElement("div", {
                className: classNames({ "widget-color-picker-popover": !(this.props.mode === "inline") })
            },
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
                "btn",
                { "widget-color-picker-input": mode === "input" },
                { "widget-color-picker-inline": mode === "inline" },
                { "widget-color-picker-disabled": disabled }
            ),
            ...(!disabled && mode !== "inline")
                ? { onClick: this.handleClick, onBlur: this.handleClose }
                : {}
        };
    }

    private renderInnerComponents() {
        return createElement("button", {
            ...this.getDefaultProps()
        },
            createElement("div", {
                className: classNames(
                    { "widget-color-picker-inner": this.props.mode !== "input" },
                    { "widget-color-picker-input-inner": this.props.mode === "input" }
                ),
                style: { background: this.props.color }
            })
        );
    }

    private renderLabelComponent() {
        if (this.props.label.trim()) {
            return createElement(Label, {
                label: this.props.label,
                weight: this.props.labelWidth
            }, this.renderInnerComponents());
        }

        return this.renderInnerComponents();
    }
}
