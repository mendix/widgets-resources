import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";
import {
    MaxValueTypeEnum,
    MinValueTypeEnum,
    RangeSliderPreviewProps,
    StepSizeTypeEnum
} from "../typings/RangeSliderProps";

const keysToHideByMinValueType: Record<MinValueTypeEnum, Array<keyof RangeSliderPreviewProps>> = {
    static: ["minAttribute", "expressionMinimumValue"],
    dynamic: ["staticMinimumValue", "expressionMinimumValue"],
    expression: ["staticMinimumValue", "minAttribute"]
};

const keysToHideByMaxValueType: Record<MaxValueTypeEnum, Array<keyof RangeSliderPreviewProps>> = {
    static: ["maxAttribute", "expressionMaximumValue"],
    dynamic: ["staticMaximumValue", "expressionMaximumValue"],
    expression: ["staticMaximumValue", "maxAttribute"]
};

const keysToHideBySizeType: Record<StepSizeTypeEnum, Array<keyof RangeSliderPreviewProps>> = {
    static: ["stepAttribute", "expressionStepSize"],
    dynamic: ["stepValue", "expressionStepSize"],
    expression: ["stepValue", "stepAttribute"]
};

export function getProperties(
    values: RangeSliderPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    hidePropertiesIn(defaultProperties, values, [
        ...keysToHideByMinValueType[values.minValueType],
        ...keysToHideByMaxValueType[values.maxValueType],
        ...keysToHideBySizeType[values.stepSizeType]
    ]);

    if (!values.showTooltip) {
        hidePropertiesIn(defaultProperties, values, [
            "tooltipLower",
            "tooltipTypeLower",
            "tooltipUpper",
            "tooltipTypeUpper"
        ]);
    }
    if (values.tooltipTypeLower === "value") {
        hidePropertyIn(defaultProperties, values, "tooltipLower");
    }
    if (values.tooltipTypeUpper === "value") {
        hidePropertyIn(defaultProperties, values, "tooltipUpper");
    }

    if (values.orientation === "horizontal") {
        hidePropertiesIn(defaultProperties, values, ["heightUnit", "height"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
