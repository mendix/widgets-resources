import { DOM, StatelessComponent } from "react";

export const Alert: StatelessComponent<{ message: string }> = (props) =>
    props.message
        ? DOM.div({ className: "alert alert-danger widget-star-rating-alert" }, props.message)
        : null;
