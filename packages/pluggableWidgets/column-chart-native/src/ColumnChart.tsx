import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { ColumnChartProps } from "../typings/ColumnChartProps";
import { ColumnChart as ColumnChartComponent } from "./components/ColumnChart";
import { ColumnChartStyle, defaultColumnChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function ColumnChart(props: ColumnChartProps<ColumnChartStyle>): ReactElement | null {
    const { name, columnSeries, style, xAxisLabel, yAxisLabel, showLabels, ...rest } = props;

    const customStyles = style.filter(o => o != null);

    const styles = all<ColumnChartStyle>([defaultColumnChartStyle, ...customStyles]);

    const series = useSeries(columnSeries);

    if (!series || (xAxisLabel && xAxisLabel.value === undefined) || (yAxisLabel && yAxisLabel.value === undefined)) {
        return null;
    }

    return (
        <ColumnChartComponent
            name={name}
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
