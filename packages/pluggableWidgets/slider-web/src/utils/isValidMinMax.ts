import { SliderContainerProps } from "../../typings/SliderProps";
import { getMinValue } from "./getMinValue";
import { getMaxValue } from "./getMaxValue";

export function isValidMinMax(props: SliderContainerProps) {
    const min = getMinValue(props);
    const max = getMaxValue(props);
    return min < max;
}
