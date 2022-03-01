import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

export function getProperties(
    values: ColumnChartPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.series.forEach((dataSeries, index) => {
        if (dataSeries.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "dynamicDataSource",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicName",
                "dynamicTooltipHoverText",
                "groupByAttribute"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "staticDataSource",
                "staticXAttribute",
                "staticYAttribute",
                "staticName",
                "staticTooltipHoverText"
            ]);
        }

        if (!values.advancedOptions) {
            hidePropertyIn(defaultProperties, values, "series", index, "customSeriesOptions");
        }
    });

    if (platform === "web") {
        hidePropertyIn(defaultProperties, values, "developerMode");

        transformGroupsIntoTabs(defaultProperties);
    } else {
        if (!values.advancedOptions) {
            hidePropertiesIn(defaultProperties, values, [
                "customLayout",
                "customConfigurations",
                "enableThemeConfig",
                "developerMode"
            ]);
        }
    }

    return defaultProperties;
}

export function getPreview(_values: ColumnChartPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(values: ColumnChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    values.series.forEach((dataSeries, index) => {
        if (dataSeries.dataSet === "static" && dataSeries.staticDataSource) {
            if (!dataSeries.staticXAttribute) {
                errors.push({
                    property: `series/${index + 1}/staticXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }
            if (!dataSeries.staticYAttribute) {
                errors.push({
                    property: `series/${index + 1}/staticYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
        }

        if (dataSeries.dataSet === "dynamic" && dataSeries.dynamicDataSource) {
            if (!dataSeries.dynamicXAttribute) {
                errors.push({
                    property: `series/${index + 1}/dynamicXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }

            if (!dataSeries.dynamicYAttribute) {
                errors.push({
                    property: `series/${index + 1}/dynamicYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
        }
    });

    return errors;
}
