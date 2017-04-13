import { DOM, StatelessComponent } from "react";

export const Alert: StatelessComponent<{ message?: string }> = ({ message }) =>
    message ? DOM.div({ className: "alert alert-danger widget-validation-message" }, message) : null as any;

Alert.displayName = "Alert";
