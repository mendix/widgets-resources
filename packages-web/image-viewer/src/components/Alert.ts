import { StatelessComponent, createElement } from "react";
import * as classNames from "classnames";

export const Alert: StatelessComponent<{ message?: string, className?: string }> = ({ message, className }) =>
    message
        ? createElement("div", {
            className: classNames("alert alert-danger widget-validation-message", className)
        }, message)
        : null;

Alert.displayName = "Alert";
