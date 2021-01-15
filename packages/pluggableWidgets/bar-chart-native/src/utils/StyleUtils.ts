import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";
import { VictoryBarProps } from "victory-bar";

import { BarChartAxisStyle, BarChartGridStyle, BarChartStyle } from "../ui/Styles";

export function mapToGridStyle(
    gridStyle?: BarChartGridStyle
): Pick<NonNullable<VictoryChartProps["style"]>, "background"> {
    return {
        background: {
            fill: gridStyle?.backgroundColor
        }
    };
}

export function mapToAxisStyle<T extends "X" | "Y">(
    gridStyle?: BarChartGridStyle,
    axisStyle?: BarChartAxisStyle<T>
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

function mapToBarStyle(
    fallbackColor: string,
    style?: NonNullable<NonNullable<BarChartStyle["bars"]>["customBarStyles"]>["key"]
): NonNullable<VictoryBarProps["style"]>["data"] {
    return {
        fill: style?.bar?.barColor ?? fallbackColor
    };
}

function mapToBarLabelStyle(
    fallbackColor: string,
    style?: NonNullable<NonNullable<BarChartStyle["bars"]>["customBarStyles"]>["key"]
): NonNullable<VictoryBarProps["style"]>["labels"] {
    const fill = style?.bar?.barColor ?? fallbackColor;

    return {
        fill,
        fontSize: style?.label?.fontSize,
        fontFamily: style?.label?.fontFamily,
        fontStyle: style?.label?.fontStyle,
        fontWeight: style?.label?.fontWeight
    };
}

export function mapToBarStyles(
    fallbackColor: string,
    style?: NonNullable<NonNullable<BarChartStyle["bars"]>["customBarStyles"]>["key"]
) {
    return {
        bar: mapToBarStyle(fallbackColor, style),
        labels: mapToBarLabelStyle(fallbackColor, style),
        cornerRadius: style?.bar?.ending,
        width: style?.bar?.width
    };
}

export function aggregateGridPadding(gridStyle?: BarChartGridStyle): VictoryCommonProps["padding"] {
    if (!gridStyle) {
        return;
    }

    const {
        padding,
        paddingHorizontal,
        paddingVertical,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    } = gridStyle;

    return {
        top: paddingTop ?? paddingVertical ?? padding,
        right: paddingRight ?? paddingHorizontal ?? padding,
        bottom: paddingBottom ?? paddingVertical ?? padding,
        left: paddingLeft ?? paddingHorizontal ?? padding
    };
}
