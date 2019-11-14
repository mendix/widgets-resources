import { createElement, ReactElement } from "react";
import classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    type: "badge" | "label";
    className?: string;
    style?: object;
    value: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClick?: () => void;
}

export type BootstrapStyle = "default" | "info" | "inverse" | "primary" | "danger" | "success" | "warning";

export const Badge = (props: BadgeProps): ReactElement => {
    const { type, className, style, value, bootstrapStyle, clickable, onClick } = props;

    return (
        <span
            className={classNames("widget-badge", type, className, {
                [`label-${bootstrapStyle}`]: !!bootstrapStyle,
                "widget-badge-clickable": clickable
            })}
            onClick={onClick}
            style={style}
        >
            {value}
        </span>
    );
};
