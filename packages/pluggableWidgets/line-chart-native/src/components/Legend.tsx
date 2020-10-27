import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { LineChartStyle } from "../ui/Styles";

export interface LegendProps {
    series: LegendSeries[];
    style: LineChartStyle;
    colorScale: string[];
}

export interface LegendSeries {
    name?: string;
    stylePropertyName?: string;
}

export function Legend(props: LegendProps): ReactElement | null {
    const { series, style, colorScale } = props;

    const legendItems = useMemo(
        () =>
            series
                .map((series, index) =>
                    series.name !== undefined ? (
                        <View key={index} style={style.legend?.item}>
                            <View style={[{ backgroundColor: colorScale[index] }, style.legend?.indicator]} />
                            <Text style={style.legend?.label}>{series.name}</Text>
                        </View>
                    ) : null
                )
                .filter(Boolean),
        [series]
    );

    return legendItems.length > 0 ? <View style={style.legend?.container}>{legendItems}</View> : null;
}
