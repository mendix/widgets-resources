import { Context, createContext, Dispatch, SetStateAction, useState } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export type FilterValue = { type: string; value: any };

export const enum FilterType {
    STRING = "string",
    NUMBER = "number",
    ENUMERATION = "enum",
    DATE = "date"
}

export interface FilterFunction {
    getFilterCondition: () => FilterCondition | undefined;
    filterType?: FilterType;
}

export interface FilterContextValue {
    filterDispatcher: Dispatch<FilterFunction>;
    singleAttribute?: ListAttributeValue;
    multipleAttributes?: { [id: string]: ListAttributeValue };
    singleInitialFilter?: FilterValue[];
    multipleInitialFilters?: { [id: string]: FilterValue[] };
}

export function getFilterDispatcher(): Context<FilterContextValue> | undefined {
    return (global as any)["com.mendix.widgets.native.filterable.filterContext"] as Context<FilterContextValue>;
}

export function useFilterContext(): { FilterContext: Context<FilterContextValue> } {
    const globalFilterContext = getFilterDispatcher();
    if (globalFilterContext) {
        return { FilterContext: globalFilterContext };
    }

    const FilterContext = createContext<FilterContextValue>(undefined as any);

    (global as any)["com.mendix.widgets.native.filterable.filterContext"] = FilterContext;
    return { FilterContext };
}

export function useMultipleFiltering(): {
    [key: string]: [FilterFunction | undefined, Dispatch<SetStateAction<FilterFunction>>];
} {
    return {
        [FilterType.STRING]: useState<FilterFunction>(),
        [FilterType.NUMBER]: useState<FilterFunction>(),
        [FilterType.DATE]: useState<FilterFunction>(),
        [FilterType.ENUMERATION]: useState<FilterFunction>()
    };
}
