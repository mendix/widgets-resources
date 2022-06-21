import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { ColumnChartLegendStyle } from "../ui/Styles";

export interface LegendProps {
    series: LegendSeries[];
    style?: ColumnChartLegendStyle;
    seriesColors: string[];
}

export interface LegendSeries {
    name?: string;
}

export function Legend(props: LegendProps): ReactElement | null {
    const { series, style, seriesColors } = props;

    const legendItems = useMemo(
        () =>
            series
                .map((series, index) =>
                    series.name !== undefined ? (
                        <View key={index} style={style?.item}>
                            <View style={[{ backgroundColor: seriesColors[index] }, style?.indicator]} />
                            <Text style={style?.label}>{series.name}</Text>
                        </View>
                    ) : null
                )
                .filter(Boolean),
        [series]
    );

    return legendItems.length > 0 ? <View style={style?.container}>{legendItems}</View> : null;
}
