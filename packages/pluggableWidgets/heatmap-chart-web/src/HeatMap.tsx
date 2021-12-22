import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { HeatMapContainerProps } from "../typings/HeatMapProps";
import { useHeatMapDataSeries } from "./hooks/data";

const heatmapChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
    font: {
        color: "#FFF",
        size: 12
    },
    legend: {
        font: {
            family: "Open Sans",
            size: 14,
            color: "#555"
        }
    }
};
const heatmapChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const heatmapChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {
    type: "heatmap",
    hoverinfo: "none"
};

export function HeatMap(props: HeatMapContainerProps): ReactElement | null {
    const heatmapChartData = useHeatMapDataSeries({
        customSeriesOptions: props.customSeriesOptions,
        seriesColorAttribute: props.seriesColorAttribute,
        seriesDataSource: props.seriesDataSource,
        seriesName: props.seriesName,
        seriesSortAttribute: props.seriesSortAttribute,
        seriesSortOrder: props.seriesSortOrder,
        seriesValueAttribute: props.seriesValueAttribute,
        onClickAction: props.onClickAction,
        tooltipHoverText: props.tooltipHoverText
    });

    return (
        <ChartWidget
            type="HeatMap"
            className={classNames("widget-heatmap-chart", props.class)}
            data={heatmapChartData}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={props.xAxisLabel?.value}
            yAxisLabel={props.yAxisLabel?.value}
            gridLinesMode="none"
            showSidebarEditor={props.developerMode === "developer"}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
            layoutOptions={heatmapChartLayoutOptions}
            configOptions={heatmapChartConfigOptions}
            seriesOptions={heatmapChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
