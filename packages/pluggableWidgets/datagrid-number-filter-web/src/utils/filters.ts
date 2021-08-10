import { DefaultFilterEnum } from "../../typings/DatagridNumberFilterProps";
import { Big } from "big.js";
import { FilterValue } from "@mendix/piw-utils-internal";

export type DefaultFilterValue = {
    type: DefaultFilterEnum;
    value: Big;
};

export function translateFilters(filters?: FilterValue[]): DefaultFilterValue | undefined {
    if (filters && filters.length === 1) {
        const [filter] = filters;
        let type: DefaultFilterEnum = "equal";
        switch (filter.type) {
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
            value: filter.value
        };
    }
    return undefined;
}
