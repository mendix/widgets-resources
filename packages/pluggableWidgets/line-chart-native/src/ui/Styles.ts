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
    gridLabelCol?: ViewStyle;
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
    legend?: LineChartLegendStyle;
    series?: { [key: string]: LineChartSeriesStyle };
}

export const defaultLineChartStyle: LineChartStyle = {
    container: {
        flex: 1
    },
    chart: {
        flex: 1
    },
    gridLabelCol: {
        flex: 1
    },
    gridRow: {
        flex: 1,
        flexDirection: "row"
    },
    xAxisLabel: {
        relativePositionGrid: "bottom"
    },
    yAxisLabel: {
        relativePositionGrid: "top"
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
    }
};
