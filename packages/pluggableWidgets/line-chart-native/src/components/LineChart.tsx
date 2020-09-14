import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";

import { LineChartStyle } from "../ui/Styles";
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
    const { series, showLegend, style, title, xAxisLabel, yAxisLabel } = props;

    if (series.length === 0) {
        return null;
    }

    const chartLines = useMemo(
        () =>
            series.map((series, index) => {
                const seriesStyle =
                    style.series && series.stylePropertyName ? style.series[series.stylePropertyName] : undefined;

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
        [series, style]
    );

    return (
        <View style={style.container}>
            {title ? <Text style={style.title}>{title}</Text> : null}
            <VictoryChart padding={style.chart?.padding} style={style.chart}>
                <VictoryAxis
                    style={style.xAxis}
                    axisLabelComponent={
                        xAxisLabel ? (
                            <VictoryLabel dy={style.xAxis?.axisLabel?.verticalOffset} /> // expose styles
                        ) : (
                            undefined
                        )
                    }
                    label={xAxisLabel}
                />
                <VictoryAxis
                    dependentAxis
                    style={style.yAxis}
                    axisLabelComponent={
                        yAxisLabel ? (
                            <VictoryLabel dy={style.yAxis?.axisLabel?.horizontalOffset} /> // exppose styles
                        ) : (
                            undefined
                        )
                    }
                    label={yAxisLabel}
                />
                {chartLines}
            </VictoryChart>
            {showLegend ? <Legend style={style} series={series} /> : null}
        </View>
    );
}
