import { createElement, ReactNode } from "react";
import TimeSeries from "./assets/TimeSeries.light.svg";
import TimeSeriesRange from "./assets/TimeSeries-range.light.svg";
import TimeSeriesLegend from "./assets/TimeSeries-legend.light.svg";
import { TimeSeriesPreviewProps } from "../typings/TimeSeriesProps";

export function preview(props: TimeSeriesPreviewProps): ReactNode {
    const { className, showRangeSlider } = props;
    const TimeSeriesImage = showRangeSlider ? TimeSeriesRange : TimeSeries;
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
                src={TimeSeriesImage}
                alt="timeseries-chart-image"
                style={{ objectFit: "contain", width: "300px", height: "100%" }}
            />
            {props.showLegend ? (
                <img src={TimeSeriesLegend} alt="timeseries-chart-legend" style={{ width: "85px" }} />
            ) : null}
        </div>
    );
}
