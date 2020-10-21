import { TextStyle, ViewStyle } from "react-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";
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
    chart?: ViewStyle;
    gridLabelWrapper?: ViewStyle;
    grid?: VictoryChartProps["style"] & {
        padding?: VictoryCommonProps["padding"];
        xAxis?: VictoryAxisCommonProps["style"];
        yAxis?: VictoryAxisCommonProps["style"];
    };
    xAxisLabel?: TextStyle;
    yAxisLabel?: TextStyle;
    legend?: LineChartLegendStyle;
    series?: { [key: string]: LineChartSeriesStyle };
}

export const defaultLineChartStyle: LineChartStyle = {
    container: {
        flex: 1
    },
    chart: {},
    gridLabelWrapper: {
        flexDirection: "row"
    },
    xAxisLabel: {
        // alignSelf: "center"
    },
    yAxisLabel: {},
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
    grid: {
        padding: { left: 75, top: 25, bottom: 50, right: 25 }
    }
};
