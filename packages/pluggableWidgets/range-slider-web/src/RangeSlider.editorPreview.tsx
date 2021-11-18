import { createElement, ReactNode } from "react";
import { RangeSliderPreviewProps as RangeSliderPreviewPropsGenerated } from "../typings/RangeSliderProps";
import { Range } from "./components/Range";
import { createMarks } from "./utils/marks";
import { getPreviewValues } from "./utils/getPreviewValues";
import { getStyleProp } from "./utils/getStyleProp";
import { isVertical } from "./utils/isVertical";
import { parseStyle } from "@mendix/piw-utils-internal";

interface RangeSliderPreviewProps extends Omit<RangeSliderPreviewPropsGenerated, "class"> {
    className?: string;
}

export function getPreviewCss(): string {
    return (
        require("rc-slider/assets/index.css") +
        require("rc-tooltip/assets/bootstrap.css") +
        require("./ui/RangeSlider.scss")
    );
}

export function preview(props: RangeSliderPreviewProps): ReactNode {
    const { min, max, step, value } = getPreviewValues(props);
    const marks = createMarks({
        min,
        max,
        numberOfMarks: props.noOfMarkers ?? 1,
        decimalPlaces: props.decimalPlaces ?? 0
    });

    const style = getStyleProp({
        orientation: props.orientation,
        style: parseStyle(props.style),
        height: props.height ?? 100,
        heightUnit: props.heightUnit
    });

    return (
        <Range
            value={value}
            marks={marks}
            min={min}
            max={max}
            step={step}
            rootStyle={style}
            vertical={isVertical(props)}
        />
    );
}
