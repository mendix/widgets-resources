import { DOM, StatelessComponent } from "react";
import * as classNames from "classnames";

export const Alert: StatelessComponent<{ message?: string, className?: string }> = ({ message, className }) =>
    message ?
        DOM.div({ className: classNames("alert alert-danger widget-validation-message", className) }, message)
        : null;

Alert.displayName = "Alert";
