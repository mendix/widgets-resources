import { DOM, SFC } from "react";
import * as classNames from "classnames";

import "../ui/BadgeButton.css";

export interface BadgeButtonProps {
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    onClickAction?: () => void;
    getRef?: (node: HTMLElement) => void;
}

type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

const BadgeButton: SFC<BadgeButtonProps> = (props) =>
    DOM.button(
        {
            className: classNames("widget-badge-button btn", props.className, {
                [`btn-${props.bootstrapStyle}`]: !!props.bootstrapStyle
            }),
            onClick: props.onClickAction,
            ref: props.getRef,
            style: props.style
        },
        DOM.span({ className: "widget-badge-button-text" }, props.label),
        DOM.span({ className: "badge" }, props.value)
    );

export { BadgeButton, BootstrapStyle };
