import { createElement, ReactElement, useState, useEffect } from "react";
import { all } from "deepmerge";
import { ObjectItem, ValueStatus } from "mendix";
import { InterpolationPropType } from "victory-core";

import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";

import { LineChartProps } from "../typings/LineChartProps";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { configMode, series, showLegend, style, title, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<Array<LineChartSeries>>([]);

    useEffect(() => {
        setChartSeries(
            series
                .reduce<Array<LineChartSeries>>((result, series) => {
                    const {
                        dataSource,
                        groupByAttribute,
                        interpolation,
                        lineStyle,
                        seriesName,
                        seriesNameAttribute,
                        stylePropertyNameAttribute,
                        type,
                        xValue,
                        yValue
                    } = series;

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
                        result.push({
                            dataPoints: [],
                            interpolation: interpolationSetting,
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
                            interpolation: interpolationSetting,
                            name: seriesName?.value,
                            stylePropertyName: series.stylePropertyName
                        });
                        return result;
                    }

                    const groupedDataSourceItems = dataSource.items!.reduce<
                        Array<{
                            groupByAttributeValue: string;
                            seriesNameAttributeValue?: string;
                            stylePropertyNameAttributeValue?: string;
                            items: Array<ObjectItem>;
                        }>
                    >((result, item) => {
                        const groupByAttributeValue = groupByAttribute!(item);

                        if (groupByAttributeValue.status === ValueStatus.Available) {
                            const group = result.find(
                                group => group.groupByAttributeValue === groupByAttributeValue.value
                            );

                            if (group) {
                                group.items.push(item);
                            } else {
                                const seriesNameAttributeValue = seriesNameAttribute!(item);
                                const stylePropertyNameAttributeValue = stylePropertyNameAttribute!(item);
                                if (
                                    stylePropertyNameAttributeValue.status === ValueStatus.Available &&
                                    seriesNameAttributeValue.status === ValueStatus.Available
                                ) {
                                    result.push({
                                        groupByAttributeValue: groupByAttributeValue.value!,
                                        seriesNameAttributeValue: seriesNameAttributeValue.value,
                                        stylePropertyNameAttributeValue: stylePropertyNameAttributeValue.value,
                                        items: [item]
                                    });
                                }
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
                            interpolation: interpolationSetting, // TODO: use attribute
                            name: itemGroup.seriesNameAttributeValue,
                            stylePropertyName: itemGroup.stylePropertyNameAttributeValue // TODO: use attribute
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
            title={title?.value}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
        />
    );
}
