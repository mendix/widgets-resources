export interface Marks {
    [value: number]: string;
}

export interface CreateMarksParams {
    numberOfMarks: number;
    decimalPlaces: number;
    min: number;
    max: number;
}

export function isParamsValidToCalcMarks(params: CreateMarksParams): boolean {
    return params.numberOfMarks > 0 && params.min < params.max;
}

export function createMarks(params: CreateMarksParams): Marks | undefined {
    if (!isParamsValidToCalcMarks(params)) {
        return;
    }

    const marks: Marks = {};
    const { numberOfMarks, decimalPlaces, min, max } = params;
    const interval = (max - min) / numberOfMarks;

    for (let i = 0; i <= numberOfMarks; i++) {
        const value = parseFloat((min + i * interval).toFixed(decimalPlaces));
        marks[value] = value.toString();
    }

    return marks;
}
