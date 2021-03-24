import { createElement, ReactElement } from "react";
import { ProgressCirclePreviewProps } from "../typings/ProgressCircleProps";
import { ProgressCircle } from "./components/ProgressCircle";
import { parseStyle } from "@mendix/piw-utils-internal";
import { defaultValues, ProgressCircleValues } from "./progressCircleValues";
import { calculatePercentage } from "./util";

export function preview(props: ProgressCirclePreviewProps): ReactElement {
    function getProgressCircleValues(): ProgressCircleValues {
        switch (props.type) {
            case "dynamic":
                return {
                    currentValue: Number(props.dynamicCurrentValue) ?? defaultValues.currentValue,
                    minValue: Number(props.dynamicMinValue) ?? defaultValues.minValue,
                    maxValue: Number(props.dynamicMaxValue) ?? defaultValues.maxValue
                };
            case "expression":
                return {
                    currentValue: Number(props.expressionCurrentValue) ?? defaultValues.currentValue,
                    minValue: Number(props.expressionMinValue) ?? defaultValues.minValue,
                    maxValue: Number(props.expressionMaxValue) ?? defaultValues.maxValue
                };
            case "static":
                return {
                    currentValue: props.staticCurrentValue ?? defaultValues.currentValue,
                    minValue: props.staticMinValue ?? defaultValues.minValue,
                    maxValue: props.staticMaxValue ?? defaultValues.maxValue
                };
        }
    }

    const { currentValue, minValue, maxValue } = getProgressCircleValues();

    return (
        <ProgressCircle
            class={props.class}
            style={parseStyle(props.style)}
            currentValue={currentValue}
            minValue={minValue}
            maxValue={maxValue}
            onClick={undefined}
            label={
                props.showLabel ? (
                    props.labelType === "custom" ? (
                        <props.customLabel.renderer>
                            <div />
                        </props.customLabel.renderer>
                    ) : props.labelType === "percentage" ? (
                        `${calculatePercentage(currentValue, minValue, maxValue)}%`
                    ) : (
                        props.labelText
                    )
                ) : null
            }
        />
    );
}
