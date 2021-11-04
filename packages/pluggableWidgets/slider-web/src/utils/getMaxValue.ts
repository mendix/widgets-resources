import { SliderContainerProps } from "../../typings/SliderProps";

export function getMaxValue(props: SliderContainerProps): number {
    switch (props.maxValueType) {
        case "static": {
            return Number(props.staticMaximumValue);
        }
        case "dynamic": {
            return Number(props.maxAttribute?.value ?? 100);
        }
        case "expression": {
            return Number(props.expressionMaximumValue?.value ?? 100);
        }
    }
}
