import { createElement, ReactElement } from "react";
import ChartComponent from "react-plotly.js";
import { Datum } from "plotly.js";

interface ChartProps {
    xAxis: Datum[];
    yAxis: Datum[];
    title: string;
}

export function Chart(props: ChartProps): ReactElement {
    return (
        <ChartComponent
            data={[
                {
                    x: props.xAxis,
                    y: props.yAxis,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "blue" }
                }
            ]}
            layout={{ width: 320, height: 240, title: props.title }}
        />
    );
}
