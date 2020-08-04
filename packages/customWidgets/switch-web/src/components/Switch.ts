import { SFC, createElement } from "react";
import classNames from "classnames";

import { Alert } from "./Alert";
import { ColorStyle, DeviceStyle } from "./SwitchContainer";

import "../ui/Switch.scss";

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

export const Switch: SFC<SwitchProps> = props =>
    createElement(
        "div",
        {
            className: classNames("widget-switch", props.className, props.deviceStyle),
            style: props.style
        },
        createElement("input", {
            checked: props.isChecked,
            className: classNames("widget-switch-checkbox", { enabled: props.status === "enabled" }),
            readOnly: true,
            type: "checkbox"
        }),
        createElement(
            "div",
            {
                className: classNames(`widget-switch-btn-wrapper widget-switch-btn-wrapper-${props.colorStyle}`, {
                    checked: props.isChecked,
                    disabled: props.status === "disabled",
                    "no-switch": props.status === "no-context",
                    "un-checked": !props.isChecked
                }),
                onClick: props.status === "enabled" ? props.onClick : undefined,
                onKeyDown: (e: KeyboardEvent) => {
                    if (props.status === "enabled" && e.key === " ") {
                        e.preventDefault();
                        props.onClick();
                    }
                },
                tabIndex: 0,
                role: "checkbox",
                "aria-checked": props.isChecked,
                "aria-labelledby": props.labelId
            },
            createElement("small", {
                className: classNames("widget-switch-btn", {
                    left: !props.isChecked,
                    right: props.isChecked
                })
            })
        ),
        createElement(Alert, { message: props.alertMessage })
    );

Switch.defaultProps = {
    colorStyle: "default",
    deviceStyle: "auto"
};

Switch.displayName = "Switch";
