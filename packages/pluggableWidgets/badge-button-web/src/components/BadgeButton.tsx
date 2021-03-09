import { createElement, ReactElement } from "react";
import classNames from "classnames";

export interface BadgeButtonProps {
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    onClick?: () => void;
}

export const BadgeButton = (props: BadgeButtonProps): ReactElement => (
    <button
        className={classNames(
            "widget-badge-button btn",
            { "btn-primary": !props.className?.match(/btn-{primary|secondary|success|warning|danger}/) },
            props.className
        )}
        onClick={props.onClick}
        style={props.style}
    >
        <span className="widget-badge-button-text">{props.label}</span>
        <span className="badge">{props.value}</span>
    </button>
);
