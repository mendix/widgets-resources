import { MinValueTypeEnum } from "../../typings/RangeSliderProps";
import { DynamicValue, EditableValue } from "mendix";
import Big from "big.js";

type GetMinValueParams = {
    minValueType: MinValueTypeEnum;
    staticMinimumValue: Big;
    minAttribute?: EditableValue<Big>;
    expressionMinimumValue?: DynamicValue<Big>;
};

export function getMinValue(params: GetMinValueParams): number {
    switch (params.minValueType) {
        case "static": {
            return Number(params.staticMinimumValue);
        }
        case "dynamic": {
            return Number(params.minAttribute?.value ?? 0);
        }
        case "expression": {
            return Number(params.expressionMinimumValue?.value ?? 0);
        }
    }
}
