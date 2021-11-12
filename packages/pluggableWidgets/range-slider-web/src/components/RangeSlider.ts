import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";

import { Handle, Marks, Range } from "rc-slider";
import Tooltip from "rc-tooltip";
import { Alert } from "./Alert";

import "rc-slider/assets/index.css";
import "../ui/RangeSlider.scss";

interface TooltipProps {
    value: number;
    className: string;
    vertical: boolean;
    offset: number;
    index: number;
}

interface RangeSliderProps {
    bootstrapStyle?: BootstrapStyle;
    className?: string;
    noOfMarkers?: number;
    maxValue?: number;
    minValue?: number;
    alertMessage?: string;
    onChange?: (value: number | number[]) => void;
    onUpdate?: (value: number | number[]) => void;
    stepValue?: number;
    style?: object;
    tooltipText?: string | null;
    disabled: boolean;
    lowerBound?: number;
    upperBound?: number;
    decimalPlaces?: number;
}

type BootstrapStyle = "primary" | "inverse" | "success" | "info" | "warning" | "danger";

class RangeSlider extends Component<RangeSliderProps, {}> {
    static defaultProps: RangeSliderProps = {
        disabled: false
    };

    render(): ReactNode {
        const { alertMessage, maxValue, minValue, lowerBound, upperBound, stepValue, tooltipText } = this.props;
        const rangeSliderValues = this.getValidBounds();

        return createElement(
            "div",
            {
                className: classNames(
                    "widget-range-slider",
                    `widget-range-slider-${this.props.bootstrapStyle}`,
                    this.props.className,
                    { "has-error": !!alertMessage },
                    { "widget-range-slider-no-value": typeof lowerBound !== "number" || typeof upperBound !== "number" }
                ),
                style: this.props.style
            },
            createElement(Range, {
                defaultValue: rangeSliderValues,
                disabled: this.props.disabled,
                handle: tooltipText ? this.createTooltip(tooltipText) : undefined,
                included: true,
                marks: RangeSlider.calculateMarks(this.props),
                max: maxValue,
                min: minValue,
                onAfterChange: this.props.onChange,
                onChange: this.props.onUpdate,
                pushable: false,
                step: stepValue || 1,
                value: rangeSliderValues
            }),
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-range-slider-alert",
                message: alertMessage
            })
        );
    }

    private getValidBounds(): number[] {
        const { maxValue, minValue, stepValue, lowerBound, upperBound } = this.props;
        let validLowerBound = 0;
        let validUpperBound = 0;
        if (typeof minValue === "number" && typeof maxValue === "number" && typeof stepValue === "number") {
            validLowerBound =
                typeof lowerBound === "number"
                    ? lowerBound
                    : RangeSlider.isValidMinMax(this.props)
                    ? minValue + stepValue
                    : 1;
            validUpperBound =
                typeof upperBound === "number"
                    ? upperBound
                    : RangeSlider.isValidMinMax(this.props)
                    ? maxValue - stepValue
                    : 100 - stepValue;
        }

        return [validLowerBound, validUpperBound];
    }

    private createTooltip(text: string): (props: TooltipProps) => ReactNode {
        return props => {
            const sliderText =
                this.props.lowerBound === undefined || this.props.upperBound === undefined
                    ? "--"
                    : text.replace(/\{1}/, props.value.toString());

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
                    key: props.index,
                    offset: props.offset,
                    vertical: props.vertical
                })
            );
        };
    }

    private static calculateMarks(props: RangeSliderProps): Marks {
        const marks: Marks = {};
        const { noOfMarkers, maxValue, minValue } = props;
        if (typeof noOfMarkers === "number" && typeof maxValue === "number" && typeof minValue === "number") {
            if (RangeSlider.isValidMinMax(props) && noOfMarkers >= 2) {
                const interval = (maxValue - minValue) / (noOfMarkers - 1);
                for (let i = 0; i < noOfMarkers; i++) {
                    const value = parseFloat((minValue + i * interval).toFixed(props.decimalPlaces));
                    marks[value] = value.toString();
                }
            }
        }

        return marks;
    }

    private static isValidMinMax(props: RangeSliderProps): boolean {
        const { maxValue, minValue } = props;

        return typeof maxValue === "number" && typeof minValue === "number" && minValue < maxValue;
    }
}

export { BootstrapStyle, RangeSlider, RangeSliderProps };
