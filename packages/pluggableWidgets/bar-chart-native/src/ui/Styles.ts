import { TextStyle, ViewStyle } from "react-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";

export interface BarChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface BarChartSeriesStyle {}

export interface BarChartStyle {
    container?: ViewStyle;
    chart?: ViewStyle;
    gridAndLabelsRow?: ViewStyle;
    gridRow?: ViewStyle;
    grid?: VictoryChartProps["style"] & {
        padding?: VictoryCommonProps["padding"];
        xAxis?: VictoryAxisCommonProps["style"];
        yAxis?: VictoryAxisCommonProps["style"];
    };
    xAxisLabel?: TextStyle & {
        relativePositionGrid?: "bottom" | "right";
    };
    yAxisLabel?: TextStyle & {
        relativePositionGrid?: "top" | "left";
    };
    legend?: BarChartLegendStyle;
    series?: { [key: string]: BarChartSeriesStyle };
}

export const defaultBarChartStyle: BarChartStyle = {
    container: {
        flex: 1
    },
    chart: {
        flex: 1
    },
    gridAndLabelsRow: {
        flex: 1
    },
    gridRow: {
        flex: 1,
        flexDirection: "row"
    },
    grid: {
        padding: 120
    }
};
