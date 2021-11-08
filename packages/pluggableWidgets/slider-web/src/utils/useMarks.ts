import { MaxValueTypeEnum, MinValueTypeEnum } from "../../typings/SliderProps";
import { DynamicValue, EditableValue } from "mendix";
import Big from "big.js";

import { getMinValue } from "./getMinValue";
import { getMaxValue } from "./getMaxValue";
import { useMemo } from "react";
import { createMarks } from "./marks";

type UseMarksParams = {
    noOfMarkers: number;
    decimalPlaces: number;
    maxValueType: MaxValueTypeEnum;
    staticMaximumValue: Big;
    maxAttribute?: EditableValue<Big>;
    expressionMaximumValue?: DynamicValue<Big>;
    minValueType: MinValueTypeEnum;
    staticMinimumValue: Big;
    minAttribute?: EditableValue<Big>;
    expressionMinimumValue?: DynamicValue<Big>;
};

export function useMarks(props: UseMarksParams): ReturnType<typeof createMarks> {
    const {
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
    } = props;
    const min = getMinValue({ minValueType, staticMinimumValue, minAttribute, expressionMinimumValue });
    const max = getMaxValue({ maxValueType, staticMaximumValue, maxAttribute, expressionMaximumValue });

    return useMemo(
        () =>
            createMarks({
                numberOfMarks: noOfMarkers,
                decimalPlaces,
                min,
                max
            }),
        [min, max, noOfMarkers, decimalPlaces]
    );
}
