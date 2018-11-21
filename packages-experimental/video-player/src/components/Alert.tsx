import * as classNames from "classnames";
import * as React from "react";

export interface AlertProps {
    message: string;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: React.FunctionComponent<AlertProps> = (props) =>
    props.message
        ? (<div className={classNames(`alert alert-${props.bootstrapStyle}`, props.className)}>{props.message}</div>)
        : null;

Alert.displayName = "Alert";
