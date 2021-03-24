import { hideNestedPropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.series.forEach((series, index) => {
        if (series.type === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "dynamicDataSource",
                "groupByAttribute",
                "dynamicSeriesName",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicLineStyle",
                "dynamicStylePropertyName"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "staticDataSource",
                "staticSeriesName",
                "staticXAttribute",
                "staticYAttribute",
                "staticLineStyle",
                "staticStylePropertyName"
            ]);
        }
    });
    return defaultProperties;
}

export function check(values: LineChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

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

    return errors;
}
