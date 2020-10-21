import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { LineChartStyle } from "../ui/Styles";

export interface LegendProps {
    series: LegendSeries[];
    style: LineChartStyle;
}

export interface LegendSeries {
    name?: string;
    stylePropertyName?: string;
}

export function Legend(props: LegendProps): ReactElement | null {
    const { series, style } = props;

    const legendItems = useMemo(() => {
        const legendItems = [];

        for (let i = 0; i < series.length; i++) {
            const currentSeries = series[i];

            if (!currentSeries.name || !currentSeries.stylePropertyName || !style.series) {
                continue;
            }

            const seriesStyle = style.series[currentSeries.stylePropertyName];
            const backgroundColor = seriesStyle?.line?.data?.stroke;

            if (!(typeof backgroundColor === "string")) {
                continue;
            }

            legendItems.push(
                <View key={i} style={style.legend?.item}>
                    <View style={[{ backgroundColor }, style.legend?.indicator]} />
                    <Text style={style.legend?.label}>{currentSeries.name}</Text>
                </View>
            );
        }

        return legendItems;
    }, [series]);

    return legendItems.length > 0 ? <View style={style.legend?.container}>{legendItems}</View> : null;
}
