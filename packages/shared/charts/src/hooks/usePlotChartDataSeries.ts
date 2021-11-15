import Big from "big.js";
import { ObjectItem, DynamicValue, ListValue, ListExpressionValue, ListAttributeValue } from "mendix";
import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { Datum, PlotData } from "plotly.js";

export type PlotChartDataPoints = Pick<PlotData, "x" | "y"> & {
    // We want this optional.
    name?: PlotData["name"];
};

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicNameValue?: string;
    dynamicCustomLineStyleValue?: string;
    items: ObjectItem[];
}

export interface PlotChartSeries extends PlotChartDataPoints {
    customLineStyle?: string;
    customSeriesOptions: string;
}

interface PlotDataSeries {
    dataSet: "static" | "dynamic";
    customSeriesOptions: string;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | Big>;
    dynamicXAttribute?: ListAttributeValue<Date | Big>;
    staticYAttribute?: ListAttributeValue<Date | Big>;
    dynamicYAttribute?: ListAttributeValue<Date | Big>;
}

export function usePlotChartDataSeries<T extends PlotDataSeries>(
    series: T[],
    mapSerie: (serie: T) => Partial<PlotData>
): PlotChartSeries[] | null {
    const [chartSeries, setChartSeries] = useState<PlotChartSeries[] | null>(null);

    useEffect(() => {
        const loadedSeries = series
            .map(element => {
                const singleSeriesLoader = element.dataSet === "static" ? loadStaticSeries : loadDynamicSeries;
                return singleSeriesLoader(element, mapSerie);
            })
            .filter((element): element is PlotChartSeries | PlotChartSeries[] => Boolean(element))
            .flat();
        setChartSeries(loadedSeries.length === 0 ? null : loadedSeries);
    }, [series]);

    return chartSeries;
}

function loadStaticSeries(
    series: PlotDataSeries,
    mapSerie: (serie: PlotDataSeries) => Partial<PlotData>
): PlotChartSeries | null {
    const { staticName, dataSet, customSeriesOptions } = series;

    if (dataSet !== "static") {
        throw Error("Expected series to be static");
    }

    const dataPoints = extractDataPoints(series, staticName?.value);

    if (!dataPoints) {
        return null;
    }

    return {
        ...dataPoints,
        ...mapSerie(series),
        customSeriesOptions
    };
}

function loadDynamicSeries(
    series: PlotDataSeries,
    mapSerie: (serie: PlotDataSeries) => Partial<PlotData>
): PlotChartSeries[] | null {
    const { dataSet, customSeriesOptions } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSourceItemGroups = groupDataSourceItems(series);

    if (!dataSourceItemGroups) {
        return null;
    }

    const loadedSeries = dataSourceItemGroups
        .map(itemGroup => {
            const dataPoints = extractDataPoints(series, itemGroup.dynamicNameValue, itemGroup.items);

            if (!dataPoints) {
                return null;
            }

            return {
                ...dataPoints,
                ...mapSerie(series),
                customSeriesOptions
            };
        })
        .filter((element): element is PlotChartSeries => Boolean(element));

    return loadedSeries;
}

function groupDataSourceItems(series: PlotDataSeries): DataSourceItemGroup[] | null {
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
    series: PlotDataSeries,
    seriesName: string | undefined,
    dataSourceItems?: ObjectItem[]
): PlotChartDataPoints | null {
    const xValue = series.dataSet === "static" ? ensure(series.staticXAttribute) : ensure(series.dynamicXAttribute);
    const yValue = series.dataSet === "static" ? ensure(series.staticYAttribute) : ensure(series.dynamicYAttribute);

    if (!dataSourceItems) {
        const dataSource = ensure(series.staticDataSource);

        if (!dataSource.items) {
            return null;
        }

        dataSourceItems = dataSource.items;
    }
    const xData: Datum[] = [];
    const yData: Datum[] = [];

    for (const item of dataSourceItems) {
        const x = xValue.get(item);
        const y = yValue.get(item);

        if (!x.value || !y.value) {
            return null;
        }

        xData.push(x.value instanceof Date ? x.value : Number(x.value.toString()));
        yData.push(y.value instanceof Date ? y.value : Number(y.value.toString()));
    }

    return {
        ...(seriesName ? { name: seriesName } : {}),
        x: xData,
        y: yData
    };
}
