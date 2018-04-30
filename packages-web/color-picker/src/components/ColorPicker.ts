import { Component, createElement } from "react";
import { Color, ColorChangeHandler, ColorResult, SketchPicker } from "react-color";

interface ColorPickerProps {
    color: Color;
    type: PickerType;
    onChange?: ColorChangeHandler;
}

export type PickerType = "sketch" | "photoshop" | "chrome" | "block" | "github" | "twitter" | "circle" | "hue" |
    "aplha" | "slider" | "compact" | "material" | "swatches";

export class ColorPicker extends Component<ColorPickerProps, {}> {
    render() {
        return createElement(SketchPicker, {
            color: this.props.color,
            onChange: this.props.onChange
        });
    }
}
