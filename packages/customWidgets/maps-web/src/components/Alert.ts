import { createElement, FunctionComponent } from "react";
import classNames from "classnames";

export interface AlertProps {
    className?: string;
    bootstrapStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: FunctionComponent<AlertProps> = ({ className, bootstrapStyle, children }) =>
    children
        ? createElement("div", { className: classNames(`alert alert-${bootstrapStyle}`, className) }, children)
        : null;

Alert.displayName = "Alert";
Alert.defaultProps = { bootstrapStyle: "danger" };
