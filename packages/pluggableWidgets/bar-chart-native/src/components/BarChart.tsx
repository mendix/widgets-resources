import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory-native";
import { BarProps } from "victory-bar";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { BarChartStyle } from "../ui/Styles";
import { SortOrderEnum } from "../../typings/BarChartProps";
import { Legend } from "./Legend";
import { mapToAxisStyle, mapToBarLabelStyle, mapToBarStyle, mapToGridStyle } from "../utils/StyleMappers";

export interface BarChartProps {
    series: BarChartSeries[];
    sortOrder: SortOrderEnum;
    style: BarChartStyle;
    presentation: string;
    showLegend: boolean;
    showLabels: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    warningPrefix?: string;
}

export interface BarChartSeries {
    dataPoints: BarDataPoints;
    xFormatter?: (xValue: number | Date | string) => string;
    yFormatter?: (yValue: number | Date | string) => string;
    name?: string;
    customBarStyle?: string;
}

export type BarDataPoints =
    | Array<BarDataPoint<number, number>>
    | Array<BarDataPoint<number, Date>>
    | Array<BarDataPoint<Date, number>>
    | Array<BarDataPoint<Date, Date>>
    | Array<BarDataPoint<string, string>>
    | Array<BarDataPoint<string, number>>
    | Array<BarDataPoint<string, Date>>
    | Array<BarDataPoint<number, string>>
    | Array<BarDataPoint<Date, string>>;

export interface BarDataPoint<X extends number | Date | string, Y extends number | Date | string> {
    x: X;
    y: Y;
}

export function BarChart({
    presentation,
    series,
    showLabels,
    xAxisLabel,
    yAxisLabel,
    showLegend,
    sortOrder,
    style,
    warningPrefix
}: BarChartProps): ReactElement | null {
    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(series), [series]);

    // Bar Chart user-styling may be missing for certain series. A palette is passed, any missing colours
    // fallback to a colour from the palette.
    const normalisedBarColors: string[] = useMemo(() => {
        const result: string[] = [];
        let index = 0;

        for (const _series of series) {
            const configuredStyle = !_series.customBarStyle
                ? null
                : style.barStyles?.[_series.customBarStyle]?.barColor;

            console.info("configuredStyle", configuredStyle);

            if (typeof configuredStyle !== "string") {
                result.push(style.barColorPalette?.[index] || "black");

                if (style.barColorPalette) {
                    index = index + 1 === style.barColorPalette.length ? 0 : index + 1;
                }
            } else {
                result.push(configuredStyle);
            }
        }

        return result;
    }, [series, style]);

    const sort = useMemo(() => ({ sortOrder, sortKey: "x" }), [sortOrder]);

    const sortProp = useMemo(
        () => ({
            ...sort
        }),
        [sort]
    );

    const groupedOrStacked = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        // datum.y is actually the X axis data points due to the way Victory handles horizontal charts
        const bars = series.map(({ customBarStyle, dataPoints }, index) => {
            const seriesStyle = style.barStyles && customBarStyle ? style.barStyles[customBarStyle] : undefined;

            // todo: test cornerRadius
            return (
                <VictoryBar
                    horizontal
                    key={index}
                    data={dataPoints}
                    width={seriesStyle?.width}
                    cornerRadius={
                        seriesStyle?.ending === "round"
                            ? typeof seriesStyle.width === "number"
                                ? seriesStyle.width / 2
                                : undefined
                            : undefined
                    }
                    style={{
                        ...mapToBarStyle(normalisedBarColors[index], seriesStyle),
                        ...mapToBarLabelStyle(normalisedBarColors[index], seriesStyle)
                    }}
                    {...sortProp}
                    {...(showLabels ? { labels: ({ datum }: { datum: BarProps["datum"] }) => datum.y } : undefined)}
                />
            );
        });

        if (presentation === "grouped") {
            return (
                // todo: configure offset
                <VictoryGroup offset={20} colorScale={normalisedBarColors}>
                    {bars}
                </VictoryGroup>
            );
        }

        return <VictoryStack colorScale={normalisedBarColors}>{bars}</VictoryStack>;
    }, [dataTypesResult, series, style, warningMessagePrefix, sortProp, showLabels, normalisedBarColors, presentation]);

    const [firstSeries] = series;

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

    const xAxisLabelComponent = <Text style={axisLabelStyles.xAxisLabelStyle}>{xAxisLabel}</Text>;
    const yAxisLabelComponent = <Text style={axisLabelStyles.yAxisLabelStyle}>{yAxisLabel}</Text>;

    const onLayout = useCallback(
        (event: LayoutChangeEvent) =>
            setChartDimensions({
                height: event.nativeEvent.layout.height,
                width: event.nativeEvent.layout.width
            }),
        [setChartDimensions]
    );

    return (
        <View style={style.container}>
            {dataTypesResult instanceof Error ? (
                <Text style={style.errorMessage}>{dataTypesResult.message}</Text>
            ) : (
                // todo: support domain padding through atlas.
                <View style={style.chart}>
                    <View style={{ flex: 1 }}>
                        {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "top"
                            ? yAxisLabelComponent
                            : null}
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            {axisLabelStyles.extractedYAxisLabelStyle.relativePositionGrid === "left"
                                ? yAxisLabelComponent
                                : null}
                            <View onLayout={onLayout} style={{ flex: 1 }}>
                                {chartDimensions ? (
                                    <VictoryChart
                                        height={chartDimensions?.height}
                                        width={chartDimensions?.width}
                                        padding={{
                                            top: style.grid?.paddingTop,
                                            right: style.grid?.paddingRight,
                                            bottom: style.grid?.paddingBottom,
                                            left: style.grid?.paddingLeft
                                        }}
                                        scale={
                                            dataTypesResult
                                                ? { x: getScale(dataTypesResult.x), y: getScale(dataTypesResult.y) }
                                                : undefined
                                        }
                                        style={mapToGridStyle(style.grid)}
                                    >
                                        <VictoryAxis
                                            orientation={"bottom"}
                                            dependentAxis
                                            style={mapToAxisStyle(style.grid, style.xAxis)}
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            style={mapToAxisStyle(style.grid, style.yAxis)}
                                            orientation={"left"}
                                            {...(firstSeries?.yFormatter
                                                ? { tickFormat: firstSeries.yFormatter }
                                                : undefined)}
                                        />
                                        {groupedOrStacked}
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
                        <Legend style={style.legend} series={series} seriesColors={normalisedBarColors} />
                    ) : null}
                </View>
            )}
        </View>
    );
}

type DataTypeResult = { x: string; y: string };

function getDataTypes(series: BarChartSeries[]): DataTypeResult | Error | undefined {
    let dataTypes: DataTypeResult | undefined;

    for (const _series of series) {
        const { dataPoints } = _series;

        if (dataPoints.length) {
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

const getScale = (dataTypesResult: string): "linear" | "time" | undefined => {
    if (dataTypesResult === "number" || dataTypesResult === "string") {
        return "linear";
    } else if (dataTypesResult === "object") {
        return "time";
    }

    return undefined;
};
