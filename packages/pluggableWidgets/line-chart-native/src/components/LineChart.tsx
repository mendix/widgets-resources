import { createElement, ReactElement, useMemo } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

export interface LineChartProps {
    series: Array<LineChartSeries>;
}

export interface LineChartSeries {
    dataPoints: Array<LineChartDataPoint>;
}

export interface LineChartDataPoint {
    x: number;
    y: number;
}

export function LineChart(props: LineChartProps): ReactElement | null {
    if (props.series.length === 0) {
        return null;
    }

    const chartLines = useMemo(
        () =>
            props.series.map(series => (
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={series.dataPoints}
                /> // add a key for performance optimalization
            )),
        [props.series]
    );

    return <VictoryChart theme={VictoryTheme.material}>{chartLines}</VictoryChart>;
}
