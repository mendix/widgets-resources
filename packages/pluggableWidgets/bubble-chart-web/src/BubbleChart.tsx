import { createElement, ReactElement, useCallback } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import classNames from "classnames";
import { BubbleChartContainerProps } from "../typings/BubbleChartProps";
import { usePlotChartDataSeries, getPlotChartDataTransforms } from "@mendix/shared-charts/dist/hooks";
import { calculateBubbleSize, getSampleTraces } from "./utils";

const bubbleChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
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
const bubbleChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const bubbleChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {};

export function BubbleChart(props: BubbleChartContainerProps): ReactElement {
    const val = calculateBubbleSize(props.lines, [{ type: "scatter", ...getSampleTraces() }]);
    console.log("val", val);
    const chartBubbles = usePlotChartDataSeries(
        props.lines,
        useCallback(
            (line, dataPoints) => ({
                type: "scatter",
                mode: "markers",
                line: {
                    shape: line.interpolation,
                    color: line.lineColor?.value
                },
                marker: {
                    color: line.markerColor?.value,
                    symbol: ["circle"],
                    ...val[0].marker,
                    size: getSampleTraces().marker.size
                },
                transforms: getPlotChartDataTransforms(line.aggregationType, dataPoints)
            }),
            []
        )
    );
    console.log("chartBubbles", chartBubbles);
    return (
        <ChartWidget
            type="BubbleChart"
            className={classNames("widget-bubble-chart", props.class)}
            data={chartBubbles ?? []}
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
            layoutOptions={bubbleChartLayoutOptions}
            configOptions={bubbleChartConfigOptions}
            seriesOptions={bubbleChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
