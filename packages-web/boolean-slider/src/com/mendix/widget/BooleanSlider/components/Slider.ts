import { DOM } from "react";
import * as classNames from "classnames";

import "../ui/Slider.sass";

export interface SliderProps {
    status: SliderStatus;
    isChecked: boolean;
    hasError?: boolean;
    onClick?: (checked: boolean) => void;
}

export type SliderStatus = "enabled" | "disabled" | "no-context";

export const Slider = (props: SliderProps & { children?: React.ReactNode }) =>
    DOM.div({ className: classNames("widget-boolean-slider", { "has-error": props.hasError }) },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-boolean-slider-checkbox", { enabled: props.status === "enabled" }),
            readOnly: true,
            type: "checkbox"
        }),
        DOM.div({
            className: classNames("widget-boolean-slider-btn", {
                enabled: props.status === "enabled",
                "no-slider": props.status === "no-context"
            }),
            onClick: props.status === "enabled" ? () => props.onClick(!props.isChecked) : null
        }),
        props.hasError ? props.children : null
    );
