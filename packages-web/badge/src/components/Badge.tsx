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

export const Badge = (props: BadgeProps): ReactElement =>
    createElement(
        "span",
        {
            className: classNames("widget-badge", props.type, props.className, {
                [`label-${props.bootstrapStyle}`]: !!props.bootstrapStyle,
                "widget-badge-clickable": props.clickable
            }),
            onClick: props.onClick,
            ref: props.getRef,
            style: props.style
        },
        props.value || props.defaultValue
    );
