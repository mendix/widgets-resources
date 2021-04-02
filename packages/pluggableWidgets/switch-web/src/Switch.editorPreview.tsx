import { createElement, ReactElement } from "react";
import { parseStyle } from "@mendix/piw-utils-internal";

import { SwitchPreviewProps } from "../typings/SwitchProps";
import { Switch } from "./components/Switch";

export function preview(props: SwitchPreviewProps): ReactElement {
    // TODO: The widget generator is out of sync with Studio Pro design mode. Change PIW preview props typing (class -> className) generation to remove the ts-ignore below
    // @ts-ignore
    const { className, style, deviceStyle } = props;

    return (
        <Switch
            id="switch-preview"
            validation={undefined}
            // Studio Pro will pass `readOnly` value but this is excluded from preview prop typings (via generator)
            // @ts-ignore
            editable={!props.readOnly ?? true}
            isChecked={true}
            onClick={() => {}}
            onKeyDown={() => {}}
            deviceStyle={deviceStyle}
            class={className}
            style={parseStyle(style)}
        />
    );
}

export function getPreviewCss() {
    return require("./ui/switch-preview.scss");
}
