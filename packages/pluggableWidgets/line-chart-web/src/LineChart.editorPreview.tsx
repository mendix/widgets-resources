import { createElement, ReactNode } from "react";
import LineChartImage from "./assets/LineChart.light.svg";
import LineChartLegend from "./assets/LineChart-legend.light.svg";
import { LineChartPreviewProps } from "../typings/LineChartProps";

export function preview(props: LineChartPreviewProps): ReactNode {
    const { className } = props;
    return (
        <div
            className={className}
            style={{
                display: "flex",
                width: props.showLegend ? "385px" : "300px",
                height: "232px"
            }}
        >
            <img
                src={LineChartImage}
                alt="line-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? <img src={LineChartLegend} alt="line-chart-legend" style={{ width: "85px" }} /> : null}
        </div>
    );
}
