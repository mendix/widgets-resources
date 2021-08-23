import { useEffect, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";

import { SeriesType } from "../../typings/PieDoughnutChartProps";
import { Slice, DataPoints } from "../components/PieDoughnutChart";

interface ChartSeries {
    slices: DataPoints;
}

export function useSeries(series: SeriesType[]): ChartSeries[] | null {
    const [chartSeries, setChartSeries] = useState<ChartSeries[] | null>(null);

    useEffect(() => {
        const loadedSeries: ChartSeries[] = [];
        for (const element of series) {
            const result = loadStaticSeries(element);
            if (!result) {
                setChartSeries(null);
                return;
            }
            loadedSeries.push(result);
        }
        setChartSeries(loadedSeries);
    }, [series]);

    return chartSeries;
}

function loadStaticSeries(series: SeriesType): ChartSeries | null {
    const dataPointsExtraction = extractDataPoints(series);

    if (!dataPointsExtraction) {
        return null;
    }

    return {
        slices: dataPointsExtraction
    };

    function extractDataPoints(series: SeriesType): Array<Slice<string, number>> | null {
        if (!series.dataSource.items) {
            return null;
        }
        const data: Array<Slice<string, number>> = [];
        for (const item of series.dataSource.items) {
            const x = ensure(series.XAttribute).get(item);
            const y = ensure(series.YAttribute).get(item);
            if (!x.value || !y.value) {
                return null;
            }
            data.push({
                x: x.formatter.format(x.value),
                y: Number(y.value.toString()),
                stylingKey: series.sliceStylingKey?.get(item).displayValue || undefined
            });
        }

        return data;
    }
}
