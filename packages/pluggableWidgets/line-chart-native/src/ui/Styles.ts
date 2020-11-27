import { TextStyle, ViewStyle } from "react-native";
import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";

export interface LineChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface LineChartLineStyle {
    line?: {
        color?: string;
        dashArray?: string;
        ending?: "flat" | "round";
        width?: number;
    };
    markers?: {
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
        display?: "false" | "underneath" | "onTop";
        size?: number;
        symbol?: "circle" | "diamond" | "plus" | "minus" | "square" | "star" | "triangleDown" | "triangleUp";
    };
}

export interface LineChartStyle {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    gridWrapper?: ViewStyle;
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
    lineStyles?: { [key: string]: LineChartLineStyle };
    lineColorPalette?: string[];
}

export const defaultLineChartStyle: LineChartStyle = {
    container: {
        flex: 1
    },
    errorMessage: {
        color: "red"
    },
    chart: {
        flex: 1
    },
    gridWrapper: {
        flex: 1
    },
    xAxisLabel: {
        alignSelf: "center"
    },
    // TODO Remove this temp linestyle
    lineStyles: {
        mendix: {
            line: {
                color: "rgba(255,0,0,0.3)",
                dashArray: "10,3",
                ending: "flat",
                width: 15
            },
            markers: {
                backgroundColor: "blue",
                borderColor: "red",
                borderWidth: 3,
                display: "onTop",
                size: 10,
                symbol: "diamond"
            }
        }
    },
    legend: {
        container: {
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
            height: 10,
            width: 10
        }
    }
};
