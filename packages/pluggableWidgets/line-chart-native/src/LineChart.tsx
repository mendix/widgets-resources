import { createElement, ReactElement, useState, useEffect } from "react";
import { all } from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";

import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";

import { LineChartProps } from "../typings/LineChartProps";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { series, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<Array<LineChartSeries>>([]);

    useEffect(() => {
        setChartSeries(
            series
                .reduce<Array<LineChartSeries>>((result, series) => {
                    const { dataSource, groupByAttribute, type, xValue, yValue } = series;

                    if (dataSource.status !== ValueStatus.Available) {
                        result.push({
                            dataPoints: [],
                            showMarkers: series.showMarkers,
                            interpolation: series.interpolation,
                            stylePropertyName: series.stylePropertyName
                        });
                        return result;
                    }

                    if (type === "static") {
                        result.push({
                            dataPoints: dataSource.items!.reduce<Array<LineChartDataPoint>>((result, item) => {
                                const x = xValue(item);
                                const y = yValue(item);
                                if (x.status === ValueStatus.Available && y.status === ValueStatus.Available) {
                                    // Maybe don't render series at all when one of the datapoints isn't available
                                    result.push({ x: Number(x.value!.toFixed()), y: Number(y.value!.toFixed()) });
                                }
                                return result;
                            }, []),
                            showMarkers: series.showMarkers,
                            interpolation: series.interpolation,
                            stylePropertyName: series.stylePropertyName
                        });
                        return result;
                    }

                    const groupedDataSourceItems = dataSource.items!.reduce<
                        Array<{ groupByAttributeValue: string; items: Array<ObjectItem> }>
                    >((result, item) => {
                        const groupByAttributeValue = groupByAttribute!(item);
                        if (groupByAttributeValue.status === ValueStatus.Available) {
                            const group = result.find(
                                group => group.groupByAttributeValue === groupByAttributeValue.value
                            );

                            if (group) {
                                group.items.push(item);
                            } else {
                                result.push({ groupByAttributeValue: groupByAttributeValue.value!, items: [item] });
                            }

                            return result;
                        }

                        return result;
                    }, []);

                    groupedDataSourceItems.forEach(itemGroup => {
                        result.push({
                            dataPoints: itemGroup.items.reduce<Array<LineChartDataPoint>>((result, item) => {
                                const x = xValue(item);
                                const y = yValue(item);
                                if (x.status === ValueStatus.Available && y.status === ValueStatus.Available) {
                                    // Maybe don't render series at all when one of the datapoints isn't available
                                    result.push({ x: Number(x.value!.toFixed()), y: Number(y.value!.toFixed()) });
                                }
                                return result;
                            }, []),
                            showMarkers: series.showMarkers, // TODO: use attribute
                            interpolation: series.interpolation, // TODO: use attribute
                            stylePropertyName: series.stylePropertyName // TODO: use attribute
                        });
                    });

                    // 1. group data by group attr
                    // 2. get serie group value
                    // 3. check existing groups
                    // 4. drop dss item in array of group
                    // 5. For each array create a line chart series and push onto the chartSeries array

                    // How are you going to deal with styles? Have a special attribute that contains the style property name.

                    return result;
                }, [])
                .reverse()
        );
    }, [series]);

    return (
        <LineChartComponent
            series={chartSeries}
            style={styles}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
        />
    );
}
