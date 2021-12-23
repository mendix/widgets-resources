import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { HeatMapContainerProps } from "../typings/HeatMapProps";
import { useHeatMapDataSeries } from "./hooks/data";

const heatmapChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
    font: {
        color: "#555",
        size: 12
    },
    legend: {
        font: {
            family: "Open Sans",
            size: 14
        }
    },
    xaxis: {
        fixedrange: true,
        ticks: ""
    },
    yaxis: {
        fixedrange: true,
        ticks: ""
    }
};
const heatmapChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const heatmapChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {
    type: "heatmap",
    hoverinfo: "none",
    xgap: 1,
    ygap: 1,
    colorbar: {
        y: 1,
        yanchor: "top",
        ypad: 0,
        xpad: 5,
        outlinecolor: "#9ba492"
    }
};

export function HeatMap(props: HeatMapContainerProps): ReactElement | null {
    const heatmapChartData = useHeatMapDataSeries({
        customSeriesOptions: props.customSeriesOptions,
        onClickAction: props.onClickAction,
        scaleColors: props.scaleColors,
        seriesDataSource: props.seriesDataSource,
        seriesName: props.seriesName,
        seriesValueAttribute: props.seriesValueAttribute,
        showScale: props.showScale,
        tooltipHoverText: props.tooltipHoverText,
        xAttribute: props.xAttribute,
        yAttribute: props.yAttribute
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
