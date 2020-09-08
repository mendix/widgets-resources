import { createElement, ReactElement, useMemo } from "react";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter } from "victory-native";

export interface LineChartProps {
    series: Array<LineChartSeries>;
}

export interface LineChartSeries {
    id: number;
    dataPoints: Array<LineChartDataPoint>;
    showMarkers: "false" | "underneath" | "onTop";
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
            props.series.map(series => {
                const markers = (
                    <VictoryScatter data={series.dataPoints} size={5} style={{ data: { fill: "tomato" } }} />
                );

                return (
                    <VictoryGroup key={series.id}>
                        {series.showMarkers === "underneath" ? markers : null}
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={series.dataPoints}
                        />
                        {series.showMarkers === "onTop" ? markers : null}
                    </VictoryGroup>
                );
            }),
        [props.series]
    );

    return <VictoryChart theme={VictoryTheme.material}>{chartLines}</VictoryChart>;
}
