import { createElement, ReactElement } from "react";
import classNames from "classnames";

import "../ui/BadgeButton.css";

export interface BadgeButtonProps {
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    onClickAction?: () => void;
}

export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export const BadgeButton = (props: BadgeButtonProps): ReactElement => (
    <button
        className={classNames("widget-badge-button btn", props.className, {
            [`btn-${props.bootstrapStyle}`]: !!props.bootstrapStyle
        })}
        onClick={props.onClickAction}
        style={props.style}
    >
        <span className="widget-badge-button-text">{props.label}</span>
        <span className="badge">{props.value}</span>
    </button>
);
