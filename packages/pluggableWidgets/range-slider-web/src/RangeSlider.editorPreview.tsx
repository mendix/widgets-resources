import { createElement, ReactNode } from "react";
import { RangeSliderPreviewProps } from "../typings/RangeSliderProps";
import { RangeSlider } from "./components/RangeSlider";
import { createMarks } from "./utils/marks";
import { getPreviewValues } from "./utils/getPreviewValues";
import { getStyleProp } from "./utils/getStyleProp";
import { isVertical } from "./utils/isVertical";

export function getPreviewCss(): string {
    return require("./ui/RangeSlider.scss");
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
        height: props.height ?? 100,
        heightUnit: props.heightUnit
    });

    return (
        <RangeSlider
            disabled={props.readOnly}
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
