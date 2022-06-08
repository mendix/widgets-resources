import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory-native";
import { BarProps } from "victory-bar";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { ColumnChartStyle } from "../ui/Styles";
import { SortOrderEnum } from "../../typings/ColumnChartProps";
import { Legend } from "./Legend";
import { aggregateGridPadding, mapToAxisStyle, mapToGridStyle, mapToColumnStyles } from "../utils/StyleUtils";

export interface ColumnChartProps {
    name: string;
    series: ColumnChartSeries[];
    sortOrder: SortOrderEnum;
    style: ColumnChartStyle;
    presentation: string;
    showLegend: boolean;
    showLabels: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    warningPrefix?: string;
}

export interface ColumnChartSeries {
    dataPoints: ColumnDataPoints;
    xFormatter?: (xValue: number | Date | string) => string;
    yFormatter?: (yValue: number | Date | string) => string;
    name?: string;
    customColumnStyle?: string;
}

export type ColumnDataPoints =
    | Array<ColumnDataPoint<number, number>>
    | Array<ColumnDataPoint<number, Date>>
    | Array<ColumnDataPoint<Date, number>>
    | Array<ColumnDataPoint<Date, Date>>
    | Array<ColumnDataPoint<string, string>>
    | Array<ColumnDataPoint<string, number>>
    | Array<ColumnDataPoint<string, Date>>
    | Array<ColumnDataPoint<number, string>>
    | Array<ColumnDataPoint<Date, string>>;

export interface ColumnDataPoint<X extends number | Date | string, Y extends number | Date | string> {
    x: X;
    y: Y;
}

function sortSeriesDataPoints(series: ColumnChartSeries[], sortingOrder: string): ColumnChartSeries[] {
    const keysSum: { [key: string]: number } = {};
    series.forEach(({ dataPoints }) => {
        dataPoints.forEach(({ x, y }) => {
            const key = x.toString();
            if (key in keysSum) {
                keysSum[key] += Number(y);
            } else {
                keysSum[key] = Number(y);
            }
        });
    });

    return series.map(seriesItem => {
        const dataPoints = seriesItem.dataPoints as Array<ColumnDataPoint<string, number>>;
        seriesItem.dataPoints = Object.keys(keysSum)
            .sort((key1, key2) => {
                return sortingOrder === "descending" ? keysSum[key2] - keysSum[key1] : keysSum[key1] - keysSum[key2];
            })
            .map(key => ({
                x: key,
                y: dataPoints.find((point: ColumnDataPoint<string, number>) => point.x === key)?.y || 0
            }));

        return seriesItem;
    });
}

export function ColumnChart({
    name,
    presentation,
    series,
    showLabels,
    xAxisLabel,
    yAxisLabel,
    showLegend,
    sortOrder,
    style,
    warningPrefix
}: ColumnChartProps): ReactElement | null {
    const sortedSeries = useMemo(() => {
        const isNotSortable = series.some(({ dataPoints }) =>
            dataPoints.some(({ x, y }) => typeof x !== "string" || typeof y !== "number")
        );
        return isNotSortable ? series : sortSeriesDataPoints(series, sortOrder);
    }, [sortOrder, series]);

    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(sortedSeries), [sortedSeries]);

    // Column Chart user-styling may be missing for certain series. A palette is passed, any missing colours
    // fallback to a colour from the palette.
    const normalizedColumnColors: string[] = useMemo(() => {
        const ColumnColorPalette = style.columns?.columnColorPalette?.split(";");
        let index = 0;

        return sortedSeries.map(_series => {
            const configuredStyle = !_series.customColumnStyle
                ? null
                : style.columns?.customColumnStyles?.[_series.customColumnStyle]?.column?.columnColor;

            if (typeof configuredStyle !== "string") {
                const ColumnColor = ColumnColorPalette?.[index] || "black";

                if (ColumnColorPalette) {
                    index = index + 1 === ColumnColorPalette.length ? 0 : index + 1;
                }

                return ColumnColor;
            }

            return configuredStyle;
        });
    }, [sortedSeries, style]);

    const groupedOrStacked = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        const Columns = sortedSeries.map(({ customColumnStyle, dataPoints }, index) => {
            if (!dataPoints.length) {
                return null;
            }

            const seriesStyle =
                style.columns?.customColumnStyles && customColumnStyle
                    ? style.columns.customColumnStyles[customColumnStyle]
                    : undefined;

            const ColumnStyles = mapToColumnStyles(normalizedColumnColors[index], seriesStyle);

            return (
                <VictoryBar
                    key={index}
                    data={dataPoints}
                    width={ColumnStyles.width}
                    cornerRadius={ColumnStyles.cornerRadius}
                    style={{
                        data: {
                            ...ColumnStyles.column
                        },
                        labels: {
                            ...ColumnStyles.labels
                        }
                    }}
                    {...(showLabels ? { labels: ({ datum }: { datum: BarProps["datum"] }) => datum.y } : undefined)}
                />
            );
        });

        if (presentation === "grouped") {
            return (
                <VictoryGroup offset={style.columns?.columnsOffset} colorScale={normalizedColumnColors}>
                    {Columns}
                </VictoryGroup>
            );
        }

        return <VictoryStack colorScale={normalizedColumnColors}>{Columns}</VictoryStack>;
    }, [dataTypesResult, series, style, warningMessagePrefix, showLabels, normalizedColumnColors, presentation]);

    const [firstSeries] = sortedSeries;

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

    const updateChartDimensions = useCallback(
        (event: LayoutChangeEvent) =>
            setChartDimensions({
                height: event.nativeEvent.layout.height,
                width: event.nativeEvent.layout.width
            }),
        [setChartDimensions]
    );

    return (
        <View style={style.container} testID={name}>
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
                                        domainPadding={{ x: style.domain?.padding?.x, y: style.domain?.padding?.y }}
                                        // width and height can't be zero
                                        // TODO: this needs to be checked for bar chart
                                        height={chartDimensions?.height || undefined}
                                        width={chartDimensions?.width || undefined}
                                        padding={aggregateGridPadding(style.grid)}
                                        scale={
                                            dataTypesResult
                                                ? { x: getScale(dataTypesResult.x), y: getScale(dataTypesResult.y) }
                                                : undefined
                                        }
                                        style={mapToGridStyle(style.grid)}
                                    >
                                        <VictoryAxis
                                            orientation={"bottom"}
                                            style={mapToAxisStyle(style.grid, style.xAxis)}
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            style={mapToAxisStyle(style.grid, style.yAxis)}
                                            orientation={"left"}
                                            dependentAxis
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
                        <Legend style={style.legend} series={sortedSeries} seriesColors={normalizedColumnColors} />
                    ) : null}
                </View>
            )}
        </View>
    );
}

type DataTypeResult = { x: string; y: string };

function getDataTypes(series: ColumnChartSeries[]): DataTypeResult | Error | undefined {
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
