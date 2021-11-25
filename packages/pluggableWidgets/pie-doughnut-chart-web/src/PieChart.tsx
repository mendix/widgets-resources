import classNames from "classnames";
import { createElement, ReactElement, useCallback } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { usePlotChartDataSeries } from "@mendix/shared-charts/hooks";
import { PieChartContainerProps } from "../typings/PieChartProps";

const pieChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
    xaxis: {
        zeroline: true,
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zerolinecolor: "#d7d7d7"
    },
    yaxis: {
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zeroline: true,
        zerolinecolor: "#d7d7d7"
    }
};
const pieChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const pieChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {};

export function PieChart(props: PieChartContainerProps): ReactElement | null {
    const chartLines = usePlotChartDataSeries(
        props.lines,
        useCallback(() => ({ type: "pie" }), [])
    );

    return (
        <ChartWidget
            type="PieChart"
            className={classNames("widget-line-chart", props.class)}
            data={chartLines ?? []}
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
            layoutOptions={pieChartLayoutOptions}
            configOptions={pieChartConfigOptions}
            seriesOptions={pieChartSeriesOptions}
        />
    );
}
