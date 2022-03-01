import classNames from "classnames";
import { createElement, ReactElement, useCallback, useMemo } from "react";
import { ChartWidget, ChartWidgetProps } from "@mendix/shared-charts";
import { usePlotChartDataSeries, getPlotChartDataTransforms } from "@mendix/shared-charts/hooks";
import { ColumnChartContainerProps } from "../typings/ColumnChartProps";

const columnChartLayoutOptions: ChartWidgetProps["layoutOptions"] = {
    xaxis: {
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zeroline: false,
        zerolinecolor: undefined
    },
    yaxis: {
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zeroline: true,
        zerolinecolor: "#d7d7d7",
        rangemode: "tozero"
    }
};

const columnChartConfigOptions: ChartWidgetProps["configOptions"] = {
    responsive: true
};

const columnChartSeriesOptions: ChartWidgetProps["seriesOptions"] = {
    type: "bar",
    orientation: "v"
};

export function ColumnChart(props: ColumnChartContainerProps): ReactElement | null {
    const layoutOptions = useMemo(
        () => ({
            ...columnChartLayoutOptions,
            barmode: props.barmode
        }),
        [props.barmode]
    );

    const series = usePlotChartDataSeries(
        props.series,
        useCallback(
            (dataSeries, dataPoints) => ({
                marker: {
                    color: dataSeries.barColor?.value
                },
                transforms: getPlotChartDataTransforms(dataSeries.aggregationType, dataPoints)
            }),
            []
        )
    );

    return (
        <ChartWidget
            type="ColumnChart"
            className={classNames("widget-column-chart", props.class)}
            data={series ?? []}
            width={props.width}
            widthUnit={props.widthUnit}
            height={props.height}
            heightUnit={props.heightUnit}
            showLegend={props.showLegend}
            xAxisLabel={props.xAxisLabel?.value}
            yAxisLabel={props.yAxisLabel?.value}
            gridLinesMode={props.gridLines}
            showSidebarEditor={props.developerMode}
            customLayout={props.customLayout}
            customConfig={props.customConfigurations}
            layoutOptions={layoutOptions}
            configOptions={columnChartConfigOptions}
            seriesOptions={columnChartSeriesOptions}
            enableThemeConfig={props.enableThemeConfig}
        />
    );
}
