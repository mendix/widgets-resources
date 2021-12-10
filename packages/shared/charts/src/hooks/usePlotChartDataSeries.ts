import Big from "big.js";
import { ObjectItem, DynamicValue, ListValue, ListExpressionValue, ListAttributeValue, ActionValue } from "mendix";
import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { Datum, PlotData } from "plotly.js";
import { executeAction } from "@mendix/piw-utils-internal";
import { MendixChartDataProps } from "src/components/Chart";

type PlotChartDataPoints = {
    x: Array<NonNullable<Datum>>;
    y: Array<NonNullable<Datum>>;
    text: Array<string | undefined>;
    hoverinfo: PlotData["hoverinfo"];
    // We want this optional.
    name?: PlotData["name"];
};

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicNameValue?: string;
    dynamicCustomLineStyleValue?: string;
    items: ObjectItem[];
}

export type PlotChartSeries = PlotChartDataPoints & MendixChartDataProps;

interface PlotDataSeries {
    dataSet: "static" | "dynamic";
    customSeriesOptions: string | undefined;
    groupByAttribute?: ListAttributeValue<string | boolean | Date | Big>;
    staticDataSource?: ListValue;
    dynamicDataSource?: ListValue;
    staticName?: DynamicValue<string>;
    dynamicName?: ListExpressionValue<string>;
    staticXAttribute?: ListAttributeValue<Date | Big | string>;
    dynamicXAttribute?: ListAttributeValue<Date | Big | string>;
    staticYAttribute?: ListAttributeValue<Date | Big | string>;
    dynamicYAttribute?: ListAttributeValue<Date | Big | string>;
    onClickAction?: ActionValue;
    staticTooltipHoverText?: ListExpressionValue<string>;
    dynamicTooltipHoverText?: ListExpressionValue<string>;
}

type SeriesMapper<T> = (serie: T, dataPoints: PlotChartDataPoints) => Partial<PlotData>;

export function usePlotChartDataSeries<T extends PlotDataSeries>(
    series: T[],
    mapSerie: SeriesMapper<T>
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
    }, [series, mapSerie]);

    return chartSeries;
}

function createActionHandlers({
    onClickAction
}: Pick<PlotDataSeries, "onClickAction">): Pick<PlotChartSeries, "onClick"> {
    return {
        onClick: onClickAction ? () => executeAction(onClickAction) : undefined
    };
}

function loadStaticSeries(series: PlotDataSeries, mapSerie: SeriesMapper<PlotDataSeries>): PlotChartSeries | null {
    const { staticName, dataSet, customSeriesOptions, onClickAction } = series;

    if (dataSet !== "static") {
        throw Error("Expected series to be static");
    }

    const dataPoints = extractDataPoints(series, staticName?.value);

    if (!dataPoints) {
        return null;
    }

    return {
        ...createActionHandlers({ onClickAction }),
        ...mapSerie(series, dataPoints),
        ...dataPoints,
        customSeriesOptions
    };
}

function loadDynamicSeries(series: PlotDataSeries, mapSerie: SeriesMapper<PlotDataSeries>): PlotChartSeries[] | null {
    const { dataSet, customSeriesOptions, onClickAction } = series;

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
                ...createActionHandlers({ onClickAction }),
                ...mapSerie(series, dataPoints),
                ...dataPoints,
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
    const xData: PlotChartDataPoints["x"] = [];
    const yData: PlotChartDataPoints["y"] = [];
    const textData: PlotChartDataPoints["text"] = [];

    for (const item of dataSourceItems) {
        const x = xValue.get(item);
        const y = yValue.get(item);

        if (!x.value || !y.value) {
            return null;
        }

        xData.push(x.value instanceof Big ? Number(x.value.toString()) : x.value);
        yData.push(y.value instanceof Big ? Number(y.value.toString()) : y.value);

        const tooltipHoverTextSource =
            series.dataSet === "dynamic" ? series.dynamicTooltipHoverText : series.staticTooltipHoverText;
        textData.push(tooltipHoverTextSource?.get(item).value);
    }

    return {
        ...(seriesName ? { name: seriesName } : {}),
        x: xData,
        y: yData,
        text: textData,
        hoverinfo: textData.some(text => text !== undefined && text !== "") ? "text" : "none"
    };
}

type AggregationTypeEnum = "none" | "count" | "sum" | "avg" | "min" | "max" | "median" | "mode" | "first" | "last";

export function getPlotChartDataTransforms(
    aggregationType: AggregationTypeEnum,
    dataPoints: PlotChartDataPoints
): PlotData["transforms"] {
    if (aggregationType === "none") {
        return [];
    }
    return [
        {
            type: "aggregate",
            groups: dataPoints.x.map(dataPoint =>
                typeof dataPoint === "string" || typeof dataPoint === "number"
                    ? dataPoint.toLocaleString()
                    : dataPoint.toLocaleDateString()
            ),
            aggregations: [
                {
                    target: "y",
                    func: aggregationType,
                    enabled: true
                }
            ]
        }
    ];
}
