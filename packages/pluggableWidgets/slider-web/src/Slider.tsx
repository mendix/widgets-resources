import { createElement, ReactNode } from "react";
import { SliderContainerProps } from "../typings/SliderProps";
import { getMinValue } from "./utils/getMinValue";
import { getMaxValue } from "./utils/getMaxValue";
import { getStepValue } from "./utils/getStepValue";
import { useMarks } from "./utils/useMarks";
import { createHandleGenerator } from "./utils/createHandleGenerator";
import { useOnChangeDebounced } from "./utils/useOnChangeDebounced";
import { Slider as SliderComponent } from "./components/Slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ui/Slider.scss";
import { isVertical } from "./utils/isVertical";

export default function Slider(props: SliderContainerProps): ReactNode {
    const {
        valueAttribute,
        class: className,
        style,
        minValueType,
        minAttribute,
        expressionMinimumValue,
        staticMinimumValue,
        stepSizeType,
        stepValue,
        stepAttribute,
        expressionStepSize,
        maxValueType,
        staticMaximumValue,
        maxAttribute,
        expressionMaximumValue,
        noOfMarkers,
        decimalPlaces,
        tooltip,
        showTooltip,
        onChange: onChangeProp
    } = props;
    const minValue = getMinValue({
        minValueType,
        staticMinimumValue,
        minAttribute,
        expressionMinimumValue
    });
    const maxValue = getMaxValue({
        maxValueType,
        staticMaximumValue,
        maxAttribute,
        expressionMaximumValue
    });
    const step = getStepValue({
        stepSizeType,
        stepValue,
        stepAttribute,
        expressionStepSize
    });
    const marks = useMarks({
        noOfMarkers,
        decimalPlaces,
        minValueType,
        staticMinimumValue,
        minAttribute,
        expressionMinimumValue,
        maxValueType,
        staticMaximumValue,
        maxAttribute,
        expressionMaximumValue
    });
    const handle = createHandleGenerator({ tooltip, showTooltip });
    const { onChange } = useOnChangeDebounced({ valueAttribute, onChange: onChangeProp });

    return (
        <SliderComponent
            className={className}
            style={style}
            vertical={isVertical(props)}
            value={valueAttribute.value?.toNumber()}
            min={minValue}
            max={maxValue}
            step={step}
            onChange={onChange}
            marks={marks}
            handle={handle}
        />
    );
}
