import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { PieDoughnutChartProps } from "../typings/PieDoughnutChartProps";
import { PieDoughnutChart as PieDoughnutChartComponent } from "./components/PieDoughnutChart";
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
            series={series
                .flatMap(_series => _series.slices)
                .sort((a, b) => (sortOrder === "ascending" ? a.y - b.y : b.y - a.y))}
            style={all<ChartStyle>([defaultStyle, ...style.filter(o => o != null)])}
            {...rest}
        />
    );
}
