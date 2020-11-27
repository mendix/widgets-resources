import { VictoryLineProps } from "victory-line";
import { VictoryScatterProps } from "victory-scatter";

import { LineChartLineStyle } from "../ui/Styles";

export function mapLineStyleToLib(lineStyle: LineChartLineStyle["line"]): VictoryLineProps["style"] {
    return {
        data: {
            stroke: lineStyle?.color,
            strokeDasharray: lineStyle?.dashArray,
            strokeLinecap: lineStyle?.ending,
            strokeWidth: lineStyle?.width
        }
    };
}
export function mapMarkerStyleToLib(markersStyle: LineChartLineStyle["markers"]): VictoryScatterProps["style"] {
    return {
        data: {
            fill: markersStyle?.backgroundColor,
            stroke: markersStyle?.borderColor,
            strokeWidth: markersStyle?.borderWidth
        }
    };
}
