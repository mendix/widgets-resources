import { createElement, FunctionComponent, useCallback } from "react";
import { ProgressCircle as ProgressCircleComponent } from "./components/ProgressCircle";
import { ProgressCircleContainerProps } from "../typings/ProgressCircleProps";
import { defaultValues, ProgressCircleValues } from "./progressCircleValues";
import { calculatePercentage } from "./util";

export const ProgressCircle: FunctionComponent<ProgressCircleContainerProps> = props => {
    function getProgressCircleValues(): ProgressCircleValues {
        switch (props.type) {
            case "dynamic":
                return {
                    currentValue: Number(props.dynamicCurrentValue?.value ?? 0),
                    minValue: Number(props.dynamicMinValue?.value ?? defaultValues.minValue),
                    maxValue: Number(props.dynamicMaxValue?.value ?? defaultValues.maxValue)
                };
            case "expression":
                return {
                    currentValue: Number(props.expressionCurrentValue?.value ?? 0),
                    minValue: Number(props.expressionMinValue?.value ?? defaultValues.minValue),
                    maxValue: Number(props.expressionMaxValue?.value ?? defaultValues.maxValue)
                };
            case "static":
                // Default values here are handled by the `ProgressBar.xml`.
                return {
                    currentValue: props.staticCurrentValue,
                    minValue: props.staticMinValue,
                    maxValue: props.staticMaxValue
                };
        }
    }

    const onClick = useCallback(() => props.onClick?.execute(), [props.onClick]);
    const { currentValue, minValue, maxValue } = getProgressCircleValues();

    return (
        <ProgressCircleComponent
            class={props.class}
            style={props.style}
            currentValue={currentValue}
            minValue={minValue}
            maxValue={maxValue}
            onClick={props.onClick ? onClick : undefined}
            label={
                props.showLabel
                    ? props.labelType === "custom"
                        ? props.customLabel
                        : props.labelType === "percentage"
                        ? `${calculatePercentage(currentValue, minValue, maxValue)}%`
                        : props.labelText?.value
                    : null
            }
        />
    );
};
