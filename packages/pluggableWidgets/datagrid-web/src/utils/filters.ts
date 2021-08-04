import { ListAttributeValue } from "mendix";
import { FilterCondition, FilterExpression, LiteralExpression } from "mendix/filters";

declare type SingleFilterCondition = FilterCondition & {
    arg1: FilterExpression;
    arg2: LiteralExpression;
};

export declare type FilterValue = { type: string; value: any };

export function extractFilters(attribute: ListAttributeValue | undefined, filter?: FilterCondition): FilterValue[] {
    if (!attribute || !filter) {
        return [];
    }
    const filters = extractAndOrStatements(filter);
    return filters
        ? filters
              .filter((a: SingleFilterCondition) => !!a.arg1 && !!a.arg2)
              .filter((f: SingleFilterCondition) => f.arg1.type === "attribute" && f.arg1.attributeId === attribute.id)
              .map((f: SingleFilterCondition) => ({
                  type: f.name,
                  value: f.arg2.value
              }))
        : [];
}

function extractAndOrStatements(filter?: FilterCondition): FilterCondition[] | undefined {
    if (filter && filter.type === "function" && (filter.name === "and" || filter.name === "or")) {
        return filter.args.flatMap(extractAndOrStatements).filter(f => f !== undefined) as FilterCondition[];
    }
    return filter ? [filter] : undefined;
}
