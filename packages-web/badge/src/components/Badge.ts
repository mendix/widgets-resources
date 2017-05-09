import { DOM, SFC } from "react";
import * as classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    badgeType: "badge" | "label";
    className?: string;
    style?: object;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClickAction?: () => void;
    getRef?: (node: HTMLElement) => void;
}

export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export const Badge: SFC<BadgeProps> = (props) => DOM.span({
    className: classNames("widget-badge", props.badgeType, {
        [`label-${props.bootstrapStyle}`]: !!props.bootstrapStyle,
        "widget-badge-clickable": props.clickable
    }),
    onClick: props.onClickAction,
    ref: props.getRef,
    style: props.style
}, props.value);
