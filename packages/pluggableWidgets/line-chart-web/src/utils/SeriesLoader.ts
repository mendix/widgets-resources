import Big from "big.js";
import { ObjectItem, ValueStatus } from "mendix";
import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { Datum, PlotData } from "plotly.js";
import { LinesType } from "../../typings/LineChartProps";

export type LineChartDataPoints = Pick<PlotData, "x" | "y"> & {
    name?: PlotData["name"];
};

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicNameValue?: string;
    dynamicCustomLineStyleValue?: string;
    items: ObjectItem[];
}

interface DataPointsExtraction {
    dataPoints: LineChartDataPoints;
    xFormatter?: (xValue: number | Date) => string;
    yFormatter?: (yValue: number | Date) => string;
}

export interface LineChartSeries {
    dataPoints: LineChartDataPoints;
    xFormatter?: (xValue: number | Date) => string;
    yFormatter?: (yValue: number | Date) => string;
    interpolation: PlotData["line"]["shape"];
    name?: string;
    lineStyle: "line" | "lineWithMarkers" | "custom";
    customLineStyle?: string;
    markerColor: string | undefined;
    lineColor: string | undefined;
}

export function useSeries(series: LinesType[]): LineChartSeries[] | null {
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

function loadStaticSeries(series: LinesType): LineChartSeries | null {
    const { interpolation, lineStyle, staticName, dataSet, markerColor, lineColor } = series;

    if (dataSet !== "static") {
        throw Error("Expected series to be static");
    }

    const seriesName = staticName?.status === ValueStatus.Available ? staticName.value : undefined;

    const dataPointsExtraction = extractDataPoints(series, seriesName);

    if (!dataPointsExtraction) {
        return null;
    }

    return {
        dataPoints: dataPointsExtraction.dataPoints,
        xFormatter: dataPointsExtraction.xFormatter,
        yFormatter: dataPointsExtraction.yFormatter,
        interpolation,
        lineStyle,
        markerColor: markerColor?.status === ValueStatus.Available ? markerColor.value : undefined,
        lineColor: lineColor?.status === ValueStatus.Available ? lineColor.value : undefined
    };
}

function loadDynamicSeries(series: LinesType): LineChartSeries[] | null {
    const { lineStyle, interpolation, dataSet, markerColor, lineColor } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSourceItemGroups = groupDataSourceItems(series);

    if (!dataSourceItemGroups) {
        return null;
    }

    const loadedSeries: LineChartSeries[] = [];

    for (const itemGroup of dataSourceItemGroups) {
        const dataPointsExtraction = extractDataPoints(series, itemGroup.dynamicNameValue, itemGroup.items);

        if (!dataPointsExtraction) {
            return null;
        }

        loadedSeries.push({
            dataPoints: dataPointsExtraction.dataPoints,
            xFormatter: dataPointsExtraction.xFormatter,
            yFormatter: dataPointsExtraction.yFormatter,
            interpolation,
            lineStyle,
            markerColor: markerColor?.status === ValueStatus.Available ? markerColor.value : undefined,
            lineColor: lineColor?.status === ValueStatus.Available ? lineColor.value : undefined
        });
    }

    return loadedSeries;
}

function groupDataSourceItems(series: LinesType): DataSourceItemGroup[] | null {
    const { dynamicDataSource, dynamicName, groupByAttribute, dataSet } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSource = ensure(dynamicDataSource);

    if (!dataSource.items) {
        return null;
    }

    const dataSourceItemGroupsResult: DataSourceItemGroup[] = [];

    for (const item of dataSource.items) {
        const groupByAttributeValue = ensure(groupByAttribute).get(item);

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

            if (dynamicName) {
                const dynamicSeriesNameValue = dynamicName.get(item);

                if (dynamicSeriesNameValue.value === undefined) {
                    return null;
                }

                newDataSourceItemGroup.dynamicNameValue = dynamicSeriesNameValue.value;
            }

            dataSourceItemGroupsResult.push(newDataSourceItemGroup);
        }
    }

    return dataSourceItemGroupsResult;
}

function extractDataPoints(
    series: LinesType,
    seriesName: string | undefined,
    dataSourceItems?: ObjectItem[]
): DataPointsExtraction | null {
    const xValue = series.dataSet === "static" ? ensure(series.staticXAttribute) : ensure(series.dynamicXAttribute);
    const yValue = series.dataSet === "static" ? ensure(series.staticYAttribute) : ensure(series.dynamicYAttribute);

    if (!dataSourceItems) {
        const dataSource = ensure(series.staticDataSource);

        if (!dataSource.items) {
            return null;
        }

        dataSourceItems = dataSource.items;
    }

    const dataPointsExtraction: DataPointsExtraction = {
        dataPoints: {
            x: [],
            y: [],
            ...(seriesName ? { name: seriesName } : {})
        }
    };

    for (const item of dataSourceItems) {
        const x = xValue.get(item);
        const y = yValue.get(item);

        if (!x.value || !y.value) {
            return null;
        }

        if (!dataPointsExtraction.xFormatter && !dataPointsExtraction.yFormatter) {
            dataPointsExtraction.xFormatter = (xValue: number | Date) =>
                x.formatter.format(typeof xValue === "number" ? new Big(xValue) : xValue);

            dataPointsExtraction.yFormatter = (yValue: number | Date) =>
                y.formatter.format(typeof yValue === "number" ? new Big(yValue) : yValue);
        }

        (dataPointsExtraction.dataPoints.x as Datum[]).push(
            x.value instanceof Date ? x.value : Number(x.value.toString())
        );
        (dataPointsExtraction.dataPoints.y as Datum[]).push(
            y.value instanceof Date ? y.value : Number(y.value.toString())
        );
    }

    return dataPointsExtraction;
}
