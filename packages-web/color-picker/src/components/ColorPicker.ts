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
        photoshop: Picker.PhotoshopPicker
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
        }, this.renderCompoents(),
            this.renderPicker(),
            createElement(Alert, { className: "widget-color-picker-alert" }, this.props.alertMessage)
        );
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    private renderCompoents() {
        const { mode } = this.props;
        if (mode === "input") {
            return createElement("div", { className: "widget-color-picker-input-container" },
                createElement("input", {
                    className: classNames(`form-control widget-color-picker-button`),
                    type: "text",
                    value: this.props.color
                }),
                createElement("div", {
                    className: "widget-color-picker-input"
                },
                    createElement("div", {
                        className: "widget-color-picker-outer",
                        onClick: this.handleClick
                    }, createElement("div", { className: "widget-color-picker-input-inner", style: { background: this.props.color } }))
                )
            );
        } else {
            return createElement("div", {
                className: "widget-color-picker-outer",
                ...(mode === "popover") ? { onClick: this.handleClick } : {}
            }, createElement("div", { className: "widget-color-picker-inner", style: { background: this.props.color } }));
        }

    }

    private renderPicker() {
        const { mode } = this.props;
        if (this.state.displayColorPicker || mode === "inline") {
            return createElement("div", {
                className: classNames({ "widget-color-picker-popover": !(mode === "inline") })
            },
                createElement(this.components[this.props.type], {
                    color: this.props.color,
                    onChange: this.props.onChange,
                    onChangeComplete: this.props.onChangeComplete
                })
            );
        }
    }
}
