import { createElement } from "react";
import { LineChart } from "./components/LineChart";

export function preview() {
    // TODO:
    return (
        <LineChart
            data={[{ x: [], y: [] }]}
            title="Fancy example"
            widthUnit={"percentage"}
            width={0}
            heightUnit={"pixels"}
            height={0}
            showLegend={false}
            xAxisLabel={undefined}
            yAxisLabel={undefined}
            gridLinesMode={"both"}
        />
    );
}
