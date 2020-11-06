import { createElement, ReactElement, useMemo, useCallback, useState } from "react";
import { View, LayoutChangeEvent, Text } from "react-native";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis } from "victory-native";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { LineChartStyle } from "../ui/Styles";
import { Legend } from "./Legend";

export interface LineChartProps {
    series: LineChartSeries[];
    style: LineChartStyle;
    showLegend: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    warningPrefix?: string;
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
    const { series, showLegend, style, warningPrefix, xAxisLabel, yAxisLabel } = props;

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(series), [series]);

    const chartLines = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        return series.map((series, index) => {
            const { dataPoints, interpolation, lineStyle, stylePropertyName } = series;

            const seriesStyle = style.series && stylePropertyName ? style.series[stylePropertyName] : undefined;

            const displayMarker = seriesStyle?.markers?.display;

            if (
                displayMarker !== undefined &&
                !(displayMarker === "false" || displayMarker === "underneath" || displayMarker === "onTop")
            ) {
                console.warn(
                    `${warningMessagePrefix}nvalid value for series marker style property, display, valid values are "false", "underneath" and "onTop".`
                );
            }

            const markers =
                lineStyle === "lineWithMarkers" ||
                (lineStyle === "custom" && seriesStyle?.markers?.display && seriesStyle.markers.display !== "false") ? (
                    <VictoryScatter data={dataPoints} style={seriesStyle?.markers} size={seriesStyle?.markers?.size} />
                ) : undefined;

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
    }, [dataTypesResult, series, style, warningMessagePrefix]);

    const [firstSeries] = series;

    const axisLabelStyles = useMemo(() => {
        const [extractedXAxisLabelStyle, xAxisLabelStyle] = extractStyles(style.xAxisLabel, ["relativePositionGrid"]);
        const [extractedYAxisLabelStyle, yAxisLabelStyle] = extractStyles(style.yAxisLabel, ["relativePositionGrid"]);

        if (
            !(
                extractedXAxisLabelStyle.relativePositionGrid === "bottom" ||
                extractedXAxisLabelStyle.relativePositionGrid === "right"
            )
        ) {
            if (extractedXAxisLabelStyle.relativePositionGrid !== undefined) {
                console.warn(
                    `${warningMessagePrefix}nvalid value for X axis label style property, relativePositionGrid, valid values are "bottom" and "right".`
                );
            }

            extractedXAxisLabelStyle.relativePositionGrid = "bottom";
        }

        if (
            !(
                extractedYAxisLabelStyle.relativePositionGrid === "top" ||
                extractedYAxisLabelStyle.relativePositionGrid === "left"
            )
        ) {
            if (extractedYAxisLabelStyle.relativePositionGrid !== undefined) {
                console.warn(
                    `${warningMessagePrefix}nvalid value for Y axis label style property, relativePositionGrid, valid values are "top" and "left".`
                );
            }

            extractedYAxisLabelStyle.relativePositionGrid = "top";
        }

        return {
            extractedXAxisLabelStyle,
            xAxisLabelStyle,
            extractedYAxisLabelStyle,
            yAxisLabelStyle
        };
    }, [style, warningMessagePrefix]);

    const xAxisLabelComponent = xAxisLabel ? <Text style={axisLabelStyles.xAxisLabelStyle}>{xAxisLabel}</Text> : null;
    const yAxisLabelComponent = yAxisLabel ? <Text style={axisLabelStyles.yAxisLabelStyle}>{yAxisLabel}</Text> : null;

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
                    <View style={style.gridAndLabelsRow}>
                        {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "top"
                            ? yAxisLabelComponent
                            : null}
                        <View style={style.gridRow}>
                            {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "left"
                                ? yAxisLabelComponent
                                : null}

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

                            {axisLabelStyles.extractedXAxisLabelStyle.relativePositionGrid === "right"
                                ? xAxisLabelComponent
                                : null}
                        </View>
                        {axisLabelStyles.extractedXAxisLabelStyle.relativePositionGrid === "bottom"
                            ? xAxisLabelComponent
                            : null}
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
