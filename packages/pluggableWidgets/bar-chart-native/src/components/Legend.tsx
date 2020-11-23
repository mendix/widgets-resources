import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { BarChartStyle } from "../ui/Styles";

export interface LegendProps {
    series: LegendSeries[];
    style: BarChartStyle;
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
                .map((series, index) =>
                    series.name !== undefined ? (
                        <View key={index}>
                            <View />
                            <Text>{series.name}</Text>
                        </View>
                    ) : null
                )
                .filter(Boolean),
        [series]
    );

    return legendItems.length > 0 ? <View style={style?.container}>{legendItems}</View> : null;
}
