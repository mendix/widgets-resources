import { hideNestedPropertiesIn, Problem, Properties } from "@widgets-resources/piw-utils";

import { BarChartPreviewProps } from "../typings/BarChartProps";

export function getProperties(values: BarChartPreviewProps, defaultProperties: Properties): Properties {
    values.barSeries.forEach((series, index) => {
        if (series.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "barSeries", index, [
                "dynamicDataSource",
                "groupByAttribute",
                "dynamicSeriesName",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicCustomBarStyle"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "barSeries", index, [
                "staticDataSource",
                "staticSeriesName",
                "staticXAttribute",
                "staticYAttribute",
                "staticCustomBarStyle"
            ]);
        }
    });

    return defaultProperties;
}

export function check(values: BarChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    values.barSeries.forEach((series, index) => {
        if (series.dataSet === "static") {
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
