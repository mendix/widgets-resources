import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps } from "victory-core";
import { VictoryBarProps } from "victory-bar";

import { BarChartAxisStyle, BarChartGridStyle, BarChartBarStyle, BarChartStyle } from "../ui/Styles";

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

export function mapToBarStyle(
    fallbackColor: string,
    style?: BarChartBarStyle
): { data: NonNullable<VictoryBarProps["style"]>["data"] } {
    return {
        data: {
            fill: style?.barColor ?? fallbackColor
        }
    };
}

export function mapToBarLabelStyle(
    fallbackColor: string,
    style?: NonNullable<BarChartStyle["barStyles"]>["key"]
): { labels: NonNullable<VictoryBarProps["style"]>["labels"] } {
    const fill = style?.barColor ?? fallbackColor;

    return {
        labels: {
            fill,
            fontSize: style?.fontSize,
            fontFamily: style?.fontFamily,
            fontStyle: style?.fontStyle,
            fontWeight: style?.fontWeight
        }
    };
}
