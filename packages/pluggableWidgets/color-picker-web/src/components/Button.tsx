import { createElement, ReactElement } from "react";
import classNames from "classnames";
import { ModeEnum } from "../../typings/ColorPickerProps";

export interface ButtonProps {
    color: string | undefined;
    mode: ModeEnum;
    onClick: () => void;
    disabled: boolean;
}

export const Button = (props: ButtonProps): ReactElement => {
    const { mode, disabled, onClick, color } = props;
    return (
        <button
            className={classNames("btn", {
                "widget-color-picker-input": mode === "input",
                hidden: mode === "inline",
                disabled
            })}
            onClick={onClick}
        >
            <div
                className={mode === "input" ? "widget-color-picker-input-inner" : "widget-color-picker-inner"}
                style={{ background: color }}
            />
        </button>
    );
};
