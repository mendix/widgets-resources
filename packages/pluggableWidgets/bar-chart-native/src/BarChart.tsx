import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { BarChartProps } from "../typings/BarChartProps";
import { BarChart as BarChartComponent } from "./components/BarChart";
import { BarChartStyle, defaultBarChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function BarChart(props: BarChartProps<BarChartStyle>): ReactElement | null {
    const { name, barSeries, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<BarChartStyle>([defaultBarChartStyle, ...customStyles]);

    const chartSeries = useSeries(barSeries);

    if (!chartSeries || (xAxisLabel && !xAxisLabel.value) || (yAxisLabel && !yAxisLabel.value)) {
        return null;
    }

    return (
        <BarChartComponent
            series={chartSeries}
            style={styles}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
            warningPrefix={`[${name}]: `}
        />
    );
}
