import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { Big } from "big.js";
import { ObjectItem } from "mendix";

import { BarSeriesType } from "../../typings/BarChartProps";
import { BarChartSeries, BarDataPoints } from "../components/BarChart";

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicSeriesNameValue?: string;
    dynamicStylePropertyNameValue?: string;
    items: ObjectItem[];
}

interface DataPointsExtraction {
    dataPoints: BarDataPoints;
    xFormatter?: (xValue: number | Date | string) => string;
    yFormatter?: (yValue: number | Date | string) => string;
}

// todo: test this hook.
// todo: make types generic as different chart will *hopefully* use this hook
export function useSeries(series: BarSeriesType[]): BarChartSeries[] | null {
    const [chartSeries, setChartSeries] = useState<BarChartSeries[] | null>(null);

    useEffect(() => {
        const loadedSeries: BarChartSeries[] = [];

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

function loadStaticSeries(series: BarSeriesType): BarChartSeries | null {
    const { staticSeriesName, dataSet } = series;

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
        name: staticSeriesName ? staticSeriesName.value : undefined
    };
}

function loadDynamicSeries(series: BarSeriesType): BarChartSeries[] | null {
    const { dataSet } = series;

    if (dataSet !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSourceItemGroups = groupDataSourceItems(series);

    if (!dataSourceItemGroups) {
        return null;
    }

    const loadedSeries: BarChartSeries[] = [];

    for (const itemGroup of dataSourceItemGroups) {
        const dataPointsExtraction = extractDataPoints(series, itemGroup.items);

        if (!dataPointsExtraction) {
            return null;
        }

        loadedSeries.push({
            dataPoints: dataPointsExtraction.dataPoints,
            xFormatter: dataPointsExtraction.xFormatter,
            yFormatter: dataPointsExtraction.yFormatter,
            name: itemGroup.dynamicSeriesNameValue
        });
    }

    return loadedSeries;
}

// todo: note, perhaps it's worth noting in UI that series can be grouped by X or Y attributes.
function groupDataSourceItems(series: BarSeriesType): DataSourceItemGroup[] | null {
    const { dynamicDataSource, dynamicSeriesName, groupByAttribute, dataSet } = series;

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

            dataSourceItemGroupsResult.push(newDataSourceItemGroup);
        }
    }

    return dataSourceItemGroupsResult;
}

function extractDataPoints(series: BarSeriesType, dataSourceItems?: ObjectItem[]): DataPointsExtraction | null {
    if (!dataSourceItems) {
        // todo: why is this check here? dataSourceItems are only passed for dynamic items.
        const dataSource =
            series.dataSet === "static" ? ensure(series.staticDataSource) : ensure(series.dynamicDataSource);

        if (!dataSource.items) {
            return null;
        }

        dataSourceItems = dataSource.items;
    }

    const dataPointsExtraction: DataPointsExtraction = { dataPoints: [] };

    for (const item of dataSourceItems) {
        const x = (series.dataSet === "static" ? ensure(series.staticXAttribute) : ensure(series.dynamicXAttribute))(
            item
        );
        const y = (series.dataSet === "static" ? ensure(series.staticYAttribute) : ensure(series.dynamicYAttribute))(
            item
        );

        if (!x.value || !y.value) {
            return null;
        }

        if (!dataPointsExtraction.xFormatter && !dataPointsExtraction.yFormatter) {
            dataPointsExtraction.xFormatter = (xValue: number | Date | string) =>
                x.formatter.format(typeof xValue === "number" ? new Big(xValue) : xValue);
            dataPointsExtraction.yFormatter = (yValue: number | Date | string) =>
                y.formatter.format(typeof yValue === "number" ? new Big(yValue) : yValue);
        }

        // todo: this could be a problem. what if a LARGE number is passed to client, precision will be lost with Number.
        // note: switch X and Y because bar chart is horizontal.
        dataPointsExtraction.dataPoints.push({
            y: x.value instanceof Date || typeof x.value === "string" ? x.value : Number(x.value.toString()),
            x: y.value instanceof Date || typeof y.value === "string" ? y.value : Number(y.value.toString())
            // todo: not sure how to get these types right after adding string support
            // // Cast as any because data type will never differ for data points within a series
        } as any);
    }

    return dataPointsExtraction;
}
