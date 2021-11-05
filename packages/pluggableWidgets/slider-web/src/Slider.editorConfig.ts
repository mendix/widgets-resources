import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/piw-utils-internal";
import { MaxValueTypeEnum, MinValueTypeEnum, SliderPreviewProps, StepSizeTypeEnum } from "../typings/SliderProps";

const keysToHideByMinValueType: Record<MinValueTypeEnum, Array<keyof SliderPreviewProps>> = {
    static: ["minAttribute", "expressionMinimumValue"],
    dynamic: ["staticMinimumValue", "expressionMinimumValue"],
    expression: ["staticMinimumValue", "minAttribute"]
};

const keysToHideByMaxValueType: Record<MaxValueTypeEnum, Array<keyof SliderPreviewProps>> = {
    static: ["maxAttribute", "expressionMaximumValue"],
    dynamic: ["staticMaximumValue", "expressionMaximumValue"],
    expression: ["staticMaximumValue", "maxAttribute"]
};

const keysToHideBySizeType: Record<StepSizeTypeEnum, Array<keyof SliderPreviewProps>> = {
    static: ["stepAttribute", "expressionStepSize"],
    dynamic: ["stepValue", "expressionStepSize"],
    expression: ["stepValue", "stepAttribute"]
};

export function getProperties(values: SliderPreviewProps, defaultProperties: Properties): Properties {
    hidePropertiesIn(defaultProperties, values, keysToHideByMinValueType[values.minValueType]);

    hidePropertiesIn(defaultProperties, values, keysToHideByMaxValueType[values.maxValueType]);

    hidePropertiesIn(defaultProperties, values, keysToHideBySizeType[values.stepSizeType]);

    if (!values.showTooltip) {
        hidePropertyIn(defaultProperties, values, "tooltip");
    }

    return defaultProperties;
}

type CheckFn = (props: SliderPreviewProps) => Problem | undefined;

const minValueCheck: CheckFn = ({ minValueType, expressionMinimumValue, minAttribute }) => {
    if (minValueType === "expression" && expressionMinimumValue === "") {
        return {
            property: "expressionMinimumValue",
            message: "Minimum value expression is empty"
        };
    }

    if (minValueType === "dynamic" && minAttribute === "") {
        return {
            property: "minAttribute",
            message: "Missing attribute for 'Minimum value' property"
        };
    }
};

const maxValueCheck: CheckFn = ({ maxValueType, expressionMaximumValue, maxAttribute }) => {
    if (maxValueType === "expression" && expressionMaximumValue === "") {
        return {
            property: "expressionMaximumValue",
            message: "Maximum value expression is empty"
        };
    }

    if (maxValueType === "dynamic" && maxAttribute === "") {
        return {
            property: "maxAttribute",
            message: "Missing attribute for 'Maximum value' property"
        };
    }
};

const minMaxValueCheck: CheckFn = ({ minValueType, maxValueType, staticMinimumValue, staticMaximumValue }) => {
    const isPossibleToCheck = minValueType === "static" && maxValueType === "static";

    if (!isPossibleToCheck) {
        return;
    }

    if (staticMaximumValue === null || staticMinimumValue === null) {
        return;
    }

    if (staticMinimumValue < staticMaximumValue) {
        return;
    }

    return {
        property: "staticMaximumValue",
        message: "Maximum should be greater then Minimum value"
    };
};

const tooltipCheck: CheckFn = values => {
    if (values.showTooltip && values.tooltip === "") {
        return {
            property: "tooltip",
            message: "Tooltip cannot be empty when 'Show tooltip' is enabled"
        };
    }
};

const stepSizeCheck: CheckFn = ({ stepSizeType, stepAttribute, stepValue, expressionStepSize }) => {
    if (stepSizeType === "static" && stepValue !== null && stepValue <= 0) {
        return {
            property: "stepValue",
            message: "Step size should be greater then zero"
        };
    }

    if (stepSizeType === "expression" && expressionStepSize === "") {
        return {
            property: "expressionStepSize",
            message: "Step size expression is empty"
        };
    }

    if (stepSizeType === "dynamic" && stepAttribute === "") {
        return {
            property: "stepAttribute",
            message: "Missing attribute for 'Step size' property"
        };
    }
};

const decimalPlacesCheck: CheckFn = ({ decimalPlaces }) => {
    if (decimalPlaces !== null && decimalPlaces < 0) {
        return {
            property: "decimalPlaces",
            message: "Decimal places cannot be negative"
        };
    }
};

export function check(values: SliderPreviewProps): Problem[] {
    const checkers = [tooltipCheck, minMaxValueCheck, minValueCheck, maxValueCheck, stepSizeCheck, decimalPlacesCheck];

    return checkers.map(fn => fn(values)).filter((p): p is Problem => !!p);
}
