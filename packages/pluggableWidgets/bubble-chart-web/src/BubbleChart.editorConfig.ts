import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { BubbleChartPreviewProps } from "../typings/BubbleChartProps";

export function getProperties(
    values: BubbleChartPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.lines.forEach((line, index) => {
        // Series properties
        if (line.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "dynamicDataSource",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicSizeAttribute",
                "dynamicName",
                "dynamicTooltipHoverText",
                "groupByAttribute"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "staticDataSource",
                "staticXAttribute",
                "staticYAttribute",
                "staticSizeAttribute",
                "staticName",
                "staticTooltipHoverText"
            ]);
        }
        if (!values.enableAdvancedOptions && platform === "web") {
            hidePropertyIn(defaultProperties, values, "lines", index, "customSeriesOptions");
        }
        if (line.autosize) {
            hidePropertyIn(defaultProperties, values, "lines", index, "sizeref");
        }
    });

    if (platform === "web") {
        hidePropertiesIn(defaultProperties, values, [
            "customLayout",
            "customConfigurations",
            "enableThemeConfig",
            "enableDeveloperMode"
        ]);

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "enableAdvancedOptions");
    }
    return defaultProperties;
}

export function getPreview(_values: BubbleChartPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(values: BubbleChartPreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.lines.forEach((line, index) => {
        if (line.dataSet === "static" && line.staticDataSource) {
            if (!line.staticXAttribute) {
                errors.push({
                    property: `lines/${index + 1}/staticXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }
            if (!line.staticYAttribute) {
                errors.push({
                    property: `lines/${index + 1}/staticYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
            if (!line.staticSizeAttribute) {
                errors.push({
                    property: `lines/${index + 1}/staticSizeAttribute`,
                    message: `Setting a size attribute is required.`
                });
            }
        }
        if (line.dataSet === "dynamic" && line.dynamicDataSource) {
            if (!line.dynamicXAttribute) {
                errors.push({
                    property: `lines/${index + 1}/dynamicXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }
            if (!line.dynamicYAttribute) {
                errors.push({
                    property: `lines/${index + 1}/dynamicYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
            if (!line.dynamicSizeAttribute) {
                errors.push({
                    property: `lines/${index + 1}/dynamicSizeAttribute`,
                    message: `Setting a size attribute is required.`
                });
            }
        }
    });
    return errors;
}
