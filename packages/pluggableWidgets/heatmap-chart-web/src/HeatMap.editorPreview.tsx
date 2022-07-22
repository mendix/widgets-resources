import { createElement, ReactNode } from "react";
import HeatMapChartImage from "./assets/HeatMap.light.svg";
import HeatMapChartLegend from "./assets/HeatMap-legend.light.svg";
import { HeatMapPreviewProps } from "../typings/HeatMapProps";

export function preview(props: HeatMapPreviewProps): ReactNode {
    const { className } = props;
    return (
        <div
            className={className}
            style={{
                display: "flex",
                width: props.showScale ? "385px" : "300px",
                height: "232px"
            }}
        >
            <img
                src={HeatMapChartImage}
                alt="heatMap-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showScale ? (
                <img src={HeatMapChartLegend} alt="heatMap-chart-legend" style={{ width: "85px" }} />
            ) : null}
        </div>
    );
}
