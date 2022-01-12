import { createElement, ReactNode } from "react";
import { ColorPicker } from "./components/ColorPicker";
import { ColorPickerPreviewProps } from "../typings/ColorPickerProps";

export function preview(props: ColorPickerPreviewProps): ReactNode {
    return (
        <ColorPicker
            format={"hex"}
            onChangeComplete={() => undefined}
            onChange={() => undefined}
            tabIndex={undefined}
            color={"#dedede"}
            disabled={props.readOnly}
            mode={props.mode}
            type={props.type}
            name={"mx-color-picker"}
            defaultColors={[]}
            id={"colorPicker"}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ColorPicker.scss");
}
