// tslint:disable ordered-imports
import { DOM } from "react";
import * as classNames from "classnames";

import "../ui/Slider.sass";

export interface SliderProps {
    widgetId: string;
    isChecked: boolean;
    enabled: boolean;
    hasError?: boolean;
    onClick(checked: boolean): void;
}

export const Slider = (props: SliderProps & { children?: React.ReactNode }) =>
    DOM.div({ className: classNames("widget-boolean-slider", { "has-error": props.hasError }) },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-boolean-slider-checkbox", { enabled: props.enabled }),
            id: "widget-boolean-slider-" + props.widgetId,
            readOnly: true,
            type: "checkbox"
        }),
        DOM.label({
            className: classNames("widget-boolean-slider-btn", { enabled: props.enabled }),
            htmlFor: "widget-boolean-slider-" + props.widgetId,
            onClick: props.enabled ? () => props.onClick(!props.isChecked) : null
        }),
        props.hasError ? props.children : null
    );
