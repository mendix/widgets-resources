import { SFC, createElement } from "react";
import classNames from "classnames";

export interface AlertProps {
    message?: string;
    className?: string;
    bootstrapStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: SFC<AlertProps> = ({ className, bootstrapStyle, message }) =>
    message
        ? createElement("div", { className: classNames(`alert alert-${bootstrapStyle}`, className) }, message)
        : null;

Alert.defaultProps = { bootstrapStyle: "danger" };
Alert.displayName = "Alert";
