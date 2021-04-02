import { createElement, FunctionComponent, KeyboardEvent, MouseEvent, useCallback } from "react";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";
import { Switch as SwitchComponent } from "./components/Switch";

import { SwitchContainerProps } from "../typings/SwitchProps";
import "./ui/Switch.scss";

export const Switch: FunctionComponent<SwitchContainerProps> = props => {
    const isChecked = isAvailable(props.booleanAttribute);
    const editable = !props.booleanAttribute.readOnly;
    const onClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (editable) {
                if (props.booleanAttribute.status === ValueStatus.Available) {
                    props.booleanAttribute.setValue(!props.booleanAttribute.value);
                }
                executeAction(props.action);
            }
        },
        [props.action, props.booleanAttribute]
    );
    const onKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (editable && event.key === " ") {
                if (props.booleanAttribute.status === ValueStatus.Available) {
                    props.booleanAttribute.setValue(!props.booleanAttribute.value);
                }
                executeAction(props.action);
            }
        },
        [props.action, editable, props.booleanAttribute]
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
