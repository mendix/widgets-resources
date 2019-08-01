import classNames from "classnames";
import { FunctionComponent, createElement } from "react";

export interface AlertProps {
    message?: string;
    className?: string;
    bootstrapStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: FunctionComponent<AlertProps> = (props: AlertProps): JSX.Element | null =>
    props.message ? (
        <div className={classNames(`alert alert-${props.bootstrapStyle}`, props.className)}>{props.message}</div>
    ) : null;

Alert.displayName = "Alert";
Alert.defaultProps = { bootstrapStyle: "danger" };
