import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hideNestedPropertiesIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

import lineChartSvgDark from "./assets/LineChart.dark.svg";
import lineChartSvgLight from "./assets/LineChart.light.svg";
import lineChartLegendSvgDark from "./assets/LineChart.Legend.dark.svg";
import lineChartLegendSvgLight from "./assets/LineChart.Legend.light.svg";

import { LineChartPreviewProps } from "../typings/LineChartProps";

export function getPreview(values: LineChartPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "Image",
                document: decodeURIComponent(
                    (isDarkMode ? lineChartSvgDark : lineChartSvgLight).replace("data:image/svg+xml,", "")
                )
            },
            ...((values.showLegend
                ? [
                      {
                          type: "Container",
                          grow: 1
                      },
                      {
                          type: "Image",
                          document: decodeURIComponent(
                              (isDarkMode ? lineChartLegendSvgDark : lineChartLegendSvgLight).replace(
                                  "data:image/svg+xml,",
                                  ""
                              )
                          ),
                          width: 85
                      }
                  ]
                : [{ type: "Container" }]) as StructurePreviewProps[])
        ]
    };
}

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
            if (
                !lines.staticDataSource ||
                ("type" in lines.staticDataSource && lines.staticDataSource.type === "null")
            ) {
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
            if (
                !lines.dynamicDataSource ||
                ("type" in lines.dynamicDataSource && lines.dynamicDataSource.type === "null")
            ) {
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
