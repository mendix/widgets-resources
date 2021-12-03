import { RangeSliderContainerProps } from "../../typings/RangeSliderProps";

export function isVertical(params: Pick<RangeSliderContainerProps, "orientation">): boolean {
    return params.orientation === "vertical";
}
