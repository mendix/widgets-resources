import { DOM, SFC, createElement } from "react";
import * as classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClickAction?: () => void;
}

type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

const Badge: SFC<BadgeProps> = ({ bootstrapStyle, className, clickable, label, onClickAction, value, style }) =>
    createElement("div",
        {
            className: classNames("widget-badge", className, { "widget-badge-link": clickable }),
            onClick: onClickAction,
            style
        },
        DOM.span({ className: "widget-badge-text" }, label),
        DOM.span({
            className: classNames("widget-badge", "badge", {
                [`label-${bootstrapStyle}`]: !!bootstrapStyle
            })
        }, value)
    );

export { Badge, BootstrapStyle };
