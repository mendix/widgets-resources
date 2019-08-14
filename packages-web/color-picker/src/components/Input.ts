import { SFC, createElement } from "react";

export interface InputProps {
    disabled: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: string;
    onKeyUp?: (event: KeyboardEvent) => void;
}

export const Input: SFC<InputProps> = props =>
    createElement(
        "div",
        { className: "widget-color-picker-input-container" },
        createElement("input", {
            className: "form-control",
            type: "text",
            disabled: props.disabled,
            value: props.color,
            onChange: props.onChange,
            onKeyUp: props.onKeyUp
        }),
        props.children
    );

Input.displayName = "Input";
