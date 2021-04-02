import { createElement, ReactElement } from "react";
import { parseStyle } from "@mendix/piw-utils-internal";

import { SwitchPreviewProps } from "../typings/SwitchProps";
import { Switch } from "./components/Switch";

export function preview(props: SwitchPreviewProps): ReactElement {
    const { class: className, style, deviceStyle } = props;

    return (
        <Switch
            id="switch-preview"
            validation={undefined}
            editable={false}
            isChecked={true}
            onClick={() => {}}
            onKeyDown={() => {}}
            deviceStyle={deviceStyle}
            class={className}
            style={parseStyle(style)}
        />
    );
}
