import { createElement, ReactNode } from "react";
import { ColorPicker } from "./components/ColorPicker";
import { ColorPickerPreviewProps } from "../typings/ColorPickerProps";

export function preview(props: ColorPickerPreviewProps): ReactNode {
    return (
        <ColorPicker
            format={"hex"}
            onColorChange={() => undefined}
            onChange={() => undefined}
            tabIndex={undefined}
            color={"#3A65E5"}
            disabled={props.readOnly}
            mode={props.mode}
            type={props.type}
            defaultColors={props.defaultColors}
            name={"mx-color-picker"}
            id={"colorPicker"}
            invalidFormatMessage={props.invalidFormatMessage}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ColorPicker.scss");
}
