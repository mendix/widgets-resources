import { hideNestedPropertiesIn, Problem, Properties } from "@widgets-resources/piw-utils";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getProperties(values: LineChartPreviewProps, defaultProperties: Properties): Properties {
    values.lines.forEach((lines, index) => {
        if (lines.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "dynamicDataSource",
                "groupByAttribute",
                "dynamicName",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicLineStyle",
                "dynamicCustomLineStyle"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "lines", index, [
                "staticDataSource",
                "staticName",
                "staticXAttribute",
                "staticYAttribute",
                "staticLineStyle",
                "staticCustomLineStyle"
            ]);
        }
    });
    return defaultProperties;
}

export function check(values: LineChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    values.lines.forEach((lines, index) => {
        if (lines.dataSet === "static") {
            // @ts-ignore
            if (lines.staticDataSource.type === "null") {
                errors.push({
                    property: "staticDataSource",
                    severity: "error",
                    message: `No data source configured for static line located at position ${index + 1}.`
                });
            }

            if (!lines.staticXAttribute) {
                errors.push({
                    property: "staticXAttribute",
                    severity: "error",
                    message: `No X attribute configured for static line located at position ${index + 1}.`
                });
            }

            if (!lines.staticYAttribute) {
                errors.push({
                    property: "staticYAttribute",
                    severity: "error",
                    message: `No Y attribute configured for static line located at position ${index + 1}.`
                });
            }
        } else {
            // @ts-ignore
            if (lines.dynamicDataSource.type === "null") {
                errors.push({
                    property: "dynamicDataSource",
                    severity: "error",
                    message: `No data source configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.dynamicXAttribute) {
                errors.push({
                    property: "dynamicXAttribute",
                    severity: "error",
                    message: `No X attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.dynamicYAttribute) {
                errors.push({
                    property: "dynamicYAttribute",
                    severity: "error",
                    message: `No Y attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.groupByAttribute) {
                errors.push({
                    property: "groupByAttribute",
                    severity: "error",
                    message: `No group by attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }
        }
    });

    return errors;
}
