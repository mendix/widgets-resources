import { createElement, ReactNode } from "react";
import BubbleChartImage from "./assets/BubbleChart.light.svg";
import BubbleChartLegend from "./assets/BubbleChart-legend.light.svg";
import { BubbleChartPreviewProps } from "../typings/BubbleChartProps";

export function preview(props: BubbleChartPreviewProps): ReactNode {
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
                src={BubbleChartImage}
                alt="bubble-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? (
                <img src={BubbleChartLegend} alt="bubble-chart-legend" style={{ width: "85px" }} />
            ) : null}
        </div>
    );
}
