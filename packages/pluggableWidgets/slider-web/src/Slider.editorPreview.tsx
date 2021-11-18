import { createElement, ReactNode } from "react";
import { Slider } from "./components/Slider";
import { SliderPreviewProps as SliderPreviewPropsGenerated } from "../typings/SliderProps";
import { getPreviewValues } from "./utils/getPreviewValues";
import { parseStyle } from "@mendix/piw-utils-internal";
import { createMarks } from "./utils/marks";
import { isVertical } from "./utils/isVertical";
import { getStyleProp } from "./utils/getStyleProp";

interface SliderPreviewProps extends Omit<SliderPreviewPropsGenerated, "class"> {
    className?: string;
    readOnly?: boolean;
}

export function getPreviewCss(): string {
    return (
        require("rc-slider/assets/index.css") + require("rc-tooltip/assets/bootstrap.css") + require("./ui/Slider.scss")
    );
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
        style: parseStyle(props.style),
        height: props.height ?? 100,
        heightUnit: props.heightUnit
    });

    return (
        <Slider
            {...props}
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
