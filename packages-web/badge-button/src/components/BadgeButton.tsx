import { createElement, ReactElement } from "react";
import classNames from "classnames";

import "../ui/BadgeButton.css";
import { BootstrapStyleEnum } from "../../typings/BadgeButtonProps";

export interface BadgeButtonProps {
    className?: string;
    style?: object;
    label?: string;
    value?: string;
    bootstrapStyle?: BootstrapStyleEnum;
    onClick?: () => void;
}

export const BadgeButton = (props: BadgeButtonProps): ReactElement => (
    <button
        className={classNames("widget-badge-button btn", props.className, {
            [`btn-${props.bootstrapStyle}`]: !!props.bootstrapStyle
        })}
        onClick={props.onClick}
        style={props.style}
    >
        <span className="widget-badge-button-text">{props.label}</span>
        <span className="badge">{props.value}</span>
    </button>
);
