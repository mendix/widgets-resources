import { DOM } from "react";
import * as classNames from "classnames";

import "../ui/Slider.sass";

export interface SliderProps {
    isChecked: boolean;
    enabled: boolean;
    hasError: boolean;
    showSlider: boolean;
    onClick?: (checked: boolean) => void;
}

export const Slider = (props: SliderProps & { children?: React.ReactNode }) =>
    DOM.div({ className: classNames("widget-boolean-slider", { "has-error": props.hasError }) },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-boolean-slider-checkbox", { enabled: props.enabled }),
            readOnly: true,
            type: "checkbox"
        }),
        DOM.div({
            className: classNames("widget-boolean-slider-btn", {
                enabled: props.enabled,
                "no-slider": !props.showSlider
            }),
            onClick: props.enabled ? () => props.onClick(!props.isChecked) : null
        }),
        props.hasError ? props.children : null
    );
