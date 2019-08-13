import { Component, createElement, ReactNode } from "react";
import { RangeSlider, RangeSliderProps } from "./components/RangeSlider";
import RangeSliderContainer, { RangeSliderContainerProps } from "./components/RangeSliderContainer";

declare function require(name: string): string;

export class preview extends Component<RangeSliderContainerProps, {}> {
    render(): ReactNode {
        return createElement(RangeSlider, this.transformProps(this.props));
    }

    private transformProps(props: RangeSliderContainerProps): RangeSliderProps {
        return {
            alertMessage: this.validateMinMax(props),
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            decimalPlaces: props.decimalPlaces,
            disabled: false,
            lowerBound: 20,
            maxValue: props.staticMaximumValue,
            minValue: props.staticMinimumValue,
            noOfMarkers: props.noOfMarkers,
            stepValue: props.stepValue <= 0 ? 10 : props.stepValue,
            style: RangeSliderContainer.parseStyle(props.style),
            tooltipText: props.tooltipText,
            upperBound: 50
        };
    }

    private validateMinMax(props: RangeSliderContainerProps): string {
        const { staticMinimumValue, staticMaximumValue } = props;

        if (staticMinimumValue > staticMaximumValue) {
            return `Minimum ${staticMinimumValue} should be less or equal to the maximum ${staticMaximumValue}`;
        }

        return "";
    }
}

export function getPreviewCss(): string {
    return require("./ui/RangeSlider.scss") + require("rc-slider/assets/index.css");
}
