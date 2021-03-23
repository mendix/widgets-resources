import { hideNestedPropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

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
                    property: `lines/${index + 1}/staticDataSource`,
                    severity: "error",
                    message: `No data source configured for static line located at position ${index + 1}.`
                });
            }

            if (!lines.staticXAttribute) {
                errors.push({
                    property: `lines/${index + 1}/staticXAttribute`,
                    severity: "error",
                    message: `No X attribute configured for static line located at position ${index + 1}.`
                });
            }

            if (!lines.staticYAttribute) {
                errors.push({
                    property: `lines/${index + 1}/staticYAttribute`,
                    severity: "error",
                    message: `No Y attribute configured for static line located at position ${index + 1}.`
                });
            }
        } else {
            // @ts-ignore
            if (lines.dynamicDataSource.type === "null") {
                errors.push({
                    property: `lines/${index + 1}/dynamicDataSource`,
                    severity: "error",
                    message: `No data source configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.dynamicXAttribute) {
                errors.push({
                    property: `lines/${index + 1}/dynamicXAttribute`,
                    severity: "error",
                    message: `No X attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.dynamicYAttribute) {
                errors.push({
                    property: `lines/${index + 1}/dynamicYAttribute`,
                    severity: "error",
                    message: `No Y attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }

            if (!lines.groupByAttribute) {
                errors.push({
                    property: `lines/${index + 1}/groupByAttribute`,
                    severity: "error",
                    message: `No group by attribute configured for dynamic line(s) located at position ${index + 1}.`
                });
            }
        }
    });

    return errors;
}
