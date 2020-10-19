import { hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "groupByAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicXAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicYAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicLineStyle");
            hidePropertyIn(defaultProperties, values, "series", index, "dynamicStylePropertyName");
        } else {
            hidePropertyIn(defaultProperties, values, "series", index, "staticDataSource");
            hidePropertyIn(defaultProperties, values, "series", index, "staticSeriesName");
            hidePropertyIn(defaultProperties, values, "series", index, "staticXAttribute");
            hidePropertyIn(defaultProperties, values, "series", index, "staticYAttribute");
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
            // @ts-ignore
            if (series.staticDataSource.type === "null") {
                errors.push({
                    property: "staticDataSource",
                    severity: "error",
                    message: `No data source configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticXAttribute) {
                errors.push({
                    property: "staticXAttribute",
                    severity: "error",
                    message: `No X attribute configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticYAttribute) {
                errors.push({
                    property: "staticYAttribute",
                    severity: "error",
                    message: `No Y attribute configured for static series located at position ${index + 1}.`
                });
            }
        } else {
            // @ts-ignore
            if (series.dynamicDataSource.type === "null") {
                errors.push({
                    property: "dynamicDataSource",
                    severity: "error",
                    message: `No data source configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicXAttribute) {
                errors.push({
                    property: "dynamicXAttribute",
                    severity: "error",
                    message: `No X attribute configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicYAttribute) {
                errors.push({
                    property: "dynamicYAttribute",
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
