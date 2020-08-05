import { Component, ReactNode, createElement } from "react";

import classNames from "classnames";
import RcSlider, { Handle, Marks } from "rc-slider";
import Tooltip from "rc-tooltip";

import { Alert } from "./Alert";

import "rc-slider/assets/index.css";
import "../ui/Slider.scss";

interface TooltipOptions {
    text: string;
    value: number | null;
}

interface TooltipProps {
    value: number;
    className: string;
    vertical: boolean;
    offset: number;
}

interface SliderProps {
    alertMessage?: string;
    bootstrapStyle?: BootstrapStyle;
    className?: string;
    decimalPlaces?: number;
    disabled: boolean;
    maxValue?: number;
    minValue?: number;
    noOfMarkers?: number;
    onChange?: (value: number) => void;
    onUpdate?: (value: number) => void;
    stepValue?: number;
    style?: object;
    tooltipText?: string | null;
    value: number | null;
}

type BootstrapStyle = "primary" | "inverse" | "success" | "info" | "warning" | "danger";

class Slider extends Component<SliderProps, {}> {
    static defaultProps: SliderProps = {
        bootstrapStyle: "info",
        disabled: false,
        value: 0
    };

    render(): ReactNode {
        const { alertMessage, tooltipText } = this.props;
        return createElement(
            "div",
            {
                className: classNames(
                    "widget-slider",
                    `widget-slider-${this.props.bootstrapStyle}`,
                    this.props.className,
                    { "has-error": !!alertMessage },
                    { "widget-slider-no-value": typeof this.props.value !== "number" }
                ),
                style: this.props.style
            },
            createElement(RcSlider, {
                disabled: this.props.disabled,
                handle: tooltipText ? this.createTooltip({ text: tooltipText, value: this.props.value }) : undefined,
                included: true,
                marks: this.calculateMarks(),
                max: this.props.maxValue,
                min: this.props.minValue,
                onAfterChange: this.props.onChange,
                onChange: this.props.onUpdate,
                step: this.props.stepValue || 1,
                value: this.getValidValue()
            }),
            createElement(Alert, { message: alertMessage })
        );
    }

    private calculateMarks(): Marks {
        const marks: Marks = {};
        const { noOfMarkers, maxValue, minValue } = this.props;
        if ((noOfMarkers || noOfMarkers === 0) && (maxValue || maxValue === 0) && (minValue || minValue === 0)) {
            if (this.isValidMinMax() && noOfMarkers >= 2) {
                const interval = (maxValue - minValue) / (noOfMarkers - 1);
                for (let i = 0; i < noOfMarkers; i++) {
                    const value = parseFloat((minValue + i * interval).toFixed(this.props.decimalPlaces));
                    marks[value] = value.toString();
                }
            }
        }

        return marks;
    }

    private isValidMinMax(): boolean {
        const { maxValue, minValue } = this.props;

        return typeof maxValue === "number" && typeof minValue === "number" && minValue < maxValue;
    }

    private getValidValue(): number {
        const { minValue, maxValue, value } = this.props;
        if ((minValue || minValue === 0) && (maxValue || maxValue === 0)) {
            if (value || value === 0) {
                if (value > maxValue) {
                    return maxValue;
                }
                if (value < minValue) {
                    return minValue;
                }
                return value;
            }
            if (this.isValidMinMax()) {
                return minValue + (maxValue - minValue) / 2;
            }
        }

        return 0;
    }

    private createTooltip(tooltipProps: TooltipOptions): (props: TooltipProps) => ReactNode {
        return props => {
            const sliderText =
                tooltipProps.value === null ? "--" : tooltipProps.text.replace(/\{1}/, tooltipProps.value.toString());

            return createElement(
                Tooltip,
                {
                    mouseLeaveDelay: 0,
                    overlay: createElement("div", {}, sliderText),
                    placement: "top",
                    prefixCls: "rc-slider-tooltip",
                    trigger: ["hover", "click", "focus"]
                },
                createElement(Handle, {
                    className: props.className,
                    offset: props.offset,
                    vertical: props.vertical
                })
            );
        };
    }
}

export { BootstrapStyle, Slider, SliderProps };
