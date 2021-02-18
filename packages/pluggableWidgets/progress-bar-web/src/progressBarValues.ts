export interface ProgressBarValues {
    currentValue: number;
    minValue: number;
    maxValue: number;
}

export const defaultValues: ProgressBarValues = {
    currentValue: 50,
    minValue: 0,
    maxValue: 100
};
