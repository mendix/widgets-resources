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

interface DataLoadingStatus {
    dataAvailable: boolean;
}

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { series, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<LineChartSeries[]>([]);

    const convertToDataPoints = useCallback(
        (items: ObjectItem[], series: SeriesType, dataLoadingStatus: DataLoadingStatus): LineChartDataPoint[] => {
            const { xValue, yValue } = series;

            return items.reduce<LineChartDataPoint[]>((dataPointsResult, item) => {
                if (!dataLoadingStatus.dataAvailable) {
                    return dataPointsResult;
                }

                const x = xValue(item);
                const y = yValue(item);

                if (x.status !== ValueStatus.Available || y.status !== ValueStatus.Available) {
                    dataLoadingStatus.dataAvailable = false;
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
            dataLoadingStatus: DataLoadingStatus,
            series: SeriesType,
            interpolation: InterpolationPropType
        ): void => {
            const { dataSource, seriesName } = series;

            if (seriesName && seriesName.status !== ValueStatus.Available) {
                dataLoadingStatus.dataAvailable = false;
                return;
            }

            loadedSeries.push({
                dataPoints: convertToDataPoints(ensure(dataSource.items), series, dataLoadingStatus),
                interpolation,
                name: seriesName ? seriesName.value : undefined,
                stylePropertyName: series.stylePropertyName
            });
        },
        [convertToDataPoints]
    );

    const groupDataSourceItems = useCallback(
        (series: SeriesType, dataLoadingStatus: DataLoadingStatus): GroupedDataSourceItem[] => {
            const { dataSource, groupByAttribute, seriesNameAttribute, stylePropertyNameAttribute } = series;

            return ensure(dataSource.items).reduce<GroupedDataSourceItem[]>((dataSourceItemsResult, item) => {
                if (!dataLoadingStatus.dataAvailable) {
                    return dataSourceItemsResult;
                }

                const groupByAttributeValue = ensure(groupByAttribute)(item);

                if (groupByAttributeValue.status !== ValueStatus.Available) {
                    dataLoadingStatus.dataAvailable = false;
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
                        dataLoadingStatus.dataAvailable = false;
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
            dataLoadingStatus: DataLoadingStatus,
            series: SeriesType,
            interpolation: InterpolationPropType,
            groupedDataSourceItems: GroupedDataSourceItem[]
        ): void => {
            groupedDataSourceItems.forEach(itemGroup => {
                loadedSeries.push({
                    dataPoints: convertToDataPoints(itemGroup.items, series, dataLoadingStatus),
                    interpolation,
                    name: itemGroup.seriesNameAttributeValue,
                    stylePropertyName: itemGroup.stylePropertyNameAttributeValue
                });
            });
        },
        [convertToDataPoints]
    );

    useEffect(() => {
        const dataLoadingStatus: DataLoadingStatus = { dataAvailable: true };

        const chartSeriesResult = series.reduce<LineChartSeries[]>((result, series) => {
            if (!dataLoadingStatus.dataAvailable) {
                return result;
            }

            const { dataSource, interpolation, type } = series;

            if (dataSource.status !== ValueStatus.Available) {
                dataLoadingStatus.dataAvailable = false;
                return result;
            }

            if (type === "static") {
                loadStaticSeries(result, dataLoadingStatus, series, interpolation);
                return result;
            }

            const groupedDataSourceItems = groupDataSourceItems(series, dataLoadingStatus);
            loadDynamicSeries(result, dataLoadingStatus, series, interpolation, groupedDataSourceItems);
            return result;
        }, []);

        if (dataLoadingStatus.dataAvailable) {
            chartSeriesResult.reverse();
            setChartSeries(chartSeriesResult);
        }
    }, [series, loadStaticSeries, groupDataSourceItems, loadDynamicSeries, setChartSeries]);

    return (xAxisLabel?.status === ValueStatus.Loading && !xAxisLabel.value) ||
        (yAxisLabel?.status === ValueStatus.Loading && !yAxisLabel.value) ? null : (
        <LineChartComponent
            series={chartSeries}
            style={styles}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
        />
    );
}
