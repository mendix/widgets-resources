import { MouseEvent, KeyboardEvent, createElement, FunctionComponent } from "react";
import classNames from "classnames";
import { Alert } from "@mendix/piw-utils-internal";
import { SwitchContainerProps } from "../../typings/SwitchProps";

export interface SwitchProps extends Pick<SwitchContainerProps, "id" | "class" | "style" | "tabIndex" | "deviceStyle"> {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    isChecked: boolean;
    editable: boolean;
    validation: string | undefined;
}

export const Switch: FunctionComponent<SwitchProps> = props => {
    return (
        <div className={classNames("widget-switch", props.class, props.deviceStyle)} style={props.style}>
            <input
                checked={props.isChecked}
                className={classNames("widget-switch-checkbox", { enabled: props.editable })}
                readOnly
                type="checkbox"
            />
            <div
                className={classNames("widget-switch-btn-wrapper", "widget-switch-btn-wrapper-default", {
                    checked: props.isChecked,
                    disabled: !props.editable,
                    "un-checked": !props.isChecked
                })}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                tabIndex={props.tabIndex ?? 0}
                role="checkbox"
                aria-checked={props.isChecked}
                aria-labelledby={props.id}
            >
                <small
                    className={classNames("widget-switch-btn", {
                        left: !props.isChecked,
                        right: props.isChecked
                    })}
                />
            </div>
            <Alert bootstrapStyle={"danger"}>{props.validation}</Alert>
        </div>
    );
};
