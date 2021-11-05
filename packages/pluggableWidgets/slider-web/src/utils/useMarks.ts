import { SliderContainerProps } from "../../typings/SliderProps";
import { getMinValue } from "./getMinValue";
import { getMaxValue } from "./getMaxValue";
import { useMemo } from "react";
import { createMarks } from "./marks";

export function useMarks(props: SliderContainerProps): ReturnType<typeof createMarks> {
    const { noOfMarkers, decimalPlaces } = props;
    const min = getMinValue(props);
    const max = getMaxValue(props);

    return useMemo(
        () =>
            createMarks({
                numberOfMarks: noOfMarkers,
                decimalPlaces,
                min,
                max
            }),
        [min, max, noOfMarkers, decimalPlaces]
    );
}
