import { createElement, ReactElement } from "react";
import classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    type: "badge" | "label";
    defaultValue?: string;
    className?: string;
    style?: object;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClick?: () => void;
    getRef?: (node: HTMLElement) => void;
}

export type BootstrapStyle = "default" | "info" | "inverse" | "primary" | "danger" | "success" | "warning";

export const Badge = (props: BadgeProps): ReactElement => {
    const { type, defaultValue, className, style, value, bootstrapStyle, clickable, onClick, getRef } = props;

    return (
        <span
            className={classNames("widget-badge", type, className, {
                [`label-${bootstrapStyle}`]: !!bootstrapStyle,
                "widget-badge-clickable": clickable
            })}
            onClick={onClick}
            ref={getRef}
            style={style}
        >
            {value || defaultValue}
        </span>
    );
};
