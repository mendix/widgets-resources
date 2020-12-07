import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps, VictoryCommonProps } from "victory-core";
import { VictoryLineProps } from "victory-line";
import { VictoryScatterProps } from "victory-scatter";

import { LineChartAxisStyle, LineChartGridStyle, LineChartLineStyle } from "../ui/Styles";

export function mapToGridStyle(gridStyle?: LineChartGridStyle): VictoryChartProps["style"] {
    return {
        background: {
            fill: gridStyle?.backgroundColor
        }
    };
}

export function mapToAxisStyle<T extends "X" | "Y">(
    gridStyle?: LineChartGridStyle,
    axisStyle?: LineChartAxisStyle<T>
): VictoryAxisCommonProps["style"] {
    return {
        axis: {
            stroke: axisStyle?.lineColor,
            strokeDasharray: axisStyle?.dashArray,
            strokeWidth: axisStyle?.lineWidth
        },
        grid: {
            stroke: gridStyle?.lineColor,
            strokeDasharray: gridStyle?.dashArray,
            strokeWidth: gridStyle?.lineWidth
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

export function mapToLineStyle(lineStyle: LineChartLineStyle["line"]): VictoryLineProps["style"] {
    return {
        data: {
            stroke: lineStyle?.lineColor,
            strokeDasharray: lineStyle?.dashArray,
            strokeLinecap: lineStyle?.ending,
            strokeWidth: lineStyle?.lineWidth
        }
    };
}
export function mapToMarkerStyle(markersStyle: LineChartLineStyle["markers"]): VictoryScatterProps["style"] {
    return {
        data: {
            fill: markersStyle?.backgroundColor,
            stroke: markersStyle?.borderColor,
            strokeWidth: markersStyle?.borderWidth
        }
    };
}

export function aggregateGridPadding(gridStyle?: LineChartGridStyle): VictoryCommonProps["padding"] {
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
