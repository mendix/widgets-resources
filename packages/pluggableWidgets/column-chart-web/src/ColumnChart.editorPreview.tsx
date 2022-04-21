import { createElement, ReactNode } from "react";
import ColumnChartGrouped from "./assets/ColumnChart-grouped.light.svg";
import ColumnChartStacked from "./assets/ColumnChart-stacked.light.svg";
import ColumnChartLegend from "./assets/ColumnChart-legend.light.svg";
import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";

export function preview(props: ColumnChartPreviewProps): ReactNode {
    const { className, barmode } = props;
    const ColumnChartImage = barmode === "group" ? ColumnChartGrouped : ColumnChartStacked;
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
                src={ColumnChartImage}
                alt="column-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? (
                <img src={ColumnChartLegend} alt="column-chart-legend" style={{ width: "85px" }} />
            ) : null}
        </div>
    );
}
