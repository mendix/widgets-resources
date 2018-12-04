import { SFC, createElement } from "react";
import * as classNames from "classnames";

export interface AlertProps {
    className?: string;
    bootstrapStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

// tslint:disable-next-line:variable-name
export const Alert: SFC<AlertProps> = ({ className, bootstrapStyle, children }) =>
    children
        ? createElement("div", { className: classNames(`alert alert-${bootstrapStyle}`, className) }, children)
        : null;

Alert.displayName = "Alert";
Alert.defaultProps = { bootstrapStyle: "danger" };
