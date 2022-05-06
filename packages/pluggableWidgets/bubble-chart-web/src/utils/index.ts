import { LinesType } from "../../typings/BubbleChartProps";
import { Dimensions } from "@mendix/piw-utils-internal";

export const getMarkerSizeReference = (props: LinesType, markerSize: number[], dimensions?: Dimensions): number => {
    if (props.autosize) {
        const width = dimensions?.width ?? 0;
        const height = dimensions?.height ?? 0;
        let sizeRef = 1;
        const averageSize = (width + height) / 2;
        const percentageSize = averageSize / (1 / (props.sizeref / 100));

        if (markerSize.length > 0) {
            sizeRef = Math.max(...markerSize) / percentageSize;
        }

        return Math.round(sizeRef * 1000) / 1000;
    } else if (props.sizeref > 0) {
        const scale = props.sizeref;
        const percentageScale = scale / 100;

        return 1 / percentageScale;
    }

    return 1;
};

export const calculateSizeRef = (
    series: LinesType,
    marker: { size: number[] },
    dimensions?: Dimensions
): { sizemode: "diameter" | "area"; sizeref: number | undefined } => {
    const sizeref = getMarkerSizeReference(series, marker.size, dimensions);
    return { sizemode: "diameter", sizeref };
};
