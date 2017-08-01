import { Component, createElement } from "react";
import { Slider, SliderProps } from "./components/Slider";
import SliderContainer, { SliderContainerProps } from "./components/SliderContainer";

declare function require(name: string): string;

// tslint:disable-next-line:class-name
export class preview extends Component<SliderContainerProps, {}> {
    render() {
        return createElement(Slider, this.transformProps(this.props));
    }

    private transformProps(props: SliderContainerProps): SliderProps {
        return {
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            decimalPlaces: props.decimalPlaces,
            disabled: false,
            maxValue: 100,
            minValue: 0,
            noOfMarkers: props.noOfMarkers,
            stepValue: props.stepValue <= 0 ? 10 : props.stepValue,
            style: SliderContainer.parseStyle(props.style),
            tooltipText: props.tooltipText,
            value: 50
        };
    }
}

export function getPreviewCss() {
    return (
        require("./ui/Slider.scss") + require("rc-slider/assets/index.css")
    );
}
