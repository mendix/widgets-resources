import { Component, createElement } from "react";
import { Color, ColorResult, SketchPicker } from "react-color";

interface ColorPickerProps {
    color?: Color;
    type: PickerType;
    onChange?: (color: ColorResult) => void;
}

export type PickerType = "sketch" | "photoshop" | "chrome" | "block" | "github" | "twitter" | "circle" | "hue" |
    "aplha" | "slider" | "compact" | "material" | "swatches";

export class ColorPicker extends Component<ColorPickerProps, {}> {
    render() {
        return createElement(SketchPicker);
    }
}
