import Big from "big.js";
import { compareAsc } from "date-fns";

type AttributeValue = string | boolean | Date | Big | undefined;

/**
 * Comparison function for sorting items of type `AttributeValue`. Please note that in order to use
 * this function, you HAVE to include `date-fns` as a dependency in your widget package.json.
 */
export function valueAttributeCompareFn(
    firstItemSortValue: AttributeValue,
    secondItemSortValue: AttributeValue
): number {
    // Handle undefined case separately so TypeScript can infer types in later clauses.
    if (firstItemSortValue === undefined || secondItemSortValue === undefined) {
        if (firstItemSortValue === secondItemSortValue) {
            return 0;
        }
        return firstItemSortValue === undefined ? 1 : -1;
    }
    // Different types shouldn't happen and aren't comparable.
    if (typeof firstItemSortValue !== typeof secondItemSortValue) {
        return 0;
    }
    // Check the types exhaustively from both vars so TypeScript properly infers the types.
    if (
        typeof firstItemSortValue === "string" ||
        typeof secondItemSortValue === "string" ||
        typeof firstItemSortValue === "boolean" ||
        typeof secondItemSortValue === "boolean"
    ) {
        return firstItemSortValue.toString().localeCompare(secondItemSortValue.toString());
    }
    if (firstItemSortValue instanceof Date || secondItemSortValue instanceof Date) {
        // @ts-expect-error Based on the unequal comparison earlier, both of these are Date.
        return compareAsc(firstItemSortValue, secondItemSortValue);
    }
    // Latest remaining type is `Big`.
    return firstItemSortValue.minus(secondItemSortValue).toNumber();
}
