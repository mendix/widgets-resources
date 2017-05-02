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
        DOM.div({
            className: classNames(`widget-switch-btn widget-switch-btn-${props.bootstrapStyle}`, {
                "enabled": props.status === "enabled",
                "no-switch": props.status === "no-context"
            }),
            onClick: props.status === "enabled" ? props.onClick : undefined
        }),
        createElement(Alert, { message: props.alertMessage } as AlertProps)
    );

Switch.defaultProps = {
    bootstrapStyle: "primary"
};

Switch.displayName = "Switch";
