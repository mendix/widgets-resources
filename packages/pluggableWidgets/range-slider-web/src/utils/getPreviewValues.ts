import { RangeSliderPreviewProps } from "../../typings/RangeSliderProps";

interface GetPreviewValuesParams extends Omit<RangeSliderPreviewProps, "class"> {}

interface PreviewValues {
    min: number;
    max: number;
    value: [number, number];
    step: number;
}

export function getPreviewValues(params: GetPreviewValuesParams): PreviewValues {
    const min = params.minValueType === "static" ? params.staticMinimumValue ?? 0 : 0;
    const max = params.maxValueType === "static" ? params.staticMaximumValue ?? 100 : 100;
    const step = params.stepSizeType === "static" ? params.stepValue ?? 1 : 1;
    const range = max - min;
    const lower = range * 0.25 + min;
    const upper = range * 0.75 + min;
    const value: [number, number] = [lower, upper];

    return { min, max, value, step };
}
