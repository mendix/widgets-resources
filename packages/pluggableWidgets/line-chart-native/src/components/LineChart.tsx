import { createElement, ReactElement, useMemo, useCallback, useState, Fragment } from "react";
import { View, LayoutChangeEvent, Text } from "react-native";
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
                (lineStyle === "custom" && seriesStyle?.markers?.display !== "false") ? (
                    <VictoryScatter data={dataPoints} style={seriesStyle?.markers} size={seriesStyle?.markers?.size} />
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
        });
    }, [dataTypesResult, series, style]);

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
                <Fragment>
                    <View onLayout={updateChartDimensions} style={{ flex: 1 }}>
                        {chartDimensions ? (
                            <VictoryChart
                                height={chartDimensions?.height}
                                width={chartDimensions?.width}
                                padding={style.chart?.padding}
                                scale={
                                    dataTypesResult
                                        ? {
                                              x: dataTypesResult.x === "number" ? "linear" : "time",
                                              y: dataTypesResult.y === "number" ? "linear" : "time"
                                          }
                                        : undefined
                                }
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
                                    orientation={"bottom"}
                                    {...(series[0]?.xFormatter ? { tickFormat: series[0].xFormatter } : undefined)}
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
                                    orientation={"left"}
                                    {...(series[0]?.yFormatter ? { tickFormat: series[0].yFormatter } : undefined)}
                                />
                                {chartLines}
                            </VictoryChart>
                        ) : null}
                    </View>

                    {showLegend ? <Legend style={style} series={series} /> : null}
                </Fragment>
            )}
        </View>
    );
}

function getDataTypes(series: LineChartSeries[]): { x: string; y: string } | Error | undefined {
    let dataTypes: { x: string; y: string } | undefined;

    for (const element of series) {
        const { dataPoints } = element;

        if (dataPoints.length > 0) {
            const xDataType = typeof dataPoints[0].x;
            const yDataType = typeof dataPoints[0].y;

            if (!dataTypes) {
                dataTypes = { x: xDataType, y: yDataType };
            } else if (dataTypes && (dataTypes.x !== xDataType || dataTypes.y !== yDataType)) {
                return new Error("Data types of data points belonging to different series aren't equal");
            }
        }
    }
    return dataTypes;
}
