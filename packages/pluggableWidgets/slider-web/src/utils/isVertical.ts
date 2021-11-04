import { OrientationEnum } from "../../typings/SliderProps";

export function isVertical(params: { orientation: OrientationEnum }): boolean {
    return params.orientation === "vertical";
}
