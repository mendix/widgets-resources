import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { PieChartContainerProps } from "../typings/PieChartProps";
import { usePieChartDataSeries } from "./hooks/data";

const pieChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
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
const pieChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const pieChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {
    type: "pie",
    hoverinfo: "none",
    sort: false
};

export function PieChart(props: PieChartContainerProps): ReactElement | null {
    const pieChartData = usePieChartDataSeries({
        holeRadius: props.holeRadius,
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
            type="PieChart"
            className={classNames("widget-pie-chart", props.class)}
            data={pieChartData}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={undefined}
            yAxisLabel={undefined}
            // Pie chart can't have grid lines
            gridLinesMode="none"
            showSidebarEditor={props.enableDeveloperMode}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
            layoutOptions={pieChartLayoutOptions}
            configOptions={pieChartConfigOptions}
            seriesOptions={pieChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
