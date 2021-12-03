import { MouseEvent, KeyboardEvent, createElement } from "react";
import classNames from "classnames";
import { Alert } from "@mendix/piw-utils-internal/components/web";
import { SwitchContainerProps } from "../../typings/SwitchProps";

export interface SwitchProps extends Pick<SwitchContainerProps, "id" | "tabIndex"> {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    isChecked: boolean;
    editable: boolean;
    validation: string | undefined;
}

export default function Switch(props: SwitchProps) {
    return (
        <div className="widget-switch">
            <div
                id={props.id}
                className={classNames("widget-switch-btn-wrapper", "widget-switch-btn-wrapper-default", {
                    checked: props.isChecked,
                    disabled: !props.editable,
                    "un-checked": !props.isChecked
                })}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                tabIndex={props.tabIndex ?? 0}
                role="switch"
                aria-checked={props.isChecked}
                aria-labelledby={`${props.id}-label`}
                aria-readonly={!props.editable}
            >
                <div
                    className={classNames("widget-switch-btn", {
                        left: !props.isChecked,
                        right: props.isChecked
                    })}
                />
            </div>
            <Alert bootstrapStyle={"danger"}>{props.validation}</Alert>
        </div>
    );
}
