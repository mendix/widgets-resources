import { Component, createElement, ReactNode } from "react";

import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Label } from "./components/Label";
import { ColorPicker } from "./components/ColorPicker";
import ColorPickerContainer, { ColorPickerContainerProps } from "./components/ColorPickerContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ColorPickerContainerProps]: boolean;
};

export class preview extends Component<ColorPickerContainerProps, {}> {
    private color = {
        hex: "#000000",
        rgb: "rgb(0,0,0)",
        rgba: "rgb(0,0,0,1)"
    };

    render(): ReactNode {
        return this.props.label.trim() && this.props.showLabel
            ? this.renderLabelColorPicker()
            : this.renderColorPicker();
    }

    private renderLabelColorPicker(): ReactNode {
        return createElement(
            Label,
            {
                className: this.props.class,
                label: this.props.label,
                orientation: this.props.labelOrientation,
                style: ColorPickerContainer.parseStyle(this.props.style),
                weight: this.props.labelWidth
            },
            this.renderColorPicker(true)
        );
    }

    private renderColorPicker(hasLabel = false): ReactNode {
        return createElement(
            ColorPicker,
            {
                alertMessage: ColorPickerContainer.validateProps(this.props),
                className: !hasLabel ? this.props.class : undefined,
                color: this.color[this.props.format],
                disabled: this.props.editable === "never",
                type: this.props.type,
                mode: this.props.mode,
                displayColorPicker: false,
                disableAlpha: this.props.format !== "rgba",
                defaultColors: this.props.defaultColors,
                style: !hasLabel ? ColorPickerContainer.parseStyle(this.props.style) : undefined
            },
            this.props.mode === "input" ? this.renderInputColorPicker() : this.renderColorPickerButton()
        );
    }

    private renderInputColorPicker(): ReactNode {
        return createElement(
            Input,
            {
                disabled: false,
                color: this.color[this.props.format]
            },
            this.renderColorPickerButton()
        );
    }

    private renderColorPickerButton(): ReactNode {
        return createElement(Button, {
            className: this.props.mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner",
            disabled: false,
            mode: this.props.mode,
            color: this.color[this.props.format]
        });
    }
}

export function getPreviewCss(): string {
    return require("./ui/ColorPicker.scss");
}

export function getVisibleProperties(valueMap: ColorPickerContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.onChangeMicroflow = valueMap.onChangeEvent === "callMicroflow";
    visibilityMap.onChangeNanoflow = valueMap.onChangeEvent === "callNanoflow";

    return visibilityMap;
}
