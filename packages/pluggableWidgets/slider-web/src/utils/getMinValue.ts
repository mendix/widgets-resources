import { SliderContainerProps } from "../../typings/SliderProps";

export function getMinValue(props: SliderContainerProps): number {
    switch (props.minValueType) {
        case "static": {
            return Number(props.staticMinimumValue);
        }
        case "dynamic": {
            return Number(props.minAttribute?.value ?? 0);
        }
        case "expression": {
            return Number(props.expressionMinimumValue?.value ?? 0);
        }
    }
}
