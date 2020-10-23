import { TextStyle, ViewStyle } from "react-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps, VictoryLabelProps } from "victory-core";
import { VictoryLineProps } from "victory-line";
import { VictoryScatterProps } from "victory-scatter";

export interface LineChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface LineChartSeriesStyle {
    line?: VictoryLineProps["style"];
    markers?: VictoryScatterProps["style"] & {
        display?: "false" | "underneath" | "onTop";
        size?: VictoryScatterProps["size"];
    };
}

export interface LineChartStyle {
    container?: ViewStyle;
    legend?: LineChartLegendStyle;
    chart?: VictoryChartProps["style"] & { padding?: VictoryCommonProps["padding"] };
    xAxis?: VictoryAxisCommonProps["style"] & {
        axisLabel?: { horizontalOffset?: VictoryLabelProps["dx"]; verticalOffset?: VictoryLabelProps["dy"] };
    };
    yAxis?: VictoryAxisCommonProps["style"] & {
        axisLabel?: { horizontalOffset?: VictoryLabelProps["dy"]; verticalOffset?: VictoryLabelProps["dx"] };
    };
    series?: { [key: string]: LineChartSeriesStyle };
}

export const defaultLineChartStyle: LineChartStyle = {
    container: {
        flex: 1
    },
    legend: {
        container: {
            borderColor: "black",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: 10
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            padding: 10
        },
        indicator: {
            marginRight: 5,
            height: 5,
            width: 10
        }
    },
    chart: {
        padding: { left: 75, top: 25, bottom: 50, right: 25 }
    },
    xAxis: {
        axisLabel: { verticalOffset: 10 }
    },
    yAxis: {
        axisLabel: { horizontalOffset: -10 }
    }
};
