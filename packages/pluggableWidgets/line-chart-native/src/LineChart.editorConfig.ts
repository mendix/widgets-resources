import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hidePropertyIn(defaultProperties, values, "series", index, "groupByAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "seriesNameAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "stylePropertyNameAttribute");
        } else {
            hidePropertyIn(defaultProperties, values, "series", index, "seriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "stylePropertyName");
        }
    });
    return defaultProperties;
}

// TODO: Add consistency checks
