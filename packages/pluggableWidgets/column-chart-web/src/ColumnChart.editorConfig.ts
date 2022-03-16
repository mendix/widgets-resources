import { ColumnChartPreviewProps, BarmodeEnum } from "../typings/ColumnChartProps";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs,
    ImageProps,
    ContainerProps
} from "@mendix/piw-utils-internal";

import ColumnChartGroupedDark from "./assets/ColumnChart-grouped.dark.svg";
import ColumnChartGroupedLight from "./assets/ColumnChart-grouped.light.svg";
import ColumnChartGroupedLegendDark from "./assets/ColumnChart-grouped-legend.dark.svg";
import ColumnChartGroupedLegendLight from "./assets/ColumnChart-grouped-legend.light.svg";

import ColumnChartStackedDark from "./assets/ColumnChart-stacked.dark.svg";
import ColumnChartStackedLight from "./assets/ColumnChart-stacked.light.svg";
import ColumnChartStackedLegendDark from "./assets/ColumnChart-stacked-legend.dark.svg";
import ColumnChartStackedLegendLight from "./assets/ColumnChart-stacked-legend.light.svg";

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

        if (!values.advancedOptions && platform === "web") {
            hidePropertyIn(defaultProperties, values, "series", index, "customSeriesOptions");
        }
    });

    if (platform === "web") {
        if (!values.advancedOptions) {
            hidePropertiesIn(defaultProperties, values, [
                "customLayout",
                "customConfigurations",
                "enableThemeConfig",
                "developerMode"
            ]);
        }

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertiesIn(defaultProperties, values, ["advancedOptions"]);
    }

    return defaultProperties;
}

export function getPreview(values: ColumnChartPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        group: {
            dark: { structure: ColumnChartGroupedDark, legend: ColumnChartGroupedLegendDark },
            light: { structure: ColumnChartGroupedLight, legend: ColumnChartGroupedLegendLight }
        },
        stack: {
            dark: { structure: ColumnChartStackedDark, legend: ColumnChartStackedLegendDark },
            light: { structure: ColumnChartStackedLight, legend: ColumnChartStackedLegendLight }
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
