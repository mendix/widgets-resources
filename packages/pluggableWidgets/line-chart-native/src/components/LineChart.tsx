import { createElement, ReactElement, useMemo, useCallback, useState } from "react";
import { View, LayoutChangeEvent, Text } from "react-native";
import { InterpolationPropType } from "victory-core";
import { VictoryChart, VictoryLine, VictoryGroup, VictoryScatter, VictoryAxis } from "victory-native";

import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { Legend } from "./Legend";
import { LineChartStyle } from "../ui/Styles";
import {
    mapToAxisStyle,
    mapToGridStyle,
    mapToLineStyle,
    mapToMarkerStyle,
    aggregateGridPadding
} from "../utils/StyleUtils";

export interface LineChartProps {
    lines: LineChartSeries[];
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
    customLineStyle?: string;
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
    const { lines, showLegend, style, warningPrefix, xAxisLabel, yAxisLabel } = props;

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(lines), [lines]);

    // Line Chart user-styling may be missing for certain series. A palette is passed, any missing line colours
    // fallback to a colour from the palette.
    const normalizedLineColors: string[] = useMemo(() => {
        const lineColorPalette = style.lines?.lineColorPalette?.split(";");
        let lineColorPaletteIndex = 0;

        return lines.map(_series => {
            const configuredStyle = !_series.customLineStyle
                ? null
                : style.lines?.customLineStyles?.[_series.customLineStyle]?.line?.lineColor;

            if (typeof configuredStyle !== "string") {
                const lineColor = lineColorPalette?.[lineColorPaletteIndex] || "black";

                if (lineColorPalette) {
                    const indexIncrement = lineColorPaletteIndex + 1;
                    lineColorPaletteIndex = indexIncrement === lineColorPalette.length ? 0 : indexIncrement;
                }

                return lineColor;
            }

            return configuredStyle;
        });
    }, [lines, style]);

    const chartLines = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        return lines.map((series, index) => {
            const { dataPoints, interpolation, lineStyle, customLineStyle } = series;

            const seriesStyle =
                style.lines?.customLineStyles && customLineStyle
                    ? style.lines.customLineStyles[customLineStyle]
                    : undefined;

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
                    <VictoryScatter
                        data={dataPoints}
                        style={mapToMarkerStyle(seriesStyle?.markers)}
                        size={seriesStyle?.markers?.size}
                        symbol={seriesStyle?.markers?.symbol}
                    />
                ) : undefined;

            return (
                <VictoryGroup key={index}>
                    {markers && seriesStyle?.markers?.display === "underneath" ? markers : null}
                    <VictoryLine
                        style={mapToLineStyle(seriesStyle?.line)}
                        data={dataPoints}
                        interpolation={interpolation}
                    />
                    {markers && (!seriesStyle?.markers?.display || seriesStyle?.markers?.display !== "underneath")
                        ? markers
                        : null}
                </VictoryGroup>
            );
        });
    }, [dataTypesResult, lines, style, warningMessagePrefix]);

    const [firstSeries] = lines;

    const axisLabelStyles = useMemo(() => {
        const [extractedXAxisLabelStyle, xAxisLabelStyle] = extractStyles(style.xAxis?.label, ["relativePositionGrid"]);
        const [extractedYAxisLabelStyle, yAxisLabelStyle] = extractStyles(style.yAxis?.label, ["relativePositionGrid"]);

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
                <Text style={style.errorMessage}>{dataTypesResult.message}</Text>
            ) : (
                <View style={style.chart}>
                    <View style={{ flex: 1 }}>
                        {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "top"
                            ? yAxisLabelComponent
                            : null}
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "left"
                                ? yAxisLabelComponent
                                : null}

                            <View onLayout={updateChartDimensions} style={{ flex: 1 }}>
                                {chartDimensions ? (
                                    <VictoryChart
                                        height={chartDimensions?.height}
                                        width={chartDimensions?.width}
                                        padding={aggregateGridPadding(style.grid)}
                                        scale={
                                            dataTypesResult
                                                ? {
                                                      x: dataTypesResult.x === "number" ? "linear" : "time",
                                                      y: dataTypesResult.y === "number" ? "linear" : "time"
                                                  }
                                                : undefined
                                        }
                                        style={mapToGridStyle(style.grid)}
                                    >
                                        <VictoryAxis
                                            style={mapToAxisStyle(style.grid, style.xAxis)}
                                            orientation={"bottom"}
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={mapToAxisStyle(style.grid, style.yAxis)}
                                            orientation={"left"}
                                            {...(firstSeries.yFormatter
                                                ? { tickFormat: firstSeries.yFormatter }
                                                : undefined)}
                                        />
                                        <VictoryGroup colorScale={normalizedLineColors}>{chartLines}</VictoryGroup>
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

                    {showLegend ? (
                        <Legend style={style.legend} items={lines} itemColors={normalizedLineColors} />
                    ) : null}
                </View>
            )}
        </View>
    );
}

type DataTypeResult = { x: string; y: string };

function getDataTypes(series: LineChartSeries[]): DataTypeResult | Error | undefined {
    let dataTypes: DataTypeResult | undefined;

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
