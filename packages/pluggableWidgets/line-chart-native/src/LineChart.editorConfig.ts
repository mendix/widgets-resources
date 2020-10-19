import { hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "groupByAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicXValue");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicYValue");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicLineStyle");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicStylePropertyName");
        } else {
            hidePropertyIn(defaultProperties, values, "series", index, "staticDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "staticSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "staticXValue");
            hidePropertyIn(defaultProperties, values, "series", index, "staticYValue");
            hidePropertyIn(defaultProperties, values, "series", index, "staticLineStyle");
            hidePropertyIn(defaultProperties, values, "series", index, "staticStylePropertyName");
        }
    });
    return defaultProperties;
}

export function check(values: LineChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    // property?: string; // key of the property, at which the problem exists
    // severity?: "error" | "warning" | "deprecation"; // default = "error"
    // message: string; // description of the problem
    // studioMessage?: string; // studio-specific message, defaults to message
    // url?: string; // link with more information about the problem
    // studioUrl?: string; // studio-specific link

    values.series.forEach((series, index) => {
        if (series.type === "static") {
            if (!series.staticDataSource) {
                errors.push({
                    property: "staticDataSource",
                    severity: "error",
                    message: `No data source configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticXValue) {
                errors.push({
                    property: "staticXValue",
                    severity: "error",
                    message: `No X attribute configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticYValue) {
                errors.push({
                    property: "staticYValue",
                    severity: "error",
                    message: `No Y attribute configured for static series located at position ${index + 1}.`
                });
            }
        } else {
            if (!series.dynamicDataSource) {
                errors.push({
                    property: "dynamicDataSource",
                    severity: "error",
                    message: `No data source configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicXValue) {
                errors.push({
                    property: "dynamicXValue",
                    severity: "error",
                    message: `No X attribute configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicYValue) {
                errors.push({
                    property: "dynamicYValue",
                    severity: "error",
                    message: `No Y attribute configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.groupByAttribute) {
                errors.push({
                    property: "groupByAttribute",
                    severity: "error",
                    message: `No group by attribute configured for dynamic series located at position ${index + 1}.`
                });
            }
        }
    });

    // check inter series datatypes

    return errors;
}

// TODO: Add consistency checks
