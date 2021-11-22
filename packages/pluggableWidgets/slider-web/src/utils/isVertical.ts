import { SliderContainerProps } from "../../typings/SliderProps";

export function isVertical(params: Pick<SliderContainerProps, "orientation">): boolean {
    return params.orientation === "vertical";
}
