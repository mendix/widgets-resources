import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget } from "@mendix/shared-charts";
import { LineChartContainerProps } from "../typings/LineChartProps";
import { useSeries } from "./utils/SeriesLoader";

export function LineChart(props: LineChartContainerProps): ReactElement | null {
    const chartLines = useSeries(props.lines);

    const data = chartLines?.map(line => ({
        ...line.dataPoints,
        customSeriesOptions: line.customSeriesOptions,
        type: "scatter" as const,
        mode: line.lineStyle === "line" ? ("lines" as const) : ("lines+markers" as const),
        line: {
            shape: line.interpolation,
            color: line.lineColor
        },
        marker: { color: line.markerColor }
    }));

    return (
        <ChartWidget
            className={classNames("widget-line-chart", props.class)}
            data={data ?? []}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={props.xAxisLabel?.value}
            yAxisLabel={props.yAxisLabel?.value}
            gridLinesMode={props.gridLines}
            showSidebarEditor={props.developerMode === "developer"}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
        />
    );
}
