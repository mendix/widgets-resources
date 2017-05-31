import { DOM, SFC } from "react";

interface AlertProps {
    message: string;
}

const Alert: SFC<AlertProps> = ({ message }) =>
    message
        ? DOM.div({ className: "alert alert-danger widget-switch-alert" }, message)
        : null as any;

Alert.displayName = "Alert";

export { Alert, AlertProps };
