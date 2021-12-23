import classNames from "classnames";
import { createElement, ReactNode, useCallback } from "react";
import { AreaChartContainerProps, SeriesType } from "../typings/AreaChartProps";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { getPlotChartDataTransforms, SeriesMapper, usePlotChartDataSeries } from "@mendix/shared-charts/hooks";
// import { getPlotChartDataTransforms, usePlotChartDataSeries } from "@mendix/shared-charts/hooks";

const areaChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
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
const areaChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const areaChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {};

export function AreaChart(props: AreaChartContainerProps): ReactNode {
    const mapSeries = useCallback<SeriesMapper<SeriesType>>(
        (line, dataPoints) => ({
            type: "scatter",
            fill: "tonexty",
            fillcolor: line.fillcolor?.value,
            mode: line.lineStyle === "line" ? "lines" : "lines+markers",
            line: {
                shape: line.interpolation
            },
            marker: {
                color: line.markerColor?.value
            },
            transforms: getPlotChartDataTransforms(line.aggregationType, dataPoints)
        }),
        []
    );

    const series = usePlotChartDataSeries(props.series, mapSeries);

    return (
        <ChartWidget
            type="AreaChart"
            className={classNames("widget-line-chart", props.class)}
            data={series ?? []}
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
            layoutOptions={areaChartLayoutOptions}
            configOptions={areaChartConfigOptions}
            seriesOptions={areaChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
