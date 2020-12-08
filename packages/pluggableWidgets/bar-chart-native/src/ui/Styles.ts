import { TextStyle, ViewStyle } from "react-native";

export interface BarChartGridStyle {
    backgroundColor?: string;
    dashArray?: string;
    lineColor?: string;
    padding?: number;
    paddingBottom?: number;
    paddingHorizontal?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingVertical?: number;
    width?: number;
}

export interface BarChartAxisStyle<T extends "X" | "Y"> {
    color?: string;
    dashArray?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    label?: TextStyle & {
        relativePositionGrid?: T extends "X" ? "bottom" | "right" : "top" | "left";
    };
    lineColor?: string;
    width?: number;
}

interface BarChartBarStyle {
    ending?: number;
    barColor?: string;
    width?: number;
}

interface BarChartBarLabelStyle {
    // color is the same as bar color
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

export interface BarChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface BarChartStyle {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: BarChartGridStyle;
    xAxis?: BarChartAxisStyle<"X">;
    yAxis?: BarChartAxisStyle<"Y">;
    legend?: BarChartLegendStyle;
    domain?: {
        padding?: { x?: number; y?: number };
    };
    bars?: {
        barColorPalette?: string;
        barsOffset?: number; // only applicable to Grouped presentation mode
        customBarStyles?: {
            [key: string]: {
                bar?: BarChartBarStyle;
                label?: BarChartBarLabelStyle;
            };
        };
    };
}

export const defaultBarChartStyle: BarChartStyle = {
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
