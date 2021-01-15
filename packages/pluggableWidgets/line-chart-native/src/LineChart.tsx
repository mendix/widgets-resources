import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { LineChartProps } from "../typings/LineChartProps";
import { LineChart as LineChartComponent } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { name, lines, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style.filter(o => o != null);
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const chartLines = useSeries(lines);

    if (
        !chartLines ||
        (xAxisLabel && xAxisLabel.value === undefined) ||
        (yAxisLabel && yAxisLabel.value === undefined)
    ) {
        return null;
    }

    return (
        <LineChartComponent
            lines={chartLines}
            style={styles}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
            warningPrefix={`[${name}]: `}
        />
    );
}
