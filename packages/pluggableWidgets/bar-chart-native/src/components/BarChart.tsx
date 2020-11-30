import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory-native";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { BarChartStyle } from "../ui/Styles";
import { SortOrderEnum } from "../../typings/BarChartProps";
import { Legend } from "./Legend";

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

    const sort = useMemo(() => ({ sortOrder, sortKey: "x" }), [sortOrder]);

    const colorScale = { colorScale: "qualitative" } as { colorScale: "qualitative" };

    const colorScaleProp = useMemo(
        () => ({
            ...colorScale
        }),
        [colorScale.colorScale]
    );

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
        const bars = series.map((series, index) => (
            <VictoryBar
                horizontal
                key={index}
                data={series.dataPoints}
                {...sortProp}
                {...(showLabels ? { labels: ({ datum }: { datum: any }) => datum.y } : undefined)}
            />
        ));

        if (presentation === "grouped") {
            return (
                // todo: configure offset
                <VictoryGroup {...colorScaleProp}>{bars}</VictoryGroup>
            );
        }

        return <VictoryStack {...colorScaleProp}>{bars}</VictoryStack>;
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

    const xAxisLabelComponent = <Text style={axisLabelStyles.xAxisLabelStyle}>{xAxisLabel}</Text>;
    const yAxisLabelComponent = <Text style={axisLabelStyles.yAxisLabelStyle}>{yAxisLabel}</Text>;

    const onLayout = useCallback(
        (event: LayoutChangeEvent) =>
            setChartDimensions({
                height: event.nativeEvent.layout.height,
                width: event.nativeEvent.layout.width
            }),
        []
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
                            <View onLayout={onLayout} style={{ flex: 1 }}>
                                {chartDimensions ? (
                                    <VictoryChart
                                        height={chartDimensions?.height}
                                        width={chartDimensions?.width}
                                        padding={style.grid?.padding}
                                        scale={
                                            dataTypesResult
                                                ? { x: getScale(dataTypesResult.x), y: getScale(dataTypesResult.y) }
                                                : undefined
                                        }
                                        style={style.grid}
                                    >
                                        <VictoryAxis
                                            orientation={"bottom"}
                                            dependentAxis
                                            style={style.grid?.xAxis}
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            style={style.grid?.yAxis}
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
                    {showLegend ? <Legend style={style} series={series} /> : null}
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
