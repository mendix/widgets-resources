import React, { createElement, ReactElement, KeyboardEvent } from "react";

export interface InputProps {
    color: string | undefined;
    disabled: boolean;
    children: ReactElement | null;
    onKeyUp?: (hide?: boolean) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps): ReactElement => {
    const { color, disabled, onKeyUp, onChange } = props;
    const onKeyChange = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "ArrowDown" && onKeyUp) {
            onKeyUp();
        }
    };
    return (
        <div className="widget-color-picker-input-container">
            <input
                type="text"
                className="form-control"
                value={color}
                disabled={disabled}
                onKeyUp={onKeyUp ? onKeyChange : undefined}
                onChange={onChange}
            />
            {props.children}
        </div>
    );
};
