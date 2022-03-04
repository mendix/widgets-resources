import classNames from "classnames";
import { createElement, ReactElement, useCallback, useMemo } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { getPlotChartDataTransforms, usePlotChartDataSeries } from "@mendix/shared-charts/hooks";
import { TimeSeriesContainerProps } from "../typings/TimeSeriesProps";

const createTimeSeriesChartLayoutOptions = (
    showRangeSlider: TimeSeriesContainerProps["showRangeSlider"],
    yAxisRangeMode: TimeSeriesContainerProps["yAxisRangeMode"]
): ChartWidgetProps["layoutOptions"] => ({
    font: {
        color: "#555",
        size: 12
    },
    legend: {
        font: {
            family: "Open Sans",
            size: 14,
            color: "#555"
        }
    },
    xaxis: {
        type: "date",
        autorange: true,
        gridcolor: "#d7d7d7",
        zerolinecolor: "#d7d7d7",
        zeroline: true,
        rangeslider: {
            visible: showRangeSlider,
            borderwidth: 1,
            bordercolor: "#d7d7d7"
        }
    },
    yaxis: {
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zeroline: true,
        zerolinecolor: "#d7d7d7",
        rangemode: yAxisRangeMode || "tozero"
    }
});

const timeSeriesChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};

const timeSeriesChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {
    type: "scatter",
    hoverinfo: "none"
};

export function TimeSeries(props: TimeSeriesContainerProps): ReactElement | null {
    const chartLines = usePlotChartDataSeries(
        props.lines,
        useCallback(
            (line, dataPoints) => ({
                mode: line.lineStyle === "line" ? "lines" : "lines+markers",
                fill: line.enableFillArea ? "tonexty" : "none",
                fillcolor: line.fillColor?.value,
                line: {
                    shape: line.interpolation,
                    color: line.lineColor?.value
                },
                marker: {
                    color: line.markerColor?.value
                },
                transforms: getPlotChartDataTransforms(line.aggregationType, dataPoints)
            }),
            []
        )
    );

    const timeSeriesLayout = useMemo<ChartWidgetProps["layoutOptions"]>(
        () => createTimeSeriesChartLayoutOptions(props.showRangeSlider, props.yAxisRangeMode),
        [props.showRangeSlider, props.yAxisRangeMode]
    );

    return (
        <ChartWidget
            type="TimeSeries"
            className={classNames("widget-time-series-chart", props.class)}
            data={chartLines ?? []}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={props.xAxisLabel?.value}
            yAxisLabel={props.yAxisLabel?.value}
            gridLinesMode={props.gridLines}
            showSidebarEditor={props.enableDeveloperMode}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
            layoutOptions={timeSeriesLayout}
            configOptions={timeSeriesChartConfigOptions}
            seriesOptions={timeSeriesChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
