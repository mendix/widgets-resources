import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

import {
    MaxValueTypeEnum,
    MinValueTypeEnum,
    RangeSliderPreviewProps,
    StepSizeTypeEnum
} from "../typings/RangeSliderProps";
import StructurePreviewSvg from "./assets/structure-preview.svg";
import StructurePreviewSvgDark from "./assets/structure-preview-dark.svg";

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

const keysToHideOnDesktop: Array<keyof RangeSliderPreviewProps> = ["advanced"];

export const advancedOptionKeys: Array<keyof RangeSliderPreviewProps> = [
    "stepSizeType",
    "stepValue",
    "stepAttribute",
    "expressionStepSize",
    "showTooltip",
    "tooltipTypeLower",
    "tooltipLower",
    "tooltipTypeUpper",
    "tooltipUpper",
    "tooltipAlwaysVisible",
    "noOfMarkers",
    "decimalPlaces",
    "orientation",
    "height",
    "heightUnit"
];

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
        if (!values.advanced) {
            hidePropertiesIn(defaultProperties, values, advancedOptionKeys);
        }
        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertiesIn(defaultProperties, values, keysToHideOnDesktop);
    }

    return defaultProperties;
}

export function getPreview(_: RangeSliderPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    return {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
        ),
        height: 28,
        width: 300
    };
}
