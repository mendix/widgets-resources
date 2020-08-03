import { SFC, createElement } from "react";
import classNames from "classnames";

import { Mode } from "./ColorPicker";

export interface ButtonProps {
    className?: string;
    disabled: boolean;
    color?: string;
    mode: Mode;
    onClick?: () => void;
    tabIndex?: number;
}

export const Button: SFC<ButtonProps> = props =>
    createElement(
        "button",
        {
            className: classNames("btn", {
                "widget-color-picker-input": props.mode === "input",
                hidden: props.mode === "inline",
                disabled: props.disabled
            }),
            onClick: props.onClick,
            tabIndex: props.tabIndex
        },
        createElement("div", { className: props.className, style: { background: props.color } })
    );

Button.displayName = "Button";
