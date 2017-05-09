import { DOM, SFC, createElement } from "react";
import * as classNames from "classnames";

import { Alert, AlertProps } from "./Alert";
import { BootstrapStyle } from "./SwitchContainer";

import "../ui/Switch.sass";

export interface SwitchProps {
    alertMessage?: string;
    bootstrapStyle: BootstrapStyle;
    className?: string;
    isChecked: boolean;
    onClick: () => void;
    status: SwitchStatus;
    style?: object;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: SFC<SwitchProps> = (props) =>
    DOM.div(
        {
            className: classNames("widget-switch", props.className, { "has-error": !!props.alertMessage }),
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
                className: classNames(`widget-switch-btn-wrapper widget-switch-btn-wrapper-${props.bootstrapStyle}`, {
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
        ),
        createElement(Alert, { message: props.alertMessage } as AlertProps)
    );

Switch.defaultProps = {
    bootstrapStyle: "success"
};

Switch.displayName = "Switch";
