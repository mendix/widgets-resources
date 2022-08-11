import { StructurePreviewProps, ImageProps, ContainerProps } from "@mendix/piw-utils-internal";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { LineChartPreviewProps } from "../typings/LineChartProps";

import LineChartDark from "./assets/LineChart.dark.svg";
import LineChartLight from "./assets/LineChart.light.svg";
import LineChartLegendDark from "./assets/LineChart-legend.dark.svg";
import LineChartLegendLight from "./assets/LineChart-legend.light.svg";

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
                "dynamicTooltipHoverText",
                "groupByAttribute"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "staticDataSource",
                "staticXAttribute",
                "staticYAttribute",
                "staticName",
                "staticTooltipHoverText"
            ]);
        }
        // Line styles
        if (line.lineStyle !== "lineWithMarkers") {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, ["markerColor"]);
        }
        if (!values.enableAdvancedOptions && platform === "web") {
            hidePropertyIn(defaultProperties, values, "lines", index, "customSeriesOptions");
        }
    });

    if (platform === "web") {
        if (!values.enableAdvancedOptions) {
            hidePropertiesIn(defaultProperties, values, [
                "customLayout",
                "customConfigurations",
                "enableThemeConfig",
                "enableDeveloperMode"
            ]);
        }

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "enableAdvancedOptions");
    }
    return defaultProperties;
}

export function getPreview(values: LineChartPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        dark: { structure: LineChartDark, legend: LineChartLegendDark },
        light: { structure: LineChartLight, legend: LineChartLegendLight }
    };

    const getImage = (type: "structure" | "legend") => {
        const colorMode = isDarkMode ? "dark" : "light";
        return items[colorMode][type];
    };

    const chartImage = {
        type: "Image",
        document: decodeURIComponent(getImage("structure").replace("data:image/svg+xml,", "")),
        width: 375
    } as ImageProps;

    const legendImage = {
        type: "Image",
        document: decodeURIComponent(getImage("legend").replace("data:image/svg+xml,", "")),
        width: 85
    } as ImageProps;

    const filler = {
        type: "Container",
        grow: 1,
        children: []
    } as ContainerProps;

    return {
        type: "RowLayout",
        columnSize: "fixed",
        children: values.showLegend ? [chartImage, legendImage, filler] : [chartImage, filler]
    };
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
