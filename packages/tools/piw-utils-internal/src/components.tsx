import { Children, createElement, ReactNode, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";

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

export interface IconProps {
    icon: WebIcon | null;
    className?: string;
    fallback?: ReactElement;
}

export const Icon = ({ icon, className = "", fallback }: IconProps): ReactElement | null => {
    if (icon?.type === "glyph") {
        return <span className={classNames("glyphicon", className, icon.iconClass)} aria-hidden />;
    }
    if (icon?.type === "image") {
        return <img className={className} src={icon.iconUrl} aria-hidden alt="" />;
    }
    return fallback || null;
};

Icon.displayName = "Icon";
