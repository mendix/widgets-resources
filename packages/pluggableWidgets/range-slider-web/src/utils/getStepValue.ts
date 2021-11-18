import { StepSizeTypeEnum } from "../../typings/RangeSliderProps";
import { DynamicValue, EditableValue } from "mendix";
import Big from "big.js";

type GetStepValueParams = {
    stepSizeType: StepSizeTypeEnum;
    stepValue: Big;
    stepAttribute?: EditableValue<Big>;
    expressionStepSize?: DynamicValue<Big>;
};

export function getStepValue(params: GetStepValueParams): number {
    switch (params.stepSizeType) {
        case "static": {
            return Number(params.stepValue);
        }
        case "dynamic": {
            return Number(params.stepAttribute?.value ?? 1);
        }
        case "expression": {
            return Number(params.expressionStepSize?.value ?? 1);
        }
    }
}
