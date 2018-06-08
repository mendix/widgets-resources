import { Component, createElement } from "react";
import * as classNames from "classnames";

import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Label } from "./components/Label";
import { ColorPicker } from "./components/ColorPicker";
import ColorPickerContainer, { ColorPickerContainerProps } from "./components/ColorPickerContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ColorPickerContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<ColorPickerContainerProps, {}> {
    private color = {
        hex: "#000000",
        rgb: "rgb(0,0,0)",
        rgba: "rgb(0,0,0,1)"
    };

    render() {
        ColorPickerContainer.validateProps(this.props);
        return (this.props.label.trim() && this.props.showLabel) ? this.renderLabelColorPicker() : this.renderColorPicker();
    }

    private renderLabelColorPicker() {
        return createElement(Label, {
            className: classNames(
                this.props.class,
                { "widget-color-picker-vertical": this.props.labelOrientation === "vertical" }
            ),
            label: this.props.label,
            style: ColorPickerContainer.parseStyle(this.props.style),
            weight: this.props.labelWidth
        }, this.renderColorPicker(true));
    }

    private renderColorPicker(hasLabel = false) {
        return createElement(ColorPicker, {
            className: !hasLabel ? this.props.class : undefined,
            color: this.color[this.props.format],
            disabled: this.props.editable === "default",
            type: this.props.type,
            mode: this.props.mode,
            displayColorPicker: false,
            disableAlpha: this.props.format !== "rgba",
            defaultColors: this.props.defaultColors,
            style: !hasLabel ? ColorPickerContainer.parseStyle(this.props.style) : undefined
        }, this.props.mode === "input" ? this.renderInputColorPicker() : this.renderColorPickerButton());
    }

    private renderInputColorPicker() {
        return createElement(Input, {
            disabled: false,
            color: this.color[this.props.format]
        }, this.renderColorPickerButton());
    }

    private renderColorPickerButton() {
        return createElement(Button, {
            className: this.props.mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner",
            disabled: false,
            mode: this.props.mode,
            color: this.color[this.props.format]
        });
    }
}

export function getPreviewCss() {
    return require("./ui/ColorPicker.scss");
}

export function getVisibleProperties(valueMap: ColorPickerContainerProps, visibilityMap: VisibilityMap) {
    visibilityMap.onChangeMicroflow = valueMap.onChangeEvent === "callMicroflow";
    visibilityMap.onChangeNanoflow = valueMap.onChangeEvent === "callNanoflow";

    return visibilityMap;
}
