import { Component, createElement } from "react";
import { ColorPicker } from "./components/ColorPicker";

// tslint:disable-next-line class-name
export class preview extends Component<{}, {}> {
    render() {
        return createElement(ColorPicker);
    }
}
