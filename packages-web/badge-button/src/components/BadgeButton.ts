import { SFC, createElement } from "react";
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
    defaultValue?: string;
}

export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export const BadgeButton: SFC<BadgeButtonProps> = (props) => createElement("button", {
    className: classNames("widget-badge-button btn", props.className, {
        [`btn-${props.bootstrapStyle}`]: !!props.bootstrapStyle
    }),
    onClick: props.onClickAction,
    ref: props.getRef,
    style: props.style
},
    createElement("span", { className: "widget-badge-button-text" }, props.label),
    createElement("span", { className: "badge" }, props.value || props.defaultValue)
);
