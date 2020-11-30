import { VictoryChartProps } from "victory-chart";
import { VictoryAxisCommonProps } from "victory-core";
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
        axis: { stroke: axisStyle?.color, strokeDasharray: axisStyle?.dashArray, strokeWidth: axisStyle?.width },
        grid: { stroke: gridStyle?.color, strokeDasharray: gridStyle?.dashArray, strokeWidth: gridStyle?.width },
        tickLabels: {
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
            stroke: lineStyle?.color,
            strokeDasharray: lineStyle?.dashArray,
            strokeLinecap: lineStyle?.ending,
            strokeWidth: lineStyle?.width
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
