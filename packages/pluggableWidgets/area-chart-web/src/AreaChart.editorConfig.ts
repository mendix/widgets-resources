import { ContainerProps, ImageProps, StructurePreviewProps } from "@mendix/piw-utils-internal";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { AreaChartPreviewProps } from "../typings/AreaChartProps";

import AreaChartLightSvg from "./assets/AreaChart.light.svg";
import AreaChartDarkSvg from "./assets/AreaChart.dark.svg";
import AreaChartLegendLightSvg from "./assets/AreaChart-legend.light.svg";
import AreaChartLegendDarkSvg from "./assets/AreaChart-legend.dark.svg";

export function getProperties(
    values: AreaChartPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    values.series.forEach((line, index) => {
        if (line.dataSet === "static") {
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
        if (line.lineStyle !== "lineWithMarkers") {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, ["markerColor"]);
        }
        if (!values.enableAdvancedOptions && platform === "web") {
            hidePropertyIn(defaultProperties, values, "series", index, "customSeriesOptions");
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

export function getPreview(values: AreaChartPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        dark: { structure: AreaChartDarkSvg, legend: AreaChartLegendDarkSvg },
        light: { structure: AreaChartLightSvg, legend: AreaChartLegendLightSvg }
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

export function check(values: AreaChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    values.series.forEach((line, index) => {
        if (line.dataSet === "static" && line.staticDataSource) {
            if (!line.staticXAttribute) {
                errors.push({
                    property: `series/${index + 1}/staticXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }
            if (!line.staticYAttribute) {
                errors.push({
                    property: `series/${index + 1}/staticYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
        }
        if (line.dataSet === "dynamic" && line.dynamicDataSource) {
            if (!line.dynamicXAttribute) {
                errors.push({
                    property: `series/${index + 1}/dynamicXAttribute`,
                    message: `Setting a X axis attribute is required.`
                });
            }
            if (!line.dynamicYAttribute) {
                errors.push({
                    property: `series/${index + 1}/dynamicYAttribute`,
                    message: `Setting a Y axis attribute is required.`
                });
            }
        }
    });
    return errors;
}
