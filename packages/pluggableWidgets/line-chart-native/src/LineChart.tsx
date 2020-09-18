import { createElement, ReactElement, useState, useEffect, useCallback } from "react";
import { Big } from "big.js";
import { all } from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";
import { InterpolationPropType } from "victory-core";

import { ensure } from "@mendix/pluggable-widgets-tools";

import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";

import { LineChartProps, SeriesType } from "../typings/LineChartProps";

interface GroupedDataSourceItem {
    groupByAttributeValue: string | boolean | Date | Big;
    seriesNameAttributeValue?: string;
    stylePropertyNameAttributeValue?: string;
    items: ObjectItem[];
}

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { configMode, series, showLegend, style, title, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<LineChartSeries[]>([]);

    useEffect(() => {
        let allDataAvailable = true;

        const chartSeriesResult = series.reduce<LineChartSeries[]>((result, series) => {
            if (!allDataAvailable) {
                return result;
            }

            const { dataSource, interpolation, lineStyle, type } = series;

            let interpolationSetting: InterpolationPropType;

            if (configMode === "basic") {
                if (lineStyle === "straight") {
                    interpolationSetting = "linear";
                } else {
                    interpolationSetting = "catmullRom";
                }
            } else {
                interpolationSetting = interpolation;
            }

            if (dataSource.status !== ValueStatus.Available) {
                allDataAvailable = false;
                return result;
            }

            if (type === "static") {
                loadStaticSeries(result, allDataAvailable, series, interpolationSetting);
                return result;
            }

            const groupedDataSourceItems = groupDataSourceItems(series, allDataAvailable);
            loadDynamicSeries(result, allDataAvailable, series, interpolationSetting, groupedDataSourceItems);
            return result;
        }, []);

        if (allDataAvailable) {
            chartSeriesResult.reverse();
            setChartSeries(chartSeriesResult);
        }
    }, [series]);

    const convertToDataPoints = useCallback(
        (items: ObjectItem[], series: SeriesType, allDataAvailable: boolean): LineChartDataPoint[] => {
            const { xValue, yValue } = series;

            return items.reduce<LineChartDataPoint[]>((dataPointsResult, item) => {
                if (!allDataAvailable) {
                    return dataPointsResult;
                }

                const x = xValue(item);
                const y = yValue(item);

                if (x.status !== ValueStatus.Available || y.status !== ValueStatus.Available) {
                    allDataAvailable = false;
                    return dataPointsResult;
                }

                dataPointsResult.push({ x: Number(ensure(x.value).toFixed()), y: Number(ensure(y.value).toFixed()) });

                return dataPointsResult;
            }, []);
        },
        []
    );

    const loadStaticSeries = useCallback(
        (
            loadedSeries: LineChartSeries[],
            allDataAvailable: boolean,
            series: SeriesType,
            interpolation: InterpolationPropType
        ): void => {
            const { dataSource, seriesName } = series;

            if (seriesName && seriesName.status !== ValueStatus.Available) {
                allDataAvailable = false;
                return;
            }

            loadedSeries.push({
                dataPoints: convertToDataPoints(ensure(dataSource.items), series, allDataAvailable),
                interpolation,
                name: seriesName ? seriesName.value : undefined,
                stylePropertyName: series.stylePropertyName
            });
        },
        [convertToDataPoints]
    );

    const groupDataSourceItems = useCallback(
        (series: SeriesType, allDataAvailable: boolean): GroupedDataSourceItem[] => {
            const { dataSource, groupByAttribute, seriesNameAttribute, stylePropertyNameAttribute } = series;

            return ensure(dataSource.items).reduce<GroupedDataSourceItem[]>((dataSourceItemsResult, item) => {
                if (!allDataAvailable) {
                    return dataSourceItemsResult;
                }

                const groupByAttributeValue = ensure(groupByAttribute)(item);

                if (groupByAttributeValue.status !== ValueStatus.Available) {
                    allDataAvailable = false;
                    return dataSourceItemsResult;
                }

                const group = dataSourceItemsResult.find(group => {
                    if (groupByAttributeValue.value instanceof Date && group.groupByAttributeValue instanceof Date) {
                        return group.groupByAttributeValue.getTime() === ensure(groupByAttributeValue.value).getTime();
                    } else if (
                        groupByAttributeValue.value instanceof Big &&
                        group.groupByAttributeValue instanceof Big
                    ) {
                        return group.groupByAttributeValue.eq(ensure(groupByAttributeValue.value));
                    }
                    return group.groupByAttributeValue === groupByAttributeValue.value;
                });

                if (group) {
                    group.items.push(item);
                } else {
                    const seriesNameAttributeValue = ensure(seriesNameAttribute)(item);
                    const stylePropertyNameAttributeValue = ensure(stylePropertyNameAttribute)(item);

                    if (
                        stylePropertyNameAttributeValue.status !== ValueStatus.Available ||
                        seriesNameAttributeValue.status !== ValueStatus.Available
                    ) {
                        allDataAvailable = false;
                        return dataSourceItemsResult;
                    }

                    dataSourceItemsResult.push({
                        groupByAttributeValue: ensure(groupByAttributeValue.value),
                        seriesNameAttributeValue: seriesNameAttributeValue.value,
                        stylePropertyNameAttributeValue: stylePropertyNameAttributeValue.value,
                        items: [item]
                    });
                }

                return dataSourceItemsResult;
            }, []);
        },
        []
    );

    const loadDynamicSeries = useCallback(
        (
            loadedSeries: LineChartSeries[],
            allDataAvailable: boolean,
            series: SeriesType,
            interpolation: InterpolationPropType,
            groupedDataSourceItems: GroupedDataSourceItem[]
        ): void => {
            groupedDataSourceItems.forEach(itemGroup => {
                loadedSeries.push({
                    dataPoints: convertToDataPoints(itemGroup.items, series, allDataAvailable),
                    interpolation,
                    name: itemGroup.seriesNameAttributeValue,
                    stylePropertyName: itemGroup.stylePropertyNameAttributeValue
                });
            });
        },
        [convertToDataPoints]
    );

    return (
        <LineChartComponent
            series={chartSeries}
            style={styles}
            title={title?.value}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
        />
    );
}
