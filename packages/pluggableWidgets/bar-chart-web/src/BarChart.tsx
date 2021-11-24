import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { usePlotChartDataSeries } from "@mendix/shared-charts/hooks";
import { BarChartContainerProps } from "../typings/BarChartProps";

const barChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
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

const barChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};

const barChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {};

export function BarChart(props: BarChartContainerProps): ReactElement | null {
    const layoutOptions = {
        ...barChartLayoutOptions,
        barmode: props.barmode
    };

    const series = usePlotChartDataSeries(props.series, dataSeries => ({
        type: "bar",
        orientation: "h",
        marker: {
            color: dataSeries.barColor?.value
        }
    }));

    return (
        <ChartWidget
            className={classNames("widget-bar-chart", props.class)}
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
            layoutOptions={layoutOptions}
            configOptions={barChartConfigOptions}
            seriesOptions={barChartSeriesOptions}
        />
    );
}
