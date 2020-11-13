import { createElement, ReactElement, useMemo, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { VictoryChart, VictoryBar } from "victory-native";

import { BarChartStyle } from "../ui/Styles";

export interface BarChartProps {
    series: BarChartSeries[];
    style: BarChartStyle;
    showLegend: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    warningPrefix?: string;
}

export interface BarChartSeries {
    dataPoints: BarDataPoints;
    xFormatter?: (xValue: number | Date) => string;
    yFormatter?: (yValue: number | Date) => string;
    name?: string;
}

export type BarDataPoints =
    | Array<BarDataPoint<number, number>>
    | Array<BarDataPoint<number, Date>>
    | Array<BarDataPoint<Date, number>>
    | Array<BarDataPoint<Date, Date>>;

export interface BarDataPoint<X extends number | Date, Y extends number | Date> {
    x: X;
    y: Y;
}

export function BarChart(props: BarChartProps): ReactElement | null {
    const { series, style, warningPrefix } = props;

    const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>();

    const warningMessagePrefix = useMemo(() => (warningPrefix ? warningPrefix + "i" : "I"), [warningPrefix]);

    const dataTypesResult = useMemo(() => getDataTypes(series), [series]);

    const bars = useMemo(() => {
        if (!dataTypesResult || dataTypesResult instanceof Error) {
            return null;
        }

        return series.map((series, i) => {
            const { dataPoints } = series;

            return <VictoryBar horizontal key={i} data={dataPoints} />;
        });
    }, [dataTypesResult, series, style, warningMessagePrefix]);

    return (
        <View style={style.container}>
            {dataTypesResult instanceof Error ? (
                <Text>{dataTypesResult.message}</Text>
            ) : (
                <View style={style.chart}>
                    <View style={style.gridAndLabelsRow}>
                        <View style={style.gridRow}>
                            <View
                                // todo: LC doesn't need this useCallback. See note in https://reactjs.org/docs/hooks-reference.html#usestate
                                onLayout={(event: LayoutChangeEvent) =>
                                    setChartDimensions({
                                        height: event.nativeEvent.layout.height,
                                        width: event.nativeEvent.layout.width
                                    })
                                }
                                style={{ flex: 1 }}
                            >
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
                                        {bars}
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

// todo: i think this should not be the responsibility of the LineChart, instead some higher layer which handles data.
// todo: can this be a simpler reduce?
function getDataTypes(series: BarChartSeries[]): { x: string; y: string } | Error | undefined {
    let dataTypes: { x: string; y: string } | undefined;

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
