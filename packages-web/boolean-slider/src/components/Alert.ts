import { SFC, createElement } from "react";

interface AlertProps {
    message: string;
}

const Alert: SFC<AlertProps> = ({ message }) =>
    message
        ? createElement("div", { className: "alert alert-danger widget-switch-alert" }, message)
        : null;

Alert.displayName = "Alert";

export { Alert, AlertProps };
