import { createElement, ReactElement, useState, useEffect } from "react";
import { LineChart as LineChartComponent, LineChartSeries, LineChartDataPoint } from "./components/LineChart";
import { ValueStatus } from "mendix";

import { LineChartProps } from "../typings/LineChartProps";

export function LineChart(props: LineChartProps<undefined>): ReactElement | null {
    const { series } = props;

    const [chartSeries, setChartSeries] = useState<Array<LineChartSeries>>([]);

    useEffect(() => {
        setChartSeries(
            series
                .map((series, index) => {
                    const { dataSource, xValue, yValue } = series;

                    if (dataSource.status !== ValueStatus.Available) {
                        return { id: index, dataPoints: [], showMarkers: series.showMarkers };
                    }

                    return {
                        id: index,
                        dataPoints: dataSource.items!.reduce<Array<LineChartDataPoint>>((result, item) => {
                            const x = xValue(item);
                            const y = yValue(item);
                            if (x.status === ValueStatus.Available && y.status === ValueStatus.Available) {
                                // Maybe don't render series at all when one of the datapoints isn't available
                                result.push({ x: Number(x.value!.toFixed()), y: Number(y.value!.toFixed()) });
                            }
                            return result;
                        }, []),
                        showMarkers: series.showMarkers
                    };
                })
                .reverse()
        );
    }, [series]);

    console.warn(chartSeries);

    return <LineChartComponent series={chartSeries} />;
}
