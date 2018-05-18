import { SFC, createElement } from "react";
import * as classNames from "classnames";

import { Mode } from "./ColorPicker";

export interface ButtonProps {
    className?: string;
    disabled: boolean;
    color?: string;
    mode: Mode;
    onClick?: () => void;
}

export const Button: SFC<ButtonProps> = (props) =>
    createElement("button", {
        className: classNames(
            "btn",
            {
                "widget-color-picker-input": props.mode === "input",
                "widget-color-picker-inline": props.mode === "inline",
                "widget-color-picker-disabled": props.disabled
            }
        ),
        onClick: props.onClick
    }, createElement("div", { className: props.className, style: { background: props.color } }));

Button.displayName = "Button";
