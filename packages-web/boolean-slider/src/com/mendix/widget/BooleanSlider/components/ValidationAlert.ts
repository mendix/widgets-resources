import { DOM } from "react";

interface AlertProps {
    message: string;
}
export const ValidationAlert = (props: AlertProps) =>
    DOM.div({ className: "alert alert-danger mx-validation-message" }, props.message);
