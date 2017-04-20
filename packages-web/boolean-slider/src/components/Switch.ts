import { DOM, SFC, createElement } from "react";
import * as classNames from "classnames";

import { Alert, AlertProps } from "./Alert";

import "../ui/Switch.sass";

export interface SwitchProps {
    status: SwitchStatus;
    isChecked: boolean;
    alertMessage?: string;
    onClick: () => void;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";

export const Switch: SFC<SwitchProps> = ({ alertMessage, isChecked, onClick, status }) =>
    DOM.div({ className: classNames("widget-switch", { "has-error": !!alertMessage }) },
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
