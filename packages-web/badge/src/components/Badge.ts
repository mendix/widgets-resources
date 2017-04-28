import { DOM, SFC } from "react";
import * as classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    badgeType: "badge" | "label";
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClickAction?: () => void;
}

type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

const Badge: SFC<BadgeProps> = (props) =>
    DOM.div(
        {
            className: classNames("widget-badge", props.className, { "widget-badge-link": props.clickable }),
            onClick: props.onClickAction,
            style: props.style
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({
            className: classNames("widget-badge", props.badgeType, {
                [`label-${props.bootstrapStyle}`]: !!props.bootstrapStyle
            })
        }, props.value)
    );

export { Badge, BootstrapStyle };
