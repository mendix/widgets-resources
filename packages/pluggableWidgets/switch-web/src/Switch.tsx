import { createElement, KeyboardEvent, FunctionComponent } from "react";
import classNames from "classnames";

import { SwitchContainerProps } from "../typings/SwitchProps";
import { Alert } from "./components/Alert";

// import "./ui/Switch.scss";
import { isAvailable } from "@mendix/piw-utils-internal";

// note: it looks like "no-context" is not possible anymore as in framework an attribute is always available, but is unavailable, loading, or available.
// todo: should i move system prop visibility to separate group? or is it already there?
// todo: do we want to keep "default" style?

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: FunctionComponent<SwitchContainerProps> = props => {
    const isChecked = isAvailable(props.booleanAttribute);
    const editable = !props.booleanAttribute.readOnly;

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
                // onClick={editable ? props.onClick : undefined} // todo: execute action
                // onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                //     if (editable && e.key === " ") {
                //         e.preventDefault();
                //         props.onClick(); // todo: execute action
                //     }
                // }}
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
