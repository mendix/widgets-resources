import { SliderPreviewProps } from "../../typings/SliderProps";

interface GetPreviewValuesParams extends Omit<SliderPreviewProps, "class"> {}

interface PreviewValues {
    min: number;
    max: number;
    value: number;
    step: number;
}

export function getPreviewValues(params: GetPreviewValuesParams): PreviewValues {
    const min = params.minValueType === "static" ? params.staticMinimumValue ?? 0 : 0;
    const max = params.maxValueType === "static" ? params.staticMaximumValue ?? 100 : 100;
    const step = params.stepSizeType === "static" ? params.stepValue ?? 1 : 1;
    const value = max - (max - min) / 2;

    return { min, max, value, step };
}
