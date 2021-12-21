import { ReactNode, createElement, useMemo } from "react";
import { RangeSliderContainerProps } from "../typings/RangeSliderProps";
import { RangeSlider as RangeSliderComponent } from "./components/RangeSlider";
import { createHandleGenerator } from "./utils/createHandleGenerator";
import { useMarks } from "./utils/useMarks";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ui/RangeSlider.scss";
import { getMinValue } from "./utils/getMinValue";
import { getMaxValue } from "./utils/getMaxValue";
import { getStepValue } from "./utils/getStepValue";
import { getStyleProp } from "./utils/getStyleProp";
import { useOnChangeDebounced } from "./utils/useOnChangeDebounced";
import { isVertical } from "./utils/isVertical";
import { useScheduleUpdateOnce } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";

export function RangeSlider(props: RangeSliderContainerProps): ReactNode {
    const {
        lowerBoundAttribute,
        upperBoundAttribute,
        onChange: onChangeProp,
        orientation,
        heightUnit,
        height,
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
        tooltipLower,
        tooltipUpper,
        showTooltip,
        tooltipTypeLower,
        tooltipTypeUpper,
        tooltipAlwaysVisible
    } = props;
    const lowerValue = lowerBoundAttribute?.value?.toNumber() ?? 0;
    const upperValue = upperBoundAttribute?.value?.toNumber() ?? 0;
    const value = useMemo(() => [lowerValue, upperValue], [lowerValue, upperValue]);
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
    const { onChange } = useOnChangeDebounced({ lowerBoundAttribute, upperBoundAttribute, onChange: onChangeProp });
    const style = getStyleProp({ orientation, height, heightUnit });
    useScheduleUpdateOnce(() => lowerBoundAttribute.status === ValueStatus.Available);

    return (
        <RangeSliderComponent
            allowCross={false}
            disabled={lowerBoundAttribute.readOnly || upperBoundAttribute.readOnly}
            rootStyle={style}
            vertical={isVertical(props)}
            step={step}
            onChange={onChange}
            value={value}
            marks={marks}
            min={minValue}
            max={maxValue}
            handle={createHandleGenerator({
                tooltipLower,
                tooltipUpper,
                showTooltip,
                tooltipTypeLower,
                tooltipTypeUpper,
                tooltipAlwaysVisible
            })}
        />
    );
}
