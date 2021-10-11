import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { PieDoughnutChartProps } from "../typings/PieDoughnutChartProps";
import { DataPoint, PieDoughnutChart as PieDoughnutChartComponent } from "./components/PieDoughnutChart";
import { ChartStyle, defaultStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function PieDoughnutChart(props: PieDoughnutChartProps<ChartStyle>): ReactElement | null {
    const { series: chartSeries, style, name, sortOrder, ...rest } = props;
    const series = useSeries(chartSeries, name);

    if (!series) {
        return null;
    }

    return (
        <PieDoughnutChartComponent
            series={series.flatMap(_series => _series.slices).sort(getSort(sortOrder))}
            style={all<ChartStyle>([defaultStyle, ...style.filter(o => o != null)])}
            {...rest}
        />
    );
}

function getSort(sortOrder: string): (a: DataPoint, b: DataPoint) => number {
    const isAscending = sortOrder === "ascending";
    return (a, b) => (a.y < b.y ? (isAscending ? -1 : 1) : a.y > b.y ? (isAscending ? 1 : -1) : 0);
}
