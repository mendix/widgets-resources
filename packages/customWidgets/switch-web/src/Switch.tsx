import { SFC, createElement, KeyboardEvent } from "react";
import classNames from "classnames";

import { Alert } from "./components/Alert";
import { ColorStyle, DeviceStyle } from "./components/SwitchContainer";

import "./ui/Switch.scss";

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

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: SFC<SwitchProps> = props => (
    <div className={classNames("widget-switch", props.className, props.deviceStyle)} style={props.style}>
        <input
            checked={props.isChecked}
            className={classNames("widget-switch-checkbox", { enabled: props.status === "enabled" })}
            readOnly={true}
            type={"checkbox"}
        />
        ,
        <div
            className={classNames(`widget-switch-btn-wrapper widget-switch-btn-wrapper-${props.colorStyle}`, {
                checked: props.isChecked,
                disabled: props.status === "disabled",
                "no-switch": props.status === "no-context",
                "un-checked": !props.isChecked
            })}
            onClick={props.status === "enabled" ? props.onClick : undefined}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (props.status === "enabled" && e.key === " ") {
                    e.preventDefault();
                    props.onClick();
                }
            }}
            tabIndex={0}
            role={"checkbox"}
            aria-checked={props.isChecked}
            aria-labelledby={props.labelId}
        >
            <small
                className={classNames("widget-switch-btn", {
                    left: !props.isChecked,
                    right: props.isChecked
                })}
            />
        </div>
        <Alert message={props.alertMessage} />
    </div>
);

Switch.defaultProps = {
    colorStyle: "default",
    deviceStyle: "auto"
};

Switch.displayName = "Switch";
