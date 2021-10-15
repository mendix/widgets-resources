import { createElement } from "react";
import { ChartWidget } from "./components/ChartWidget";

export function preview() {
    // TODO:
    return (
        <ChartWidget
            className="widget-chart-line"
            data={[{ x: [], y: [], customSeriesOptions: "" }]}
            widthUnit={"percentage"}
            width={0}
            heightUnit={"pixels"}
            height={0}
            showLegend={false}
            xAxisLabel={undefined}
            yAxisLabel={undefined}
            gridLinesMode={"both"}
            showSidebarEditor={false}
            customLayout={""}
            customConfig={""}
        />
    );
}
