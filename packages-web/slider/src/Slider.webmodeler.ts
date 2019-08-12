import { Component, createElement, ReactNode } from "react";
import { Slider, SliderProps } from "./components/Slider";
import SliderContainer, { SliderContainerProps } from "./components/SliderContainer";

declare function require(name: string): string;

export class preview extends Component<SliderContainerProps, {}> {
    render(): ReactNode {
        return createElement(Slider, this.transformProps(this.props));
    }

    private transformProps(props: SliderContainerProps): SliderProps {
        return {
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            decimalPlaces: props.decimalPlaces,
            disabled: false,
            maxValue: props.staticMaximumValue,
            minValue: props.staticMinimumValue,
            noOfMarkers: props.noOfMarkers,
            stepValue: props.stepValue <= 0 ? 10 : props.stepValue,
            style: SliderContainer.parseStyle(props.style),
            tooltipText: props.tooltipText,
            value: 50
        };
    }
}

export function getPreviewCss(): string {
    return require("./ui/Slider.scss") + require("rc-slider/assets/index.css");
}
