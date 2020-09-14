import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hidePropertyIn(defaultProperties, values, "series", index, "groupByAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "seriesNameAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "stylePropertyNameAttribute");

            hidePropertiesConfigMode(values, defaultProperties, index);
        } else {
            hidePropertyIn(defaultProperties, values, "series", index, "seriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "stylePropertyName");

            hidePropertiesConfigMode(values, defaultProperties, index);
        }
    });
    return defaultProperties;
}

function hidePropertiesConfigMode(values: LineChartPreviewProps, defaultProperties: Properties, index: number): void {
    if (values.configMode === "basic") {
        hidePropertyIn(defaultProperties, values, "series", index, "interpolation");
    } else {
        hidePropertyIn(defaultProperties, values, "series", index, "lineStyle");
    }
}

// TODO: Add consistency checks
