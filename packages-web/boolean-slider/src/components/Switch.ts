import { DOM, SFC } from "react";
import * as classNames from "classnames";

import { ColorStyle, DeviceStyle } from "./SwitchContainer";

import "../ui/Switch.sass";

export interface SwitchProps {
    colorStyle: ColorStyle;
    className?: string;
    deviceStyle?: DeviceStyle;
    isChecked: boolean;
    onClick: () => void;
    status: SwitchStatus;
    style?: object;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: SFC<SwitchProps> = (props) =>
    DOM.div(
        {
            className: classNames("widget-switch", props.className, props.deviceStyle),
            style: props.style
        },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-switch-checkbox", { enabled: props.status === "enabled" }),
            readOnly: true,
            type: "checkbox"
        }),
        DOM.div(
            {
                className: classNames(`widget-switch-btn-wrapper widget-switch-btn-wrapper-${props.colorStyle}`, {
                    "checked": props.isChecked,
                    "disabled": props.status === "disabled",
                    "no-switch": props.status === "no-context",
                    "un-checked": !props.isChecked
                }),
                onClick: props.status === "enabled" ? props.onClick : undefined
            },
            DOM.small({
                className: classNames("widget-switch-btn", {
                    left: !props.isChecked,
                    right: props.isChecked
                })
            })
        )
    );

Switch.defaultProps = {
    colorStyle: "default",
    deviceStyle: "auto"
};

Switch.displayName = "Switch";
