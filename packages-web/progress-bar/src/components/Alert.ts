import { DOM, StatelessComponent } from "react";

export const Alert: StatelessComponent<{ message?: string }> = (props) =>
    props.message
        ? DOM.div({ className: "alert alert-danger widget-progressbar-alert" }, props.message)
        : null as any;

Alert.displayName = "Alert";
