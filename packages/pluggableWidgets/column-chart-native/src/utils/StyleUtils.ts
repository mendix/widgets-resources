import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";
import { VictoryBarProps } from "victory-bar";

import { ColumnChartAxisStyle, ColumnChartGridStyle, ColumnChartStyle } from "../ui/Styles";

export function mapToGridStyle(
    gridStyle?: ColumnChartGridStyle
): Pick<NonNullable<VictoryChartProps["style"]>, "background"> {
    return {
        background: {
            fill: gridStyle?.backgroundColor
        }
    };
}

export function mapToAxisStyle<T extends "X" | "Y">(
    gridStyle?: ColumnChartGridStyle,
    axisStyle?: ColumnChartAxisStyle<T>
): Pick<NonNullable<VictoryAxisCommonProps["style"]>, "axis" | "grid" | "tickLabels"> {
    return {
        axis: {
            stroke: axisStyle?.lineColor,
            strokeDasharray: axisStyle?.dashArray,
            strokeWidth: axisStyle?.width
        },
        grid: {
            stroke: gridStyle?.lineColor,
            strokeDasharray: gridStyle?.dashArray,
            strokeWidth: gridStyle?.width
        },
        tickLabels: {
            fill: axisStyle?.color,
            fontFamily: axisStyle?.fontFamily,
            fontSize: axisStyle?.fontSize,
            fontStyle: axisStyle?.fontStyle,
            fontWeight: axisStyle?.fontWeight
        }
    };
}

function mapToColumnStyle(
    fallbackColor: string,
    style?: NonNullable<NonNullable<ColumnChartStyle["columns"]>["customColumnStyles"]>["key"]
): NonNullable<VictoryBarProps["style"]>["data"] {
    return {
        fill: style?.column?.columnColor ?? fallbackColor
    };
}

function mapToColumnLabelStyle(
    fallbackColor: string,
    style?: NonNullable<NonNullable<ColumnChartStyle["columns"]>["customColumnStyles"]>["key"]
): NonNullable<VictoryBarProps["style"]>["labels"] {
    const fill = style?.column?.columnColor ?? fallbackColor;

    return {
        fill,
        fontSize: style?.label?.fontSize,
        fontFamily: style?.label?.fontFamily,
        fontStyle: style?.label?.fontStyle,
        fontWeight: style?.label?.fontWeight
    };
}

export function mapToColumnStyles(
    fallbackColor: string,
    style?: NonNullable<NonNullable<ColumnChartStyle["columns"]>["customColumnStyles"]>["key"]
) {
    return {
        column: mapToColumnStyle(fallbackColor, style),
        labels: mapToColumnLabelStyle(fallbackColor, style),
        cornerRadius: style?.column?.ending,
        width: style?.column?.width
    };
}

export function aggregateGridPadding(gridStyle?: ColumnChartGridStyle): VictoryCommonProps["padding"] {
    if (!gridStyle) {
        return;
    }

    const { padding, paddingHorizontal, paddingVertical, paddingTop, paddingRight, paddingBottom, paddingLeft } =
        gridStyle;

    return {
        top: paddingTop ?? paddingVertical ?? padding,
        right: paddingRight ?? paddingHorizontal ?? padding,
        bottom: paddingBottom ?? paddingVertical ?? padding,
        left: paddingLeft ?? paddingHorizontal ?? padding
    };
}
