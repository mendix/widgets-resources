import { SliderContainerProps } from "../../typings/SliderProps";

export function getStepValue(props: SliderContainerProps): number {
    switch (props.stepSizeType) {
        case "static": {
            return Number(props.stepValue);
        }
        case "dynamic": {
            return Number(props.stepAttribute?.value ?? 1);
        }
        case "expression": {
            return Number(props.expressionStepSize?.value ?? 1);
        }
    }
}
