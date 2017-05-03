import { DOM, SFC } from "react";

const Alert: SFC<{ message?: string }> = ({ message }) =>
    message
        ? DOM.div({ className: "alert alert-danger widget-badge-button" }, message)
        : null as any;

Alert.displayName = "Alert";

export { Alert };
