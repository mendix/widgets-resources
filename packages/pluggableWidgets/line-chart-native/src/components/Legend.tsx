import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { LineChartLegendStyle } from "../ui/Styles";

export interface LegendProps {
    items: LegendItem[];
    style?: LineChartLegendStyle;
    itemColors: string[];
}

export interface LegendItem {
    name?: string;
}

export function Legend(props: LegendProps): ReactElement | null {
    const { items, style, itemColors } = props;

    const legendItems = useMemo(
        () =>
            items
                .map((series, index) =>
                    series.name !== undefined ? (
                        <View key={index} style={style?.item}>
                            <View style={[{ backgroundColor: itemColors[index] }, style?.indicator]} />
                            <Text style={style?.label}>{series.name}</Text>
                        </View>
                    ) : null
                )
                .filter(Boolean),
        [items]
    );

    return legendItems.length > 0 ? <View style={style?.container}>{legendItems}</View> : null;
}
