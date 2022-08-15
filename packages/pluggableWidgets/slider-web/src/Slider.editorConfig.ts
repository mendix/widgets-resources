import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { MaxValueTypeEnum, MinValueTypeEnum, SliderPreviewProps, StepSizeTypeEnum } from "../typings/SliderProps";
import StructurePreviewSvg from "./assets/structure-preview.svg";
import StructurePreviewSvgDark from "./assets/structure-preview-dark.svg";

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

const webOnlyKeys: Array<keyof SliderPreviewProps> = ["advanced"];

export const advancedOptionKeys: Array<keyof SliderPreviewProps> = [
    "decimalPlaces",
    "expressionStepSize",
    "height",
    "heightUnit",
    "noOfMarkers",
    "orientation",
    "showTooltip",
    "stepAttribute",
    "stepSizeType",
    "stepValue",
    "tooltip",
    "tooltipAlwaysVisible",
    "tooltipType"
];

export function getProperties(
    values: SliderPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    hidePropertiesIn(defaultProperties, values, [
        ...keysToHideByMinValueType[values.minValueType],
        ...keysToHideByMaxValueType[values.maxValueType],
        ...keysToHideBySizeType[values.stepSizeType]
    ]);

    if (!values.showTooltip) {
        hidePropertiesIn(defaultProperties, values, ["tooltip", "tooltipType"]);
    } else if (values.tooltipType === "value") {
        hidePropertyIn(defaultProperties, values, "tooltip");
    }

    if (values.orientation === "horizontal") {
        hidePropertiesIn(defaultProperties, values, ["heightUnit", "height"]);
    }

    if (platform === "web") {
        if (!values.advanced) {
            hidePropertiesIn(defaultProperties, values, advancedOptionKeys);
        }
        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertiesIn(defaultProperties, values, webOnlyKeys);
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
    if (
        minValueType !== "static" ||
        maxValueType !== "static" ||
        staticMaximumValue === null ||
        staticMinimumValue === null ||
        staticMinimumValue < staticMaximumValue
    ) {
        return;
    }

    return {
        property: "staticMaximumValue",
        message: "Maximum should be greater then Minimum value"
    };
};

const tooltipCheck: CheckFn = values => {
    if (values.showTooltip && values.tooltipType === "customText" && values.tooltip === "") {
        return {
            property: "tooltip",
            message: "'Tooltip' cannot be empty when 'Custom' type is chosen"
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

    return checkers.map(checker => checker(values)).filter((problem): problem is Problem => !!problem);
}

export function getPreview(_: SliderPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
        ),
        height: 28,
        width: 300
    };
}
