import { createElement, ReactElement, useCallback } from "react";
import ChartComponent from "react-plotly.js";
import { Layout, PlotData } from "plotly.js";
import { LineChartContainerProps, LineChartPreviewProps } from "../../typings/LineChartProps";
import classNames from "classnames";

import "../ui/LineChart.scss";
import { getDimensions } from "@mendix/piw-utils-internal";

export interface ChartProps {
    data: Array<Partial<PlotData>>;
    title: string | undefined;
    widthUnit: LineChartContainerProps["widthUnit"];
    width: LineChartContainerProps["width"];
    heightUnit: LineChartContainerProps["heightUnit"];
    height: LineChartContainerProps["height"];
    showLegend: PlotData["showlegend"];
    xAxisLabel: Layout["xaxis"]["title"];
    yAxisLabel: Layout["yaxis"]["title"];
    gridLinesMode: LineChartPreviewProps["gridLines"];
}

export function LineChart({
    data,
    title,
    widthUnit,
    width,
    heightUnit,
    height,
    showLegend,
    xAxisLabel,
    yAxisLabel,
    gridLinesMode
}: ChartProps): ReactElement {
    const forceReactPlotlyUpdate = useCallback(() => {
        window.dispatchEvent(new Event("resize"));
    }, []);

    return (
        <div
            className={classNames("widget-line-chart")}
            style={getDimensions({ widthUnit, width, heightUnit, height })}
        >
            <ChartComponent
                className="mx-react-plotly-chart"
                style={{}}
                data={data}
                config={{ responsive: true }}
                layout={{
                    autosize: true,
                    showlegend: showLegend,
                    title,
                    xaxis: { title: xAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "vertical" },
                    yaxis: { title: yAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "horizontal" }
                }}
                onInitialized={forceReactPlotlyUpdate}
            />
        </div>
    );
}
