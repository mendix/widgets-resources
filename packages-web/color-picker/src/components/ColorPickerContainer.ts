import { Component, createElement } from "react";
import { ColorPicker } from "./ColorPicker";

export default class ColorPickerContainer extends Component<{}, {}> {
    render() {
        return createElement(ColorPicker);
    }
}
