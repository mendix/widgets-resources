import { createElement, ReactNode } from "react";
import PieChart from "./assets/PieChart.light.svg";
import DoughnutChart from "./assets/DoughnutChart.light.svg";
import PieChartLegend from "./assets/PieDoughnut-legend.light.svg";
import { PieChartPreviewProps } from "../typings/PieChartProps";

export function preview(props: PieChartPreviewProps): ReactNode {
    const { className, holeRadius } = props;
    const PieChartImage = holeRadius && holeRadius > 0 ? DoughnutChart : PieChart;
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
                src={PieChartImage}
                alt="pie-doughnut-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? (
                <img src={PieChartLegend} alt="pie-doughnut-chart-legend" style={{ width: "85px" }} />
            ) : null}
        </div>
    );
}
