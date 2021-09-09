import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { ValueStatus } from "mendix";

import { SeriesType } from "../../typings/PieDoughnutChartProps";
import { DataPoints } from "../components/PieDoughnutChart";

interface ChartSeries {
    slices: DataPoints;
}

export function useSeries(series: SeriesType[], name: string): ChartSeries[] | null {
    const [chartSeries, setChartSeries] = useState<ChartSeries[] | null>(null);

    useEffect(() => {
        const loadedSeries: ChartSeries[] = [];
        let index = 0;
        for (const element of series) {
            const result = loadStaticSeries(element, index, name);
            if (!result) {
                setChartSeries(null);
                return;
            }
            loadedSeries.push(result);
            index++;
        }
        setChartSeries(loadedSeries);
    }, [series]);

    return chartSeries;
}

function loadStaticSeries(series: SeriesType, seriesIndex: number, name: string): ChartSeries | null {
    const result = extractDataPoints(series, seriesIndex);

    return result ? { slices: result } : null;

    function extractDataPoints(series: SeriesType, seriesIndex: number): DataPoints | null {
        if (!series.dataSource.items) {
            return null;
        }
        const data: DataPoints = [];
        let index = 0;
        for (const item of series.dataSource.items) {
            const x = ensure(series.XAttribute).get(item);
            const y = ensure(series.YAttribute).get(item);
            if (x.status !== ValueStatus.Available || y.status !== ValueStatus.Available || y.value === undefined) {
                return null;
            }
            if (!x.value) {
                // Y's type is validated in the modeler. An Y attribute can only be a Decimal/Int/Long, which is a Big here in client.
                console.error(
                    `[${name}]: X attribute value of item ${index + 1} in series ${
                        seriesIndex + 1
                    } is invalid. Please ensure your X attributes are non-empty strings or valid Dates.`
                );
                return null;
            }
            data.push({
                x: x.formatter.format(x.value),
                y: Number(y.value.toString()),
                stylingKey: series.sliceStylingKey?.get(item).value || undefined
            });
            index++;
        }

        return data;
    }
}
