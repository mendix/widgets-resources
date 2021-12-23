import { LinesType } from "../../typings/BubbleChartProps";
import { Dimensions } from "@mendix/piw-utils-internal";

const getRandomNumbers = (count: number, rangeMax: number, rangeMin = 0): number[] => {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.round(Math.random() * (rangeMax - rangeMin + 1) + rangeMin));
    }

    return numbers;
};

export function getSampleTraces() {
    return {
        x: ["Sample 1", "Sample 2", "Sample 3", "Sample 4"],
        y: getRandomNumbers(4, 100),
        marker: { size: getRandomNumbers(4, 100, 20) }
    };
}

export const getMarkerSizeReference = (props: LinesType, markerSize: number[], dimensions?: Dimensions): number => {
    if (props.autosize) {
        const width = dimensions ? dimensions.width : 0;
        const height = dimensions ? dimensions.height : 0;
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

export const calculateBubbleSize = (series: LinesType[], scatterData: any[]) => {
    return scatterData.map((data, index) => {
        const sizeref = series.length ? getMarkerSizeReference(series[index], data.marker.size as number[]) : 1;
        // Temporary remove custom data, as it contains mx objects with circular reference.
        const customdata = data.customdata;
        delete data.customdata;

        return {
            ...data,
            ...customdata,
            marker: { sizemode: "diameter", sizeref }
        };
    });
};
