import { createElement, ReactElement } from "react";
import { parseStyle } from "@mendix/piw-utils-internal";

import { SwitchPreviewProps } from "../typings/SwitchProps";
import Switch from "./components/Switch";

export function preview(props: SwitchPreviewProps): ReactElement {
    const { className, style } = props;

    return (
        <Switch
            id="switch-preview"
            validation={undefined}
            editable={!props.readOnly ?? true}
            isChecked
            class={className}
            style={parseStyle(style)}
        />
    );
}

export function getPreviewCss() {
    return require("./ui/switch-main.scss");
}
