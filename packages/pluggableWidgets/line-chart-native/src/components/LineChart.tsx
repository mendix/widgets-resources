import { createElement, ReactElement, useMemo } from "react";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";

import { LineChartStyle } from "../ui/Styles";
import { Text, View } from "react-native";
import { Legend } from "./Legend";

export interface LineChartProps {
    series: Array<LineChartSeries>;
    style: LineChartStyle;
    title?: string;
    showLegend: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export interface LineChartSeries {
    dataPoints: Array<LineChartDataPoint>;
    interpolation: InterpolationPropType;
    name?: string;
    stylePropertyName?: string;
}

export interface LineChartDataPoint {
    x: number;
    y: number;
}

export function LineChart(props: LineChartProps): ReactElement | null {
    if (props.series.length === 0) {
        return null;
    }

    const chartLines = useMemo(
        () =>
            props.series.map((series, index) => {
                const seriesStyle =
                    props.style.series && series.stylePropertyName
                        ? props.style.series[series.stylePropertyName]
                        : undefined;

                const markers =
                    seriesStyle?.markers?.display !== "false" ? (
                        <VictoryScatter
                            data={series.dataPoints}
                            style={seriesStyle?.markers}
                            size={seriesStyle?.markers?.size}
                        />
                    ) : (
                        undefined
                    );

                return (
                    <VictoryGroup key={index}>
                        {markers && seriesStyle?.markers?.display === "underneath" ? markers : null}
                        <VictoryLine
                            style={seriesStyle?.line}
                            data={series.dataPoints}
                            interpolation={series.interpolation}
                        />
                        {markers && seriesStyle?.markers?.display === "onTop" ? markers : null}
                    </VictoryGroup>
                );
            }),
        [props.series, props.style]
    );

    return (
        <View style={props.style.container}>
            {props.title ? <Text style={props.style.title}>{props.title}</Text> : null}
            <VictoryChart padding={props.style.chart?.padding}>
                <VictoryAxis
                    style={props.style.xAxis}
                    axisLabelComponent={
                        props.xAxisLabel ? (
                            <VictoryLabel dy={props.style.xAxis?.axisLabel?.verticalOffset} />
                        ) : (
                            undefined
                        )
                    }
                    label={props.xAxisLabel}
                />
                <VictoryAxis
                    dependentAxis
                    style={props.style.yAxis}
                    axisLabelComponent={
                        props.yAxisLabel ? (
                            <VictoryLabel dy={props.style.yAxis?.axisLabel?.horizontalOffset} />
                        ) : (
                            undefined
                        )
                    }
                    label={props.yAxisLabel}
                />
                {chartLines}
            </VictoryChart>
            {props.showLegend ? <Legend style={props.style} series={props.series} /> : null}
        </View>
    );
}
