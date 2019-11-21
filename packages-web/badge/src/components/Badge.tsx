import { createElement, ReactElement } from "react";
import classNames from "classnames";

import "../ui/Badge.css";
import { BrandStyleEnum } from "../../typings/BadgeProps";

export interface BadgeProps {
    type: "badge" | "label";
    className?: string;
    style?: object;
    value: string;
    brandStyle?: BrandStyleEnum;
    clickable?: boolean;
    onClick?: () => void;
}

export const Badge = (props: BadgeProps): ReactElement => {
    const { type, className, style, value, brandStyle, clickable, onClick } = props;

    return (
        <span
            className={classNames("widget-badge", type, className, {
                [`label-${brandStyle}`]: !!brandStyle,
                "widget-badge-clickable": clickable
            })}
            onClick={onClick}
            style={style}
        >
            {value}
        </span>
    );
};
