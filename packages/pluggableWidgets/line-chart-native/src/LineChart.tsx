import { createElement, ReactElement, useState, useEffect, useCallback } from "react";
import { Big } from "big.js";
import { all } from "deepmerge";
import { ObjectItem, ListAttributeValue, ValueStatus } from "mendix";
import { InterpolationPropType } from "victory-core";

import { ensure } from "@mendix/pluggable-widgets-tools";

import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";

import { LineChartProps, SeriesType } from "../typings/LineChartProps";

interface DataSourceItemGroup {
    groupByAttributeValue: string | boolean | Date | Big;
    dynamicSeriesNameValue?: string;
    dynamicStylePropertyNameValue?: string;
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
            let xValue: ListAttributeValue<BigJs.Big>;
            let yValue: ListAttributeValue<BigJs.Big>;

            if (series.type === "static") {
                xValue = ensure(series.staticXValue);
                yValue = ensure(series.staticYValue);
            } else {
                xValue = ensure(series.dynamicXValue);
                yValue = ensure(series.dynamicYValue);
            }

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
            const { staticDataSource, staticSeriesName, staticStylePropertyName } = series;

            if (staticSeriesName && staticSeriesName.status !== ValueStatus.Available) {
                dataLoadingStatus.dataAvailable = false;
                return;
            }

            loadedSeries.push({
                dataPoints: convertToDataPoints(ensure(ensure(staticDataSource).items), series, dataLoadingStatus),
                interpolation,
                name: staticSeriesName ? staticSeriesName.value : undefined,
                stylePropertyName: staticStylePropertyName
            });
        },
        [convertToDataPoints]
    );

    const groupDataSourceItems = useCallback(
        (series: SeriesType, dataLoadingStatus: DataLoadingStatus): DataSourceItemGroup[] => {
            const { dynamicDataSource, dynamicSeriesName, groupByAttribute, dynamicStylePropertyName } = series;

            return ensure(ensure(dynamicDataSource).items).reduce<DataSourceItemGroup[]>(
                (dataSourceItemGroupsResult, item) => {
                    if (!dataLoadingStatus.dataAvailable) {
                        return dataSourceItemGroupsResult;
                    }

                    const groupByAttributeValue = ensure(groupByAttribute)(item);

                    if (groupByAttributeValue.status !== ValueStatus.Available) {
                        dataLoadingStatus.dataAvailable = false;
                        return dataSourceItemGroupsResult;
                    }

                    const group = dataSourceItemGroupsResult.find(group => {
                        if (
                            groupByAttributeValue.value instanceof Date &&
                            group.groupByAttributeValue instanceof Date
                        ) {
                            return (
                                group.groupByAttributeValue.getTime() === ensure(groupByAttributeValue.value).getTime()
                            );
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
                        const newDataSourceItemGroup: DataSourceItemGroup = {
                            groupByAttributeValue: ensure(groupByAttributeValue.value),
                            items: [item]
                        };

                        if (dynamicSeriesName) {
                            const dynamicSeriesNameValue = dynamicSeriesName(item);

                            if (dynamicSeriesNameValue.status !== ValueStatus.Available) {
                                dataLoadingStatus.dataAvailable = false;
                                return dataSourceItemGroupsResult;
                            }

                            newDataSourceItemGroup.dynamicSeriesNameValue = dynamicSeriesNameValue.value;
                        }

                        if (dynamicStylePropertyName) {
                            const stylePropertyNameAttributeValue = dynamicStylePropertyName(item);

                            if (stylePropertyNameAttributeValue.status !== ValueStatus.Available) {
                                dataLoadingStatus.dataAvailable = false;
                                return dataSourceItemGroupsResult;
                            }

                            newDataSourceItemGroup.dynamicStylePropertyNameValue =
                                stylePropertyNameAttributeValue.value;
                        }

                        dataSourceItemGroupsResult.push(newDataSourceItemGroup);
                    }

                    return dataSourceItemGroupsResult;
                },
                []
            );
        },
        []
    );

    const loadDynamicSeries = useCallback(
        (
            loadedSeries: LineChartSeries[],
            dataLoadingStatus: DataLoadingStatus,
            series: SeriesType,
            interpolation: InterpolationPropType,
            dataSourceItemGroups: DataSourceItemGroup[]
        ): void => {
            dataSourceItemGroups.forEach(itemGroup => {
                loadedSeries.push({
                    dataPoints: convertToDataPoints(itemGroup.items, series, dataLoadingStatus),
                    interpolation,
                    name: itemGroup.dynamicSeriesNameValue,
                    stylePropertyName: itemGroup.dynamicStylePropertyNameValue
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

            const { staticDataSource, dynamicDataSource, interpolation, type } = series;

            if (type === "static") {
                if (ensure(staticDataSource).status !== ValueStatus.Available) {
                    dataLoadingStatus.dataAvailable = false;
                    return result;
                }

                loadStaticSeries(result, dataLoadingStatus, series, interpolation);
                return result;
            }

            if (ensure(dynamicDataSource).status !== ValueStatus.Available) {
                dataLoadingStatus.dataAvailable = false;
                return result;
            }

            const dataSourceItemGroups = groupDataSourceItems(series, dataLoadingStatus);
            loadDynamicSeries(result, dataLoadingStatus, series, interpolation, dataSourceItemGroups);
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
