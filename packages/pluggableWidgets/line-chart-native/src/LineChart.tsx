import { createElement, ReactElement, useState, useEffect, useCallback } from "react";
import { all } from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";
import { InterpolationPropType } from "victory-core";

import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";

import { LineChartProps, SeriesType } from "../typings/LineChartProps";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { configMode, series, showLegend, style, title, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<Array<LineChartSeries>>([]);

    useEffect(() => {
        let allDataAvailable = true;

        const chartSeriesResult = series.reduce<Array<LineChartSeries>>((result, series) => {
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
        (items: Array<ObjectItem>, series: SeriesType, allDataAvailable: boolean): Array<LineChartDataPoint> => {
            const { xValue, yValue } = series;

            return items.reduce<Array<LineChartDataPoint>>((dataPointsResult, item) => {
                if (!allDataAvailable) {
                    return dataPointsResult;
                }

                const x = xValue(item);
                const y = yValue(item);

                if (x.status !== ValueStatus.Available || y.status !== ValueStatus.Available) {
                    allDataAvailable = false;
                    return dataPointsResult;
                }

                dataPointsResult.push({ x: Number(x.value!.toFixed()), y: Number(y.value!.toFixed()) });

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
                dataPoints: convertToDataPoints(dataSource.items!, series, allDataAvailable),
                interpolation,
                name: seriesName ? seriesName.value : undefined,
                stylePropertyName: series.stylePropertyName
            });
        },
        [convertToDataPoints]
    );

    const groupDataSourceItems = useCallback((series: SeriesType, allDataAvailable: boolean): Array<{
        groupByAttributeValue: string;
        seriesNameAttributeValue?: string;
        stylePropertyNameAttributeValue?: string;
        items: Array<ObjectItem>;
    }> => {
        const { dataSource, groupByAttribute, seriesNameAttribute, stylePropertyNameAttribute } = series;

        return dataSource.items!.reduce<
            Array<{
                groupByAttributeValue: string;
                seriesNameAttributeValue?: string;
                stylePropertyNameAttributeValue?: string;
                items: Array<ObjectItem>;
            }>
        >((dataSourceItemsResult, item) => {
            if (!allDataAvailable) {
                return dataSourceItemsResult;
            }

            const groupByAttributeValue = groupByAttribute!(item);

            if (groupByAttributeValue.status !== ValueStatus.Available) {
                allDataAvailable = false;
                return dataSourceItemsResult;
            }

            const group = dataSourceItemsResult.find(
                group => group.groupByAttributeValue === groupByAttributeValue.value
            );

            if (group) {
                group.items.push(item);
            } else {
                const seriesNameAttributeValue = seriesNameAttribute!(item);
                const stylePropertyNameAttributeValue = stylePropertyNameAttribute!(item);

                if (
                    stylePropertyNameAttributeValue.status !== ValueStatus.Available ||
                    seriesNameAttributeValue.status !== ValueStatus.Available
                ) {
                    allDataAvailable = false;
                    return dataSourceItemsResult;
                }

                dataSourceItemsResult.push({
                    groupByAttributeValue: groupByAttributeValue.value!,
                    seriesNameAttributeValue: seriesNameAttributeValue.value,
                    stylePropertyNameAttributeValue: stylePropertyNameAttributeValue.value,
                    items: [item]
                });
            }

            return dataSourceItemsResult;
        }, []);
    }, []);

    const loadDynamicSeries = useCallback(
        (
            loadedSeries: LineChartSeries[],
            allDataAvailable: boolean,
            series: SeriesType,
            interpolation: InterpolationPropType,
            groupedDataSourceItems: Array<{
                groupByAttributeValue: string;
                seriesNameAttributeValue?: string;
                stylePropertyNameAttributeValue?: string;
                items: Array<ObjectItem>;
            }>
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
