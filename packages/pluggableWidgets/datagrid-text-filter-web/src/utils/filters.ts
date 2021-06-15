import { DefaultFilterEnum } from "../../typings/DatagridTextFilterProps";
import { FilterValue } from "./provider";

export declare type DefaultFilterValue = {
    type: DefaultFilterEnum;
    value: string;
};

export function translateFilters(filters: FilterValue[]): DefaultFilterValue | undefined {
    if (filters && filters.length === 1) {
        const [filter] = filters;
        let type: DefaultFilterEnum = "equal";
        switch (filter.type) {
            case "contains":
                type = "contains";
                break;
            case "startsWith":
            case "endsWith":
                type = filter.type;
                break;
            case ">":
                type = "greater";
                break;
            case ">=":
                type = "greaterEqual";
                break;
            case "=":
                type = "equal";
                break;
            case "!=":
                type = "notEqual";
                break;
            case "<":
                type = "smaller";
                break;
            case "<=":
                type = "smallerEqual";
                break;
        }
        return {
            type,
            value: String(filter.value)
        };
    }
    return undefined;
}
