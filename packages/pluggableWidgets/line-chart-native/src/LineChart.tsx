import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { LineChartProps } from "../typings/LineChartProps";
import { LineChart as LineChartComponent } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { name, series, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const chartSeries = useSeries(series);

    if (!chartSeries || (xAxisLabel && !xAxisLabel.value) || (yAxisLabel && !yAxisLabel.value)) {
        return null;
    }

    return (
        <LineChartComponent
            series={chartSeries.reverse()}
            style={styles}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
            warningPrefix={`[${name}]: `}
        />
    );
}
