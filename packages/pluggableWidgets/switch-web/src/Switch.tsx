import { createElement, FunctionComponent, KeyboardEvent, useCallback } from "react";
import classNames from "classnames";
import { ValueStatus } from "mendix";

import { SwitchContainerProps } from "../typings/SwitchProps";
import { Alert } from "./components/Alert";

import "./ui/Switch.scss";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";

// note: it looks like "no-context" is not possible anymore as in framework an attribute is always available, but is unavailable, loading, or available.
// todo: should i move system prop visibility to separate group? or is it already there?
// todo: do we want to keep "default" style?

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: FunctionComponent<SwitchContainerProps> = props => {
    const isChecked = isAvailable(props.booleanAttribute);
    const editable = !props.booleanAttribute.readOnly;
    const onClick = useCallback(() => {
        if (props.booleanAttribute.status === ValueStatus.Available) {
            props.booleanAttribute.setValue(!props.booleanAttribute.value);
        }
        executeAction(props.action);
    }, [props.action, props.booleanAttribute]);
    const onKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (editable && e.key === " ") {
                e.preventDefault();
                executeAction(props.action);
            }
        },
        [props.action]
    );

    return (
        <div className={classNames("widget-switch", props.class, props.deviceStyle)} style={props.style}>
            <input
                checked={isChecked}
                className={classNames("widget-switch-checkbox", { enabled: editable })}
                readOnly={true}
                type={"checkbox"}
            />
            ,
            <div
                className={classNames(
                    `widget-switch-btn-wrapper`,
                    {
                        "widget-switch-btn-wrapper-default": !props.class?.match(
                            /widget-switch-btn-wrapper-{primary|secondary|success|warning|danger}/
                        )
                    },
                    props.class,
                    {
                        checked: isChecked,
                        disabled: !editable,
                        "un-checked": !isChecked
                    }
                )}
                onClick={editable ? onClick : undefined}
                onKeyDown={onKeyDown}
                tabIndex={0}
                role={"checkbox"}
                aria-checked={isChecked}
                aria-labelledby={props.id}
            >
                <small
                    className={classNames("widget-switch-btn", {
                        left: !isChecked,
                        right: isChecked
                    })}
                />
            </div>
            <Alert message={props.booleanAttribute.validation} />
        </div>
    );
};

Switch.displayName = "Switch";
