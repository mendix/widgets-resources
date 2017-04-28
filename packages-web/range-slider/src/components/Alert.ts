import { DOM, SFC } from "react";

export const Alert: SFC<{ message?: string }> = ({ message }) =>
    message ? DOM.div({ className: "alert alert-danger widget-validation-message" }, message) : null as any;

Alert.displayName = "Alert";
