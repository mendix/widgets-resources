import { createElement, ReactElement, useMemo } from "react";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter } from "victory-native";
import { InterpolationPropType } from "victory-core";

export interface LineChartProps {
    series: Array<LineChartSeries>;
    style: any;
}

export interface LineChartSeries {
    id: number;
    dataPoints: Array<LineChartDataPoint>;
    showMarkers: "false" | "underneath" | "onTop";
    interpolation: InterpolationPropType;
    stylePropertyName: string;
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
                    <VictoryScatter
                        data={series.dataPoints}
                        style={props.style.series[series.stylePropertyName]?.markers}
                        size={props.style.series[series.stylePropertyName]?.markers?.data?.size}
                    />
                );

                return (
                    <VictoryGroup key={series.id}>
                        {series.showMarkers === "underneath" ? markers : null}
                        <VictoryLine
                            style={props.style.series[series.stylePropertyName]?.line}
                            data={series.dataPoints}
                            interpolation={series.interpolation}
                        />
                        {series.showMarkers === "onTop" ? markers : null}
                    </VictoryGroup>
                );
            }),
        [props.series, props.style]
    );

    return <VictoryChart theme={VictoryTheme.material}>{chartLines}</VictoryChart>;
}
