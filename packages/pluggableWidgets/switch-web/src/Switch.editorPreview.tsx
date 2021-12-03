import { createElement, ReactElement } from "react";

import { SwitchPreviewProps } from "../typings/SwitchProps";
import Switch from "./components/Switch";

export function preview(props: SwitchPreviewProps): ReactElement {
    return <Switch id="switch-preview" validation={undefined} editable={!props.readOnly ?? true} isChecked />;
}

export function getPreviewCss() {
    return require("./ui/switch-main.scss");
}
