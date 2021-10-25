import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(
    values: LineChartPreviewProps,
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
                "dynamicName",
                "groupByAttribute"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "staticDataSource",
                "staticXAttribute",
                "staticYAttribute",
                "staticName"
            ]);
        }
        // Line styles
        if (line.lineStyle !== "lineWithMarkers") {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, ["markerColor"]);
        }
        if (platform === "web") {
            if (!line.showAdvancedAppearanceOptions) {
                hidePropertyIn(defaultProperties, values, "lines", index, "customLineStyleOptions");
            }
        } else {
            hidePropertyIn(defaultProperties, values, "lines", index, "showAdvancedAppearanceOptions");
        }
    });

    if (platform === "web") {
        if (!values.showAdvancedOptions) {
            hidePropertiesIn(defaultProperties, values, ["customLayout", "customConfigurations"]);
        }

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "showAdvancedOptions");
    }
    return defaultProperties;
}

export function getPreview(_values: LineChartPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(values: LineChartPreviewProps): Problem[] {
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
        }
    });
    return errors;
}
