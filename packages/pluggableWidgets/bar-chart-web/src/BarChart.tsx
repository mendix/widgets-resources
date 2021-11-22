// import classNames from "classnames";
import { createElement, ReactElement } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { usePlotChartDataSeries } from "@mendix/shared-charts/hooks";
import { BarChartContainerProps } from "../typings/BarChartProps";

const lineChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
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
const lineChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};
const lineChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {};

export function LineChart(props: BarChartContainerProps): ReactElement | null {
    return (
        <div>
            {typeof props} and {typeof ChartWidget}, {typeof usePlotChartDataSeries}
            also {typeof lineChartConfigOptions} and {typeof lineChartSeriesOptions} and {typeof lineChartLayoutOptions}
        </div>
        // <ChartWidget
        //     className={classNames("widget-bar-chart", props.class)}
        //     data={[]}
        //     // width={props.width}
        //     // widthUnit={props.widthUnit}
        //     // height={props.height}
        //     // heightUnit={props.heightUnit}
        //     // showLegend={props.showLegend}
        //     // xAxisLabel={props.xAxisLabel?.value}
        //     // yAxisLabel={props.yAxisLabel?.value}
        //     // gridLinesMode={props.gridLines}
        //     // showSidebarEditor={props.developerMode === "developer"}
        //     // customLayout={props.customLayout}
        //     // customConfig={props.customConfigurations}
        //     layoutOptions={lineChartLayoutOptions}
        //     configOptions={lineChartConfigOptions}
        //     seriesOptions={lineChartSeriesOptions}
        // />
    );
}
