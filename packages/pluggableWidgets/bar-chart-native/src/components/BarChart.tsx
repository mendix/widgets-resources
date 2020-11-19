import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory-native";

import { BarChartStyle } from "../ui/Styles";
import { SortOrderEnum } from "../../typings/BarChartProps";

export interface BarChartProps {
    series: BarChartSeries[];
    sortOrder: SortOrderEnum;
    style: BarChartStyle;
    presentation: string;
    showLegend: boolean;
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

export function BarChart(props: BarChartProps): ReactElement | null {
    const { series, style, warningPrefix, presentation, sortOrder } = props;

    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(series), [series]);

    const sort = useMemo(() => (sortOrder !== "noSort" ? { sortOrder, sortKey: "y" } : undefined), [sortOrder]);

    const colorScale = { colorScale: "qualitative" } as { colorScale: "qualitative" };

    const conditionalProps = useMemo(
        () => ({
            ...colorScale,
            ...sort
        }),
        [colorScale.colorScale, sort]
    );

    const groupedOrStacked = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        const bars = series.map((series, index) => (
            <VictoryBar horizontal key={index} data={series.dataPoints} labels={({ datum }) => datum.y} />
        ));

        if (presentation === "grouped") {
            return (
                <VictoryGroup offset={20} {...conditionalProps}>
                    {bars}
                </VictoryGroup>
            );
        }

        return <VictoryStack {...conditionalProps}>{bars}</VictoryStack>;
    }, [dataTypesResult, series, style, warningMessagePrefix]);

    const [firstSeries] = series;

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
                        <View style={style.gridRow}>
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
                                            {...(firstSeries?.xFormatter
                                                ? { tickFormat: firstSeries.xFormatter }
                                                : undefined)}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            orientation={"left"}
                                            {...(firstSeries.yFormatter
                                                ? { tickFormat: firstSeries.yFormatter }
                                                : undefined)}
                                        />
                                        {groupedOrStacked}
                                    </VictoryChart>
                                ) : null}
                            </View>
                        </View>
                    </View>
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
