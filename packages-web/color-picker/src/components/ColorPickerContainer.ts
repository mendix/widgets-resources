import { Component, createElement } from "react";
import { ColorPicker, PickerType } from "./ColorPicker";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

interface ColorPickerContainerProps extends WrapperProps {
    colorAttribute: string;
    type: PickerType;
    onChangeMicroflow: string;
}

export default class ColorPickerContainer extends Component<ColorPickerContainerProps, {}> {
    render() {
        return createElement(ColorPicker, { type: this.props.type });
    }
}
