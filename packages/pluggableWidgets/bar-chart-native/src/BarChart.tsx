import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { BarChartProps } from "../typings/BarChartProps";
import { BarChart as BarChartComponent } from "./components/BarChart";
import { BarChartStyle, defaultBarChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function BarChart(props: BarChartProps<BarChartStyle>): ReactElement | null {
    const { name, barSeries, style, xAxisLabel, yAxisLabel, showLabels, ...rest } = props;

    const customStyles = style.filter(o => o != null);

    const styles = all<BarChartStyle>([defaultBarChartStyle, ...customStyles]);

    const series = useSeries(barSeries);

    if (!series || (xAxisLabel && xAxisLabel.value === undefined) || (yAxisLabel && yAxisLabel.value === undefined)) {
        return null;
    }

    return (
        <BarChartComponent
            series={series}
            style={styles}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
            warningPrefix={`[${name}]: `}
            showLabels={showLabels}
            {...rest}
        />
    );
}
