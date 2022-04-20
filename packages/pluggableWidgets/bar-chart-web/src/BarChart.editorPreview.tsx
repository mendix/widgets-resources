import { createElement, ReactNode } from "react";
import BarChartGrouped from "./assets/BarChart-grouped.light.svg";
import BarChartStacked from "./assets/BarChart-stacked.light.svg";
import BarChartLegend from "./assets/BarChart-legend.light.svg";
import { BarChartPreviewProps } from "../typings/BarChartProps";

export function preview(props: BarChartPreviewProps): ReactNode {
    const { className, barmode } = props;
    const BarChartImage = barmode === "group" ? BarChartGrouped : BarChartStacked;
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
                src={BarChartImage}
                alt="bar-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? <img src={BarChartLegend} alt="bar-chart-legend" style={{ width: "85px" }} /> : null}
        </div>
    );
}
