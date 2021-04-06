import { createElement, FunctionComponent, KeyboardEvent, MouseEvent, useCallback } from "react";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";
import { Switch as SwitchComponent } from "./components/Switch";

import { SwitchContainerProps } from "../typings/SwitchProps";
import "./ui/switch-main.scss";

export const Switch: FunctionComponent<SwitchContainerProps> = props => {
    const isChecked = isAvailable(props.booleanAttribute);
    const editable = !props.booleanAttribute.readOnly;

    const invokeActionAndMaybeToggleValue = useCallback(
        function () {
            props.booleanAttribute.setValue(!props.booleanAttribute.value);
            executeAction(props.action);
        },
        [props.action, props.booleanAttribute]
    );

    const onClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (editable) {
                invokeActionAndMaybeToggleValue();
            }
        },
        [editable]
    );
    const onKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (editable && event.key === " ") {
                invokeActionAndMaybeToggleValue();
            }
        },
        [editable]
    );

    return (
        <SwitchComponent
            onClick={onClick}
            onKeyDown={onKeyDown}
            isChecked={isChecked}
            editable={editable}
            validation={props.booleanAttribute.validation}
            id={props.id}
            class={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            deviceStyle={props.deviceStyle}
        />
    );
};

Switch.displayName = "Switch";
