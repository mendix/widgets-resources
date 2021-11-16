import { MaxValueTypeEnum } from "../../typings/RangeSliderProps";
import { DynamicValue, EditableValue } from "mendix";
import Big from "big.js";

type GetMaxValueParams = {
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: Big;
    maxAttribute?: EditableValue<Big>;
    expressionMaximumValue?: DynamicValue<Big>;
};

export function getMaxValue(params: GetMaxValueParams): number {
    switch (params.maxValueType) {
        case "static": {
            return Number(params.staticMaximumValue);
        }
        case "dynamic": {
            return Number(params.maxAttribute?.value ?? 100);
        }
        case "expression": {
            return Number(params.expressionMaximumValue?.value ?? 100);
        }
    }
}
