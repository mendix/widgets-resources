import { hideNestedPropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";

export function getProperties(values: ColumnChartPreviewProps, defaultProperties: Properties): Properties {
    values.columnSeries.forEach((series, index) => {
        if (series.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "columnSeries", index, [
                "dynamicDataSource",
                "groupByAttribute",
                "dynamicSeriesName",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicCustomColumnStyle"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "columnSeries", index, [
                "staticDataSource",
                "staticSeriesName",
                "staticXAttribute",
                "staticYAttribute",
                "staticCustomColumnStyle"
            ]);
        }
    });

    return defaultProperties;
}

export function check(values: ColumnChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    values.columnSeries.forEach((series, index) => {
        if (series.dataSet === "static") {
            if (
                !series.staticDataSource ||
                ("type" in series.staticDataSource && series.staticDataSource.type === "null")
            ) {
                errors.push({
                    property: `columnSeries/${index + 1}/staticDataSource`,
                    severity: "error",
                    message: `No data source configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticXAttribute) {
                errors.push({
                    property: `columnSeries/${index + 1}/staticXAttribute`,
                    severity: "error",
                    message: `No X attribute configured for static series located at position ${index + 1}.`
                });
            }

            if (!series.staticYAttribute) {
                errors.push({
                    property: `columnSeries/${index + 1}/staticYAttribute`,
                    severity: "error",
                    message: `No Y attribute configured for static series located at position ${index + 1}.`
                });
            }
        } else {
            if (
                !series.dynamicDataSource ||
                ("type" in series.dynamicDataSource && series.dynamicDataSource.type === "null")
            ) {
                errors.push({
                    property: `columnSeries/${index + 1}/dynamicDataSource`,
                    severity: "error",
                    message: `No data source configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicXAttribute) {
                errors.push({
                    property: `columnSeries/${index + 1}/dynamicXAttribute`,
                    severity: "error",
                    message: `No X attribute configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.dynamicYAttribute) {
                errors.push({
                    property: `columnSeries/${index + 1}/dynamicYAttribute`,
                    severity: "error",
                    message: `No Y attribute configured for dynamic series located at position ${index + 1}.`
                });
            }

            if (!series.groupByAttribute) {
                errors.push({
                    property: `columnSeries/${index + 1}/groupByAttribute`,
                    severity: "error",
                    message: `No group by attribute configured for dynamic series located at position ${index + 1}.`
                });
            }
        }
    });

    return errors;
}
