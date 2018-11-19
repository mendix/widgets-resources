import * as classNames from "classnames";
import * as React from "react";

export interface AlertProps {
    message: string;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: React.SFC<AlertProps> = ({ className, bootstrapStyle, message }) =>
    message
        ? (<div className={classNames(`alert alert-${bootstrapStyle}`, className)}>{message}</div>)
        : null;

Alert.displayName = "Alert";
