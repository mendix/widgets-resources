import { Component, createElement } from "react";

import { Alert } from "./components/Alert";
import { ColorPicker } from "./components/ColorPicker";

import ColorPickerContainer, { ColorPickerContainerProps } from "./components/ColorPickerContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ColorPickerContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<ColorPickerContainerProps, {}> {
    render() {
        return createElement("div", {},
            createElement(Alert, { className: "widget-charts-color-picker-alert" },
                ColorPickerContainer.validateProps(this.props)
            ),
            createElement(ColorPicker, {
                color: "#000000",
                type: this.props.type,
                mode: this.props.mode,
                disabled: false,
                label: this.props.label,
                labelWidth: this.props.labelWidth
            })
        );
    }
}

export function getPreviewCss() {
    return require("./ui/ColorPicker.css");
}

export function getVisibleProperties(valueMap: ColorPickerContainerProps, visibilityMap: VisibilityMap) {
    visibilityMap.onChangeMicroflow = valueMap.onChangeEvent === "callMicroflow";
    visibilityMap.onChangeNanoflow = valueMap.onChangeEvent === "callNanoflow";
    visibilityMap.onChangePage = valueMap.onChangeEvent === "showPage";

    return visibilityMap;
}
