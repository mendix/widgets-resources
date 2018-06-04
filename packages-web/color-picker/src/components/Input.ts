import { SFC, createElement } from "react";
import * as classNames from "classnames";

export interface InputProps {
    disabled: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: string;
    onKeyUp?: (event: KeyboardEvent) => void;
    hasError?: boolean;
}

export const Input: SFC<InputProps> = (props) =>
    createElement("div", { className: "widget-color-picker-input-container" },
        createElement("input", {
            className: classNames("form-control", { "widget-color-picker-error": props.hasError }),
            type: "text",
            disabled: props.disabled,
            value: props.color,
            onChange: props.onChange,
            onKeyUp: props.onKeyUp
        }),
        props.children
    );

Input.displayName = "Input";
