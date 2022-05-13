import { TextStyle, ViewStyle } from "react-native";

export interface ColumnChartGridStyle {
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

export interface ColumnChartAxisStyle<T extends "X" | "Y"> {
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

interface ColumnChartColumnStyle {
    ending?: number;
    columnColor?: string;
    width?: number;
}

interface ColumnChartColumnLabelStyle {
    // color is the same as Column color
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

export interface ColumnChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface ColumnChartStyle {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: ColumnChartGridStyle;
    xAxis?: ColumnChartAxisStyle<"X">;
    yAxis?: ColumnChartAxisStyle<"Y">;
    legend?: ColumnChartLegendStyle;
    domain?: {
        padding?: { x?: number; y?: number };
    };
    columns?: {
        columnColorPalette?: string;
        columnsOffset?: number; // only applicable to Grouped presentation mode
        customColumnStyles?: {
            [key: string]: {
                column?: ColumnChartColumnStyle;
                label?: ColumnChartColumnLabelStyle;
            };
        };
    };
}

export const defaultColumnChartStyle: ColumnChartStyle = {
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
