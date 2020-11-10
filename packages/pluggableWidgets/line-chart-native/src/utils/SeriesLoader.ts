import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { Big } from "big.js";
import { ObjectItem } from "mendix";

import { SeriesType } from "../../typings/LineChartProps";
import { LineChartDataPoints, LineChartSeries } from "../components/LineChart";

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicSeriesNameValue?: string;
    dynamicCustomLineStyleValue?: string;
    items: ObjectItem[];
}

interface DataPointsExtraction {
    dataPoints: LineChartDataPoints;
    xFormatter?: (xValue: number | Date) => string;
    yFormatter?: (yValue: number | Date) => string;
}

export function useSeries(series: SeriesType[]): LineChartSeries[] | null {
    const [chartSeries, setChartSeries] = useState<LineChartSeries[] | null>(null);

    useEffect(() => {
        const loadedSeries: LineChartSeries[] = [];

        for (const element of series) {
            if (element.dataSet === "static") {
                const result = loadStaticSeries(element);

                if (!result) {
                    setChartSeries(null);
                    return;
                }

                loadedSeries.push(result);
            } else {
                const result = loadDynamicSeries(element);

                if (!result) {
                    setChartSeries(null);
                    return;
                }

                loadedSeries.push(...result);
            }
        }

        setChartSeries(loadedSeries);
    }, [series]);

    return chartSeries;
}

function loadStaticSeries(series: SeriesType): LineChartSeries | null {
    const { interpolation, staticLineStyle, staticSeriesName, staticCustomLineStyle, dataSet } = series;

    if (dataSet !== "static") {
        throw Error("Expected series to be static");
    }

    if (staticSeriesName && staticSeriesName.value === undefined) {
        return null;
    }

    const dataPointsExtraction = extractDataPoints(series);

    if (!dataPointsExtraction) {
        return null;
    }

    return {
        dataPoints: dataPointsExtraction.dataPoints,
        xFormatter: dataPointsExtraction.xFormatter,
        yFormatter: dataPointsExtraction.yFormatter,
        interpolation,
        lineStyle: staticLineStyle,
        name: staticSeriesName ? staticSeriesName.value : undefined,
        customLineStyle: staticCustomLineStyle
    };
}

function loadDynamicSeries(series: SeriesType): LineChartSeries[] | null {
    const { dynamicLineStyle, interpolation, dataSet } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSourceItemGroups = groupDataSourceItems(series);

    if (!dataSourceItemGroups) {
        return null;
    }

    const loadedSeries: LineChartSeries[] = [];

    for (const itemGroup of dataSourceItemGroups) {
        const dataPointsExtraction = extractDataPoints(series, itemGroup.items);

        if (!dataPointsExtraction) {
            return null;
        }

        loadedSeries.push({
            dataPoints: dataPointsExtraction.dataPoints,
            xFormatter: dataPointsExtraction.xFormatter,
            yFormatter: dataPointsExtraction.yFormatter,
            interpolation,
            lineStyle: dynamicLineStyle,
            name: itemGroup.dynamicSeriesNameValue,
            customLineStyle: itemGroup.dynamicCustomLineStyleValue
        });
    }

    return loadedSeries;
}

function groupDataSourceItems(series: SeriesType): DataSourceItemGroup[] | null {
    const { dynamicDataSource, dynamicSeriesName, dynamicCustomLineStyle, groupByAttribute, dataSet } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSource = ensure(dynamicDataSource);

    if (!dataSource.items) {
        return null;
    }

    const dataSourceItemGroupsResult: DataSourceItemGroup[] = [];

    for (const item of dataSource.items) {
        const groupByAttributeValue = ensure(groupByAttribute)(item);

        if (groupByAttributeValue.value === undefined) {
            return null;
        }

        const group = dataSourceItemGroupsResult.find(group => {
            if (groupByAttributeValue.value instanceof Date && group.groupByAttributeValue instanceof Date) {
                return group.groupByAttributeValue.getTime() === groupByAttributeValue.value.getTime();
            } else if (groupByAttributeValue.value instanceof Big && group.groupByAttributeValue instanceof Big) {
                return group.groupByAttributeValue.eq(groupByAttributeValue.value);
            }
            return group.groupByAttributeValue === groupByAttributeValue.value;
        });

        if (group) {
            group.items.push(item);
        } else {
            const newDataSourceItemGroup: DataSourceItemGroup = {
                groupByAttributeValue: groupByAttributeValue.value,
                items: [item]
            };

            if (dynamicSeriesName) {
                const dynamicSeriesNameValue = dynamicSeriesName(item);

                if (dynamicSeriesNameValue.value === undefined) {
                    return null;
                }

                newDataSourceItemGroup.dynamicSeriesNameValue = dynamicSeriesNameValue.value;
            }

            if (dynamicCustomLineStyle) {
                const dynamicCustomLineStyleValue = dynamicCustomLineStyle(item);

                if (dynamicCustomLineStyleValue.value === undefined) {
                    return null;
                }

                newDataSourceItemGroup.dynamicCustomLineStyleValue = dynamicCustomLineStyleValue.value;
            }

            dataSourceItemGroupsResult.push(newDataSourceItemGroup);
        }
    }

    return dataSourceItemGroupsResult;
}

function extractDataPoints(series: SeriesType, dataSourceItems?: ObjectItem[]): DataPointsExtraction | null {
    const xValue = series.dataSet === "static" ? ensure(series.staticXAttribute) : ensure(series.dynamicXAttribute);
    const yValue = series.dataSet === "static" ? ensure(series.staticYAttribute) : ensure(series.dynamicYAttribute);

    if (!dataSourceItems) {
        const dataSource =
            series.dataSet === "static" ? ensure(series.staticDataSource) : ensure(series.dynamicDataSource);

        if (!dataSource.items) {
            return null;
        }

        dataSourceItems = dataSource.items;
    }

    const dataPointsExtraction: DataPointsExtraction = { dataPoints: [] };

    for (const item of dataSourceItems) {
        const x = xValue(item);
        const y = yValue(item);

        if (!x.value || !y.value) {
            return null;
        }

        if (!dataPointsExtraction.xFormatter && !dataPointsExtraction.yFormatter) {
            dataPointsExtraction.xFormatter = (xValue: number | Date) => {
                return x.formatter.format(typeof xValue === "number" ? new Big(xValue) : xValue);
            };
            dataPointsExtraction.yFormatter = (yValue: number | Date) =>
                y.formatter.format(typeof yValue === "number" ? new Big(yValue) : yValue);
        }

        dataPointsExtraction.dataPoints.push({
            x: x.value instanceof Date ? x.value : (Number(x.value.toString()) as any), // Cast as any because data type will never differ for data points within a series
            y: y.value instanceof Date ? y.value : (Number(y.value.toString()) as any) // Cast as any because data type will never differ for data points within a series
        });
    }

    return dataPointsExtraction;
}
