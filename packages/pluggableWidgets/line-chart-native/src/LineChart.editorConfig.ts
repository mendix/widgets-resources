import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "groupByAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicXValue");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicYValue");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicStylePropertyName");
        } else {
            hidePropertyIn(defaultProperties, values, "series", index, "staticDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "staticSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "staticXValue");
            hidePropertyIn(defaultProperties, values, "series", index, "staticYValue");
            hidePropertyIn(defaultProperties, values, "series", index, "staticStylePropertyName");
        }
    });
    return defaultProperties;
}

// TODO: Add consistency checks
