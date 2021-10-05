import { createElement, ReactElement } from "react";
import { ValueStatus } from "mendix";
import { LineChartContainerProps } from "../typings/LineChartProps";
import { LineChart as Chart } from "./components/LineChart";
import { useSeries } from "./utils/SeriesLoader";

export function LineChart(props: LineChartContainerProps): ReactElement | null {
    const chartLines = useSeries(props.lines);

    if (!chartLines) {
        return null;
    }

    const data = chartLines.map(line => ({
        ...line.dataPoints,
        type: "scatter" as const,
        mode: line.lineStyle === "line" ? ("lines" as const) : ("lines+markers" as const),
        line: {
            shape: line.interpolation,
            color: line.lineColor
        },
        marker: { color: line.markerColor }
    }));

    return (
        <Chart
            data={data}
            title="Fancy example"
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={props.xAxisLabel?.status === ValueStatus.Available ? props.xAxisLabel.value : undefined}
            yAxisLabel={props.yAxisLabel?.status === ValueStatus.Available ? props.yAxisLabel.value : undefined}
            gridLinesMode={props.gridLines}
        />
    );
}
