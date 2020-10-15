import { createElement, ReactElement, useState, useEffect } from "react";
import { all } from "deepmerge";

import { LineChartProps } from "../typings/LineChartProps";
import { LineChart as LineChartComponent, LineChartSeries } from "./components/LineChart";
import { LineChartStyle, defaultLineChartStyle } from "./ui/Styles";
import { loadSeries } from "./utils/SeriesDataLoadingFunction";

export function LineChart(props: LineChartProps<LineChartStyle>): ReactElement | null {
    const { series, showLegend, style, xAxisLabel, yAxisLabel } = props;

    const customStyles = style ? style.filter(o => o != null) : [];
    const styles = all<LineChartStyle>([defaultLineChartStyle, ...customStyles]);

    const [chartSeries, setChartSeries] = useState<LineChartSeries[]>([]);

    useEffect(() => {
        const chartSeriesResult = loadSeries(series);
        setChartSeries(chartSeriesResult ? chartSeriesResult.reverse() : []);
    }, [series]);

    if ((xAxisLabel && !xAxisLabel.value) || (yAxisLabel && !yAxisLabel.value)) {
        return null;
    }

    return (
        <LineChartComponent
            series={chartSeries}
            style={styles}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
        />
    );
}
