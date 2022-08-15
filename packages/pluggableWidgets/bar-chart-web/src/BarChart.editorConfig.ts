import { BarChartPreviewProps, BarmodeEnum } from "../typings/BarChartProps";
import { StructurePreviewProps, ContainerProps, ImageProps } from "@mendix/piw-utils-internal";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import BarChartGroupedDark from "./assets/BarChart-grouped.dark.svg";
import BarChartGroupedLight from "./assets/BarChart-grouped.light.svg";
import BarChartStackedDark from "./assets/BarChart-stacked.dark.svg";
import BarChartStackedLight from "./assets/BarChart-stacked.light.svg";
import BarChartLegendDark from "./assets/BarChart-legend.dark.svg";
import BarChartLegendLight from "./assets/BarChart-legend.light.svg";

export function getProperties(
    values: BarChartPreviewProps,
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

export function getPreview(values: BarChartPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        group: {
            dark: { structure: BarChartGroupedDark, legend: BarChartLegendDark },
            light: { structure: BarChartGroupedLight, legend: BarChartLegendLight }
        },
        stack: {
            dark: { structure: BarChartStackedDark, legend: BarChartLegendDark },
            light: { structure: BarChartStackedLight, legend: BarChartLegendLight }
        }
    };

    const getImage = (barMode: BarmodeEnum, type: "structure" | "legend") => {
        const colorMode = isDarkMode ? "dark" : "light";
        return items[barMode][colorMode][type];
    };

    const chartImage = {
        type: "Image",
        document: decodeURIComponent(getImage(values.barmode, "structure").replace("data:image/svg+xml,", "")),
        width: 375
    } as ImageProps;

    const legendImage = {
        type: "Image",
        document: decodeURIComponent(getImage(values.barmode, "legend").replace("data:image/svg+xml,", "")),
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

export function check(values: BarChartPreviewProps): Problem[] {
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
