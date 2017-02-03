import { DOM, StatelessComponent, createElement } from "react";
import * as classNames from "classnames";

import { Alert } from "./Alert";

import "../ui/Slider.sass";

export interface SliderProps {
    status: SliderStatus;
    isChecked: boolean;
    alertMessage?: string;
    onClick: () => void;
}

export type SliderStatus = "enabled" | "disabled" | "no-context";

export const Slider: StatelessComponent<SliderProps> = (props) =>
    DOM.div({ className: classNames("widget-boolean-slider", { "has-error": !!props.alertMessage }) },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-boolean-slider-checkbox", { enabled: props.status === "enabled" }),
            readOnly: true,
            type: "checkbox"
        }),
        DOM.div({
            className: classNames("widget-boolean-slider-btn", {
                "enabled": props.status === "enabled",
                "no-slider": props.status === "no-context"
            }),
            onClick: props.status === "enabled" ? props.onClick : undefined
        }),
        createElement(Alert, { message: props.alertMessage })
    );
