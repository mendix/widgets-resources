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

    const legendItems = useMemo(
        () =>
            series
                .map((series, index) => {
                    if (!series.name || !series.stylePropertyName || !style.series) {
                        return undefined;
                    }

                    const seriesStyle = style.series[series.stylePropertyName];
                    const backgroundColor = seriesStyle?.line?.data?.stroke;

                    if (!(typeof backgroundColor === "string")) {
                        return undefined;
                    }

                    return (
                        <View key={index} style={style.legend?.item}>
                            <View style={[{ backgroundColor }, style.legend?.indicator]} />
                            <Text style={style.legend?.label}>{series.name}</Text>
                        </View>
                    );
                })
                .filter(Boolean),
        [series]
    );

    return legendItems.length > 0 ? <View style={style.legend?.container}>{legendItems}</View> : null;
}
