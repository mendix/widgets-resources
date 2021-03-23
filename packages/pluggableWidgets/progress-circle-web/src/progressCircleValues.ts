export interface ProgressCircleValues {
    currentValue: number;
    minValue: number;
    maxValue: number;
}

export const defaultValues: ProgressCircleValues = {
    currentValue: 50,
    minValue: 0,
    maxValue: 100
};
