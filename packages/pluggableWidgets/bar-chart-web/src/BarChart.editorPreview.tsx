import { createElement, ReactNode } from "react";
import { ChartWidget } from "@mendix/shared-charts";

export function preview(): ReactNode {
    // TODO:
    return (
        <ChartWidget
            className="widget-bar-chart"
            data={[{ x: [], y: [], customSeriesOptions: "" }]}
            widthUnit={"pixels"}
            width={700}
            heightUnit={"pixels"}
            height={450}
            showLegend={false}
            xAxisLabel={undefined}
            yAxisLabel={undefined}
            gridLinesMode={"both"}
            showSidebarEditor={false}
            customLayout={""}
            customConfig={""}
            configOptions={{}}
            layoutOptions={{}}
            seriesOptions={{}}
            type="BarChart"
        />
    );
}
