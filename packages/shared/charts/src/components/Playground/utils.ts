function isNonEmptyString(value: undefined | null | string): value is string {
    return value !== null && value !== undefined && value !== "";
}

export const emptyObjectString = "{}";

export function ifNonEmptyStringElseEmptyObjectString(value: undefined | null | string): string {
    return isNonEmptyString(value) ? value : emptyObjectString;
}
