import { DOM } from "react";

export const Alert = (props: { message: string }) =>
    props.message
        ? DOM.div({ className: "alert alert-danger widget-boolean-slider-alert" }, props.message)
        : null;
