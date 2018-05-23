import { SFC, createElement } from "react";

export interface InputProps {
    disabled: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: string;
}

export const Input: SFC<InputProps> = ({ disabled, color, onChange, children }) =>
    createElement("div", { className: "widget-color-picker-input-container" },
        createElement("input", {
            className: "form-control",
            type: "text",
            disabled,
            value: color,
            onChange
        }),
        children
    );

Input.displayName = "Input";
