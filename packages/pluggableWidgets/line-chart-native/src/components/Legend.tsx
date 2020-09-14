import { createElement, ReactElement, useMemo } from "react";
import { Text, View } from "react-native";

import { LineChartStyle } from "../ui/Styles";

export interface LegendProps {
    series: Array<LegendSeries>;
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
            series.map((series, index) => {
                if (!(series.name && series.stylePropertyName && style.series)) {
                    return null;
                }

                const seriesStyle = style.series[series.stylePropertyName];
                const backgroundColor = seriesStyle?.line?.data?.stroke;

                if (!(typeof backgroundColor === "string")) {
                    return null;
                }

                return (
                    <View key={index} style={style.legend?.item}>
                        <View style={[{ backgroundColor: backgroundColor }, style.legend?.indicator]} />
                        <Text style={style.legend?.label}>{series.name}</Text>
                    </View>
                );
            }),
        [series]
    );

    return <View style={style.legend?.container}>{legendItems}</View>;
}
