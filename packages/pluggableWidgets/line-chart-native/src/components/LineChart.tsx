import { createElement, ReactElement, useMemo, useCallback, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";

import { LineChartStyle } from "../ui/Styles";
import { Legend } from "./Legend";

export interface LineChartProps {
    series: LineChartSeries[];
    style: LineChartStyle;
    showLegend: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export interface LineChartSeries {
    dataPoints: LineChartDataPoint[];
    interpolation: InterpolationPropType;
    name?: string;
    lineStyle: "line" | "lineWithMarkers" | "custom";
    stylePropertyName?: string;
}

export interface LineChartDataPoint {
    x: number;
    y: number;
}

export function LineChart(props: LineChartProps): ReactElement | null {
    const { series, showLegend, style, xAxisLabel, yAxisLabel } = props;

    if (series.length === 0) {
        return null;
    }

    const chartLines = useMemo(
        () =>
            series.map((series, index) => {
                const { dataPoints, interpolation, lineStyle, stylePropertyName } = series;

                const seriesStyle = style.series && stylePropertyName ? style.series[stylePropertyName] : undefined;

                const markers =
                    lineStyle === "lineWithMarkers" ||
                    (lineStyle === "custom" && seriesStyle?.markers?.display !== "false") ? (
                        <VictoryScatter
                            data={dataPoints}
                            style={seriesStyle?.markers}
                            size={seriesStyle?.markers?.size}
                        />
                    ) : (
                        undefined
                    );

                return (
                    <VictoryGroup key={index}>
                        {markers && (!seriesStyle?.markers?.display || seriesStyle.markers.display !== "onTop")
                            ? markers
                            : null}
                        <VictoryLine style={seriesStyle?.line} data={dataPoints} interpolation={interpolation} />
                        {markers && seriesStyle?.markers?.display === "onTop" ? markers : null}
                    </VictoryGroup>
                );
            }),
        [series, style]
    );

    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const updateChartDimensions = useCallback((event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        setChartDimensions({ height, width });
    }, []);

    return (
        <View style={style.container}>
            <View onLayout={updateChartDimensions} style={{ flex: 1 }}>
                {chartDimensions ? (
                    <VictoryChart
                        height={chartDimensions?.height}
                        width={chartDimensions?.width}
                        padding={style.chart?.padding}
                        style={style.chart}
                    >
                        <VictoryAxis
                            style={style.xAxis}
                            axisLabelComponent={
                                xAxisLabel ? (
                                    <VictoryLabel
                                        dx={style.xAxis?.axisLabel?.horizontalOffset}
                                        dy={style.xAxis?.axisLabel?.verticalOffset}
                                    />
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
                                    <VictoryLabel
                                        dx={style.yAxis?.axisLabel?.verticalOffset}
                                        dy={style.yAxis?.axisLabel?.horizontalOffset}
                                    />
                                ) : (
                                    undefined
                                )
                            }
                            label={yAxisLabel}
                        />
                        {chartLines}
                    </VictoryChart>
                ) : null}
            </View>

            {showLegend ? <Legend style={style} series={series} /> : null}
        </View>
    );
}
