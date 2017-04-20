import { DOM, SFC, createElement } from "react";
import * as classNames from "classnames";

import { Alert, AlertProps } from "./Alert";

import "../ui/Switch.sass";

export interface SwitchProps {
    alertMessage?: string;
    className?: string;
    isChecked: boolean;
    onClick: () => void;
    status: SwitchStatus;
    style?: object;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: SFC<SwitchProps> = ({ alertMessage, className, isChecked, onClick, status, style }) =>
    DOM.div({ className: classNames("widget-switch", className, { "has-error": !!alertMessage }), style },
        DOM.input({
            checked: isChecked,
            className: classNames("widget-switch-checkbox", { enabled: status === "enabled" }),
            readOnly: true,
            type: "checkbox"
        }),
        DOM.div({
            className: classNames("widget-switch-btn", {
                "enabled": status === "enabled",
                "no-switch": status === "no-context"
            }),
            onClick: status === "enabled" ? onClick : undefined
        }),
        createElement(Alert, { message: alertMessage } as AlertProps)
    );

Switch.displayName = "Switch";
