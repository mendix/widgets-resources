import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hideNestedPropertiesIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";
import columnChartGroupedSvgDark from "./assets/ColumnChart.Grouped.dark.svg";
import columnChartGroupedSvgLight from "./assets/ColumnChart.Grouped.light.svg";
import columnChartStackedSvgDark from "./assets/ColumnChart.Stacked.dark.svg";
import columnChartStackedSvgLight from "./assets/ColumnChart.Stacked.light.svg";
import columnChartLegendSvgLight from "./assets/ColumnChart.Legend.light.svg";
import columnChartLegendSvgDark from "./assets/ColumnChart.Legend.dark.svg";

export function getPreview(values: ColumnChartPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "Image",
                document: decodeURIComponent(
                    (values.presentation === "grouped"
                        ? isDarkMode
                            ? columnChartGroupedSvgDark
                            : columnChartGroupedSvgLight
                        : isDarkMode
                        ? columnChartStackedSvgDark
                        : columnChartStackedSvgLight
                    ).replace("data:image/svg+xml,", "")
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
                              (isDarkMode ? columnChartLegendSvgDark : columnChartLegendSvgLight).replace(
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
