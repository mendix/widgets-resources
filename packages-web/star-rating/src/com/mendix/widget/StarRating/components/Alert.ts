import { DOM, StatelessComponent } from "react";

export const Alert: StatelessComponent<{ message: string }> = (props) =>
    DOM.div({ className: "alert alert-danger widget-validation-alert" }, props.message);
