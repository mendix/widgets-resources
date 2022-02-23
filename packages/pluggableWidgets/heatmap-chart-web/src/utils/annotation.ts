import { ChartAnnotation } from "@mendix/shared-charts";

export function createHeatMapAnnotation(
    x?: string,
    y?: string,
    text?: string,
    colorValue?: string
): Partial<ChartAnnotation> {
    return {
        xref: "x",
        yref: "y",
        x,
        y,
        text,
        font: {
            family: "Open Sans",
            size: 14,
            color: colorValue || "#555"
        },
        showarrow: false
    };
}
