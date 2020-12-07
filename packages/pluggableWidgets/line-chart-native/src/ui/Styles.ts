import { TextStyle, ViewStyle } from "react-native";

export interface LineChartGridStyle {
    backgroundColor?: string;
    dashArray?: string;
    lineColor?: string;
    lineWidth?: number;
    padding?: number;
    paddingBottom?: number;
    paddingHorizontal?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingVertical?: number;
}

export interface LineChartAxisStyle<T extends "X" | "Y"> {
    color?: string;
    dashArray?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    lineColor?: string;
    lineWidth?: number;
    label?: TextStyle & {
        relativePositionGrid?: T extends "X" ? "bottom" | "right" : "top" | "left";
    };
}

export interface LineChartLineStyle {
    line?: {
        dashArray?: string;
        ending?: "flat" | "round";
        lineColor?: string;
        lineWidth?: number;
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

export interface LineChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface LineChartStyle {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: LineChartGridStyle;
    xAxis?: LineChartAxisStyle<"X">;
    yAxis?: LineChartAxisStyle<"Y">;
    legend?: LineChartLegendStyle;
    lines?: {
        lineColorPalette?: string;
        customLineStyles?: {
            [key: string]: LineChartLineStyle;
        };
    };
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
    grid: {
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 10
    },
    xAxis: {
        label: {
            alignSelf: "center"
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
