import { createElement, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";

interface IconProps {
    icon: WebIcon | null;
    className?: string;
}

export function Icon({ icon, className = "" }: IconProps): ReactElement | null {
    if (!icon) {
        return null;
    }
    if (icon.type === "glyph") {
        return <span className={classNames("glyphicon", icon.iconClass, className)} aria-hidden />;
    }
    if (icon.type === "image") {
        return <img className={className} src={icon.iconUrl} aria-hidden alt="" />;
    }
    return null;
}
