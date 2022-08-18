import { Children, createElement, ReactNode } from "react";
import classNames from "classnames";

export interface AlertProps {
    children?: ReactNode;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert = ({ className, bootstrapStyle, children }: AlertProps): JSX.Element | null =>
    Children.count(children) > 0 ? (
        <div className={classNames(`alert alert-${bootstrapStyle}`, className)}>{children}</div>
    ) : null;

Alert.displayName = "Alert";
