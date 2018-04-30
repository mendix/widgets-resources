import { Component, createElement } from "react";

export class ColorPicker extends Component<{}, {}> {
    render() {
        return createElement("div", {}, "Color Picker");
    }
}
