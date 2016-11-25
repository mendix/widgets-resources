import "../ui/Slider.less";
import * as classNames from "classnames";
import { DOM, ReactNode } from "react";

export interface SliderProps {
    children?: ReactNode;
    widgetId: string;
    isChecked: boolean;
    enabled: boolean;
    hasError?: boolean;
    onClick(checked: boolean): void;
}

export const Slider = (props: SliderProps) =>
    DOM.div({ className: classNames("widget-boolean-slider", { "has-error": props.hasError }) },
        DOM.input({
            checked: props.isChecked,
            className: classNames("widget-toggle", { enabled: props.enabled }),
            id: "widget-toggle-" + props.widgetId,
            readOnly: true,
            type: "checkbox"
        }),
        DOM.label({
            className: classNames("widget-toggle-btn", { enabled: props.enabled }),
            htmlFor: "widget-toggle-" + props.widgetId,
            onClick: props.enabled ? () => props.onClick(!props.isChecked) : null
        }),
        props.hasError ? props.children : null
    );
