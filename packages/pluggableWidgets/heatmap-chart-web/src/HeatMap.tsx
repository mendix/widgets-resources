import classNames from "classnames";
import { createElement, ReactElement, useMemo } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { HeatMapContainerProps } from "../typings/HeatMapProps";
import { useHeatMapDataSeries } from "./hooks/data";
import { createHeatMapAnnotation } from "./utils/annotation";

type HeatMapAnnotation = ReturnType<typeof createHeatMapAnnotation>;

const heatmapChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
    font: {
        color: "#555",
        size: 12
    },
    margin: {
        l: 80,
        pad: 0
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
        ticks: "",
        title: {
            standoff: 5
        }
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
    },
    connectgaps: false
};

export function HeatMap(props: HeatMapContainerProps): ReactElement | null {
    const heatmapChartData = useHeatMapDataSeries({
        customSeriesOptions: props.customSeriesOptions,
        horizontalAxisAttribute: props.horizontalAxisAttribute,
        horizontalSortAttribute: props.horizontalSortAttribute,
        horizontalSortOrder: props.horizontalSortOrder,
        onClickAction: props.onClickAction,
        scaleColors: props.scaleColors,
        seriesDataSource: props.seriesDataSource,
        seriesValueAttribute: props.seriesValueAttribute,
        showScale: props.showScale,
        smoothColor: props.smoothColor,
        tooltipHoverText: props.tooltipHoverText,
        verticalAxisAttribute: props.verticalAxisAttribute,
        verticalSortAttribute: props.verticalSortAttribute,
        verticalSortOrder: props.verticalSortOrder
    });

    const heatmapChartLayout = useMemo<ChartWidgetProps["layoutOptions"]>(
        () => ({
            ...heatmapChartLayoutOptions,
            annotations: props.showValues
                ? heatmapChartData[0].z.reduce<HeatMapAnnotation[]>(
                      (prev, curr, yIndex) => [
                          ...prev,
                          ...curr.map((value, xIndex) =>
                              createHeatMapAnnotation(
                                  heatmapChartData[0].x[xIndex],
                                  heatmapChartData[0].y[yIndex],
                                  value?.toLocaleString() ?? "",
                                  props.valuesColor
                              )
                          )
                      ],
                      []
                  )
                : []
        }),
        [heatmapChartData, props.showValues, props.valuesColor]
    );

    return (
        <ChartWidget
            type="HeatMap"
            className={classNames("widget-heatmap-chart", props.class)}
            data={heatmapChartData}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showScale}
            xAxisLabel={props.xAxisLabel?.value}
            yAxisLabel={props.yAxisLabel?.value}
            gridLinesMode={props.gridLines}
            showSidebarEditor={props.enableDeveloperMode}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
            layoutOptions={heatmapChartLayout}
            configOptions={heatmapChartConfigOptions}
            seriesOptions={heatmapChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
