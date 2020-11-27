import { VictoryLineProps } from "victory-line";

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
