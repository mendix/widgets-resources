import { createElement, KeyboardEvent, FunctionComponent } from "react";
import classNames from "classnames";

import { Alert } from "./components/Alert";
import { ColorStyle, DeviceStyle } from "./components/SwitchContainer";

import "./ui/Switch.scss";
import { EditableValueBuilder } from "../../../tools/piw-utils/dist"; // todo: remove
import { isAvailable } from "@mendix/piw-utils-internal";

export interface SwitchProps {
    alertMessage?: string;
    colorStyle: ColorStyle;
    className?: string;
    deviceStyle?: DeviceStyle;
    isChecked: boolean;
    onClick: () => void;
    status: SwitchStatus;
    style?: object;
    labelId?: string;
}

// note: it looks like "no-context" is not possible anymore as in framework an attribute is always available, but is unavailable, loading, or available.
// todo: should i move system prop visibility to separate group? or is it already there?

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: FunctionComponent<SwitchProps> = props => {
    const booleanAttribute = new EditableValueBuilder<boolean>().withValue(false).build();
    const editable = !booleanAttribute.readOnly;

    return (
        <div className={classNames("widget-switch", props.className, props.deviceStyle)} style={props.style}>
            <input
                checked={isAvailable(booleanAttribute)}
                className={classNames("widget-switch-checkbox", { enabled: editable })}
                readOnly={true}
                type={"checkbox"}
            />
            ,
            <div
                className={classNames(`widget-switch-btn-wrapper widget-switch-btn-wrapper-${props.colorStyle}`, {
                    checked: isAvailable(booleanAttribute),
                    disabled: !editable,
                    "no-switch": props.status === "no-context", // todo: i think this condition will never occur due to framework.
                    "un-checked": !isAvailable(booleanAttribute)
                })}
                onClick={editable ? props.onClick : undefined} // todo: execute action
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    if (editable && e.key === " ") {
                        e.preventDefault();
                        props.onClick(); // todo: execute action
                    }
                }}
                tabIndex={0}
                role={"checkbox"}
                aria-checked={isAvailable(booleanAttribute.value)}
                aria-labelledby={props.labelId}
            >
                <small
                    className={classNames("widget-switch-btn", {
                        left: !isAvailable(booleanAttribute),
                        right: isAvailable(booleanAttribute)
                    })}
                />
            </div>
            <Alert message={booleanAttribute.validation} />
        </div>
    );
};

Switch.defaultProps = {
    colorStyle: "default",
    deviceStyle: "auto"
};

Switch.displayName = "Switch";
