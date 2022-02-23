import { FilterValue } from "@mendix/piw-utils-internal/components/web";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";

export type DefaultFilterValue = {
    type: DefaultFilterEnum;
    value?: Date;
    startDate?: Date;
    endDate?: Date;
};

export function translateFilters(filters?: FilterValue[]): DefaultFilterValue | undefined {
    if (filters && filters.length > 0) {
        if (filters.length === 1) {
            const [filter] = filters;
            let type: DefaultFilterEnum = "greater";
            switch (filter.type) {
                case ">":
                    type = "greater";
                    break;
                case ">=":
                    type = "greaterEqual";
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
        } else {
            const [filterStart, filterEnd] = filters;
            let type: DefaultFilterEnum = "equal";
            if (filterStart.type === ">=" && filterEnd.type === "<") {
                type = "equal";
            } else if (filterStart.type === "<" && filterEnd.type === ">=") {
                type = "notEqual";
            } else if (filterStart.type === ">=" && filterEnd.type === "<=") {
                return {
                    type: "between",
                    startDate: filterStart.value,
                    endDate: filterEnd.value
                };
            }
            return {
                type,
                value: filterStart.value
            };
        }
    }
    return undefined;
}
