import { SFC, createElement } from "react";
import classNames from "classnames";

export interface AlertProps {
    message?: string;
    className?: string;
}

export const Alert: SFC<AlertProps> = ({ className, message }) =>
    message ? createElement("div", { className: classNames("alert alert-danger", className) }, message) : null;

Alert.displayName = "Alert";
