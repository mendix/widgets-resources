import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs,
    StructurePreviewProps,
    ImageProps,
    ContainerProps
} from "@mendix/piw-utils-internal";
import { TimeSeriesPreviewProps } from "../typings/TimeSeriesProps";

import TimeSeriesDark from "./assets/TimeSeries.dark.svg";
import TimeSeriesLight from "./assets/TimeSeries.light.svg";
import TimeSeriesLegendDark from "./assets/TimeSeries-legend.dark.svg";
import TimeSeriesLegendLight from "./assets/TimeSeries-legend.light.svg";

import TimeSeriesRangeDark from "./assets/TimeSeries-range.dark.svg";
import TimeSeriesRangeLight from "./assets/TimeSeries-range.light.svg";
import TimeSeriesRangeLegendDark from "./assets/TimeSeries-range-legend.dark.svg";
import TimeSeriesRangeLegendLight from "./assets/TimeSeries-range-legend.light.svg";

export function getProperties(
    values: TimeSeriesPreviewProps,
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
        if (!line.enableFillArea) {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, ["fillColor"]);
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
                "enableDeveloperMode",
                "yAxisRangeMode"
            ]);
        }

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "enableAdvancedOptions");
    }
    return defaultProperties;
}

export function getPreview(values: TimeSeriesPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        series: {
            dark: { structure: TimeSeriesDark, legend: TimeSeriesLegendDark },
            light: { structure: TimeSeriesLight, legend: TimeSeriesLegendLight }
        },
        range: {
            dark: { structure: TimeSeriesRangeDark, legend: TimeSeriesRangeLegendDark },
            light: { structure: TimeSeriesRangeLight, legend: TimeSeriesRangeLegendLight }
        }
    };

    const getImage = (viewMode: "series" | "range", type: "structure" | "legend") => {
        const colorMode = isDarkMode ? "dark" : "light";
        return items[viewMode][colorMode][type];
    };

    const chartImage = {
        type: "Image",
        document: decodeURIComponent(
            getImage(values.showRangeSlider ? "range" : "series", "structure").replace("data:image/svg+xml,", "")
        ),
        width: 375
    } as ImageProps;

    const legendImage = {
        type: "Image",
        document: decodeURIComponent(
            getImage(values.showRangeSlider ? "range" : "series", "legend").replace("data:image/svg+xml,", "")
        ),
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

export function check(_values: TimeSeriesPreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
