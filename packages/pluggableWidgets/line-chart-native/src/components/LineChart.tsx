import { createElement, ReactElement, useMemo } from "react";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";

import { LineChartStyle } from "../ui/Styles";

export interface LineChartProps {
    series: Array<LineChartSeries>;
    style: LineChartStyle;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export interface LineChartSeries {
    dataPoints: Array<LineChartDataPoint>;
    showMarkers: "false" | "underneath" | "onTop";
    interpolation: InterpolationPropType;
    stylePropertyName: string;
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
                const seriesStyle = props.style.series ? props.style.series[series.stylePropertyName] : undefined;

                const markers = (
                    <VictoryScatter
                        data={series.dataPoints}
                        style={seriesStyle?.markers}
                        size={seriesStyle?.markers?.size}
                    />
                );

                return (
                    <VictoryGroup key={index}>
                        {series.showMarkers === "underneath" ? markers : null}
                        <VictoryLine
                            style={seriesStyle?.line}
                            data={series.dataPoints}
                            interpolation={series.interpolation}
                        />
                        {series.showMarkers === "onTop" ? markers : null}
                    </VictoryGroup>
                );
            }),
        [props.series, props.style]
    );

    return (
        <VictoryChart padding={props.style.chart?.padding}>
            <VictoryAxis
                style={props.style.xAxis}
                axisLabelComponent={
                    props.xAxisLabel ? <VictoryLabel dy={props.style.xAxis?.axisLabel?.verticalOffset} /> : undefined
                }
                label={props.xAxisLabel}
            />
            <VictoryAxis
                dependentAxis
                style={props.style.yAxis}
                axisLabelComponent={
                    props.yAxisLabel ? <VictoryLabel dy={props.style.yAxis?.axisLabel?.horizontalOffset} /> : undefined
                }
                label={props.yAxisLabel}
            />
            {chartLines}
        </VictoryChart>
    );
}
