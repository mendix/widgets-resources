import { ensure } from "@mendix/pluggable-widgets-tools";
import { Big } from "big.js";
import { ObjectItem } from "mendix";

import { SeriesType } from "../../typings/LineChartProps";
import { LineChartDataPoints, LineChartSeries } from "../components/LineChart";

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicSeriesNameValue?: string;
    dynamicStylePropertyNameValue?: string;
    items: ObjectItem[];
}

export function loadSeries(series: SeriesType[]): LineChartSeries[] | null {
    const loadedSeries: LineChartSeries[] = [];

    for (const element of series) {
        if (element.type === "static") {
            const result = loadStaticSeries(element);

            if (!result) {
                return null;
            }

            loadedSeries.push(result);
        } else {
            const result = loadDynamicSeries(element);

            if (!result) {
                return null;
            }

            loadedSeries.push(...result);
        }
    }

    return loadedSeries;
}

function loadStaticSeries(series: SeriesType): LineChartSeries | null {
    const { interpolation, staticLineStyle, staticSeriesName, staticStylePropertyName, type } = series;

    if (type !== "static") {
        throw Error("Expected series to be static");
    }

    if (staticSeriesName && !staticSeriesName.value && typeof staticSeriesName.value !== "string") {
        return null;
    }

    const dataPoints = extractDataPoints(series);

    if (!dataPoints) {
        return null;
    }

    return {
        dataPoints,
        interpolation,
        lineStyle: staticLineStyle,
        name: staticSeriesName ? staticSeriesName.value : undefined,
        stylePropertyName: staticStylePropertyName
    };
}

function loadDynamicSeries(series: SeriesType): LineChartSeries[] | null {
    const { dynamicLineStyle, interpolation, type } = series;

    if (type !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSourceItemGroups = groupDataSourceItems(series);

    if (!dataSourceItemGroups) {
        return null;
    }

    const loadedSeries: LineChartSeries[] = [];

    for (const itemGroup of dataSourceItemGroups) {
        const dataPoints = extractDataPoints(series, itemGroup.items);

        if (!dataPoints) {
            return null;
        }

        loadedSeries.push({
            dataPoints,
            interpolation,
            lineStyle: dynamicLineStyle,
            name: itemGroup.dynamicSeriesNameValue,
            stylePropertyName: itemGroup.dynamicStylePropertyNameValue
        });
    }

    return loadedSeries;
}

function groupDataSourceItems(series: SeriesType): DataSourceItemGroup[] | null {
    const { dynamicDataSource, dynamicSeriesName, dynamicStylePropertyName, groupByAttribute, type } = series;

    if (type !== "dynamic") {
        throw Error("Expected series to be dynamic");
    }

    const dataSource = ensure(dynamicDataSource);

    if (!dataSource.items) {
        return null;
    }

    const dataSourceItemGroupsResult: DataSourceItemGroup[] = [];

    for (const item of dataSource.items) {
        const groupByAttributeValue = ensure(groupByAttribute)(item);

        if (
            !groupByAttributeValue.value &&
            typeof groupByAttributeValue.value !== "string" &&
            typeof groupByAttributeValue.value !== "boolean"
        ) {
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

                if (!dynamicSeriesNameValue.value && typeof dynamicSeriesNameValue.value !== "string") {
                    return null;
                }

                newDataSourceItemGroup.dynamicSeriesNameValue = dynamicSeriesNameValue.value;
            }

            if (dynamicStylePropertyName) {
                const dynamicStylePropertyNameValue = dynamicStylePropertyName(item);

                if (!dynamicStylePropertyNameValue.value && typeof dynamicStylePropertyNameValue.value !== "string") {
                    return null;
                }

                newDataSourceItemGroup.dynamicStylePropertyNameValue = dynamicStylePropertyNameValue.value;
            }

            dataSourceItemGroupsResult.push(newDataSourceItemGroup);
        }
    }

    return dataSourceItemGroupsResult;
}

function extractDataPoints(series: SeriesType, dataSourceItems?: ObjectItem[]): LineChartDataPoints | null {
    const xValue = series.type === "static" ? ensure(series.staticXValue) : ensure(series.dynamicXValue);
    const yValue = series.type === "static" ? ensure(series.staticYValue) : ensure(series.dynamicYValue);

    if (!dataSourceItems) {
        const dataSource =
            series.type === "static" ? ensure(series.staticDataSource) : ensure(series.dynamicDataSource);

        if (!dataSource.items) {
            return null;
        }

        dataSourceItems = dataSource.items;
    }

    const dataPoints: LineChartDataPoints = [];

    for (const item of dataSourceItems) {
        const x = xValue(item);
        const y = yValue(item);

        if (!x.value || !y.value) {
            return null;
        }

        dataPoints.push({
            x: x.value instanceof Date ? x.value : (Number(x.value.toFixed()) as any), // Cast as any because data type will never differ for data points within a series
            y: y.value instanceof Date ? y.value : (Number(y.value.toFixed()) as any) // Cast as any because data type will never differ for data points within a series
        });
    }

    return dataPoints;
}
