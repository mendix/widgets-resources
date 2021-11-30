import { createElement, ReactNode } from "react";
import { Slider } from "./components/Slider";
import { SliderPreviewProps } from "../typings/SliderProps";
import { getPreviewValues } from "./utils/getPreviewValues";
import { createMarks } from "./utils/marks";
import { isVertical } from "./utils/isVertical";
import { getStyleProp } from "./utils/getStyleProp";

export function getPreviewCss(): string {
    return require("./ui/Slider.scss");
}

export function preview(props: SliderPreviewProps): ReactNode {
    const values = getPreviewValues(props);
    const marks = createMarks({
        min: values.min,
        max: values.max,
        numberOfMarks: props.noOfMarkers ?? 2,
        decimalPlaces: props.decimalPlaces ?? 2
    });
    const style = getStyleProp({
        orientation: props.orientation,
        height: props.height ?? 100,
        heightUnit: props.heightUnit
    });

    return (
        <Slider
            {...values}
            onChange={undefined}
            style={undefined}
            marks={marks}
            rootStyle={style}
            vertical={isVertical(props)}
            disabled={props.readOnly}
        />
    );
}
