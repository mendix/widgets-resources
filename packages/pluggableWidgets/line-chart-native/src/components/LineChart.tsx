import { createElement, ReactElement, useMemo, useCallback, useState } from "react";
import { View, LayoutChangeEvent, Text } from "react-native";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis } from "victory-native";

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
    dataPoints: LineChartDataPoints;
    xFormatter?: (xValue: number | Date) => string;
    yFormatter?: (yValue: number | Date) => string;
    interpolation: InterpolationPropType;
    name?: string;
    lineStyle: "line" | "lineWithMarkers" | "custom";
    stylePropertyName?: string;
}

export type LineChartDataPoints =
    | Array<LineChartDataPoint<number, number>>
    | Array<LineChartDataPoint<number, Date>>
    | Array<LineChartDataPoint<Date, number>>
    | Array<LineChartDataPoint<Date, Date>>;

export interface LineChartDataPoint<X extends number | Date, Y extends number | Date> {
    x: X;
    y: Y;
}

export function LineChart(props: LineChartProps): ReactElement | null {
    const { series, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const dataTypesResult = useMemo(() => getDataTypes(series), [series]);

    const chartLines = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        return series.map((series, index) => {
            const { dataPoints, interpolation, lineStyle, stylePropertyName } = series;

            const seriesStyle = style.series && stylePropertyName ? style.series[stylePropertyName] : undefined;

            const markers =
                lineStyle === "lineWithMarkers" ||
                (lineStyle === "custom" && seriesStyle?.markers?.display && seriesStyle.markers.display !== "false") ? (
                    <VictoryScatter data={dataPoints} style={seriesStyle?.markers} size={seriesStyle?.markers?.size} />
                ) : (
                    undefined
                );

            return (
                <VictoryGroup key={index}>
                    {markers && seriesStyle?.markers?.display === "underneath" ? markers : null}
                    <VictoryLine style={seriesStyle?.line} data={dataPoints} interpolation={interpolation} />
                    {markers && (!seriesStyle?.markers?.display || seriesStyle?.markers?.display !== "underneath")
                        ? markers
                        : null}
                </VictoryGroup>
            );
        });
    }, [dataTypesResult, series, style]);

    const [firstSeries] = series;

    let xAxisLabelStyle;
    let yAxisLabelStyle;
    let xAxisLabelRelativePositionGrid;
    let yAxisLabelRelativePositionGrid;

    if (style.xAxisLabel?.relativePositionGrid) {
        const { relativePositionGrid: _xAxisLabelRelativePositionGrid, ..._xAxisLabelStyle } = style.xAxisLabel;
        xAxisLabelStyle = _xAxisLabelStyle;
        xAxisLabelRelativePositionGrid = _xAxisLabelRelativePositionGrid;
    } else {
        xAxisLabelStyle = style.xAxisLabel;
        xAxisLabelRelativePositionGrid = "bottom";
    }

    if (style.yAxisLabel?.relativePositionGrid) {
        const { relativePositionGrid: _yAxisLabelRelativePositionGrid, ..._yAxisLabelStyle } = style.yAxisLabel;
        yAxisLabelStyle = _yAxisLabelStyle;
        yAxisLabelRelativePositionGrid = _yAxisLabelRelativePositionGrid;
    } else {
        yAxisLabelStyle = style.yAxisLabel;
        yAxisLabelRelativePositionGrid = "top";
    }

    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const updateChartDimensions = useCallback(
        (event: LayoutChangeEvent) => {
            const { height, width } = event.nativeEvent.layout;
            setChartDimensions({ height, width });
        },
        [setChartDimensions]
    );

    return (
        <View style={style.container}>
            {dataTypesResult instanceof Error ? (
                <Text>{dataTypesResult.message}</Text>
            ) : (
                <View style={style.chart}>
                    <View style={style.gridLabelCol}>
                        {yAxisLabel && yAxisLabelRelativePositionGrid === "top" ? (
                            <Text style={yAxisLabelStyle}>{yAxisLabel}</Text>
                        ) : null}
                        <View style={style.gridRow}>
                            {yAxisLabel && yAxisLabelRelativePositionGrid === "left" ? (
                                <Text style={yAxisLabelStyle}>{yAxisLabel}</Text>
                            ) : null}

                            <View onLayout={updateChartDimensions} style={{ flex: 1 }}>
                                {chartDimensions ? (
                                    <VictoryChart
                                        height={chartDimensions?.height}
                                        width={chartDimensions?.width}
                                        padding={style.grid?.padding}
                                        scale={
                                            dataTypesResult
                                                ? {
                                                      x: dataTypesResult.x === "number" ? "linear" : "time",
                                                      y: dataTypesResult.y === "number" ? "linear" : "time"
                                                  }
                                                : undefined
                                        }
                                        style={style.grid}
                                    >
                                        <VictoryAxis
                                            style={style.grid?.xAxis}
                                            orientation={"bottom"}
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={style.grid?.yAxis}
                                            orientation={"left"}
                                            {...(firstSeries.yFormatter
                                                ? { tickFormat: firstSeries.yFormatter }
                                                : undefined)}
                                        />
                                        {chartLines}
                                    </VictoryChart>
                                ) : null}
                            </View>

                            {xAxisLabel && xAxisLabelRelativePositionGrid === "right" ? (
                                <Text style={xAxisLabelStyle}>{xAxisLabel}</Text>
                            ) : null}
                        </View>
                        {xAxisLabel && xAxisLabelRelativePositionGrid === "bottom" ? (
                            <Text style={xAxisLabelStyle}>{xAxisLabel}</Text>
                        ) : null}
                    </View>

                    {showLegend ? <Legend style={style} series={series} /> : null}
                </View>
            )}
        </View>
    );
}

function getDataTypes(series: LineChartSeries[]): { x: string; y: string } | Error | undefined {
    let dataTypes: { x: string; y: string } | undefined;

    for (const element of series) {
        const { dataPoints } = element;

        if (dataPoints.length > 0) {
            const { x, y } = dataPoints[0];
            const xDataType = typeof x;
            const yDataType = typeof y;

            if (!dataTypes) {
                dataTypes = { x: xDataType, y: yDataType };
            } else if (dataTypes && (dataTypes.x !== xDataType || dataTypes.y !== yDataType)) {
                return new Error("Data types of data points belonging to different series aren't equal");
            }
        }
    }
    return dataTypes;
}
