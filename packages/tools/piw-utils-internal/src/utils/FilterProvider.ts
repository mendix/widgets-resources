import { Context, createContext, Dispatch } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export type FilterValue = { type: string; value: any };

export interface FilterFunction {
    getFilterCondition: () => FilterCondition | undefined;
    filterId?: string;
}

export interface FilterContextValue {
    filterDispatcher: Dispatch<FilterFunction>;
    attribute?: ListAttributeValue;
    attributes?: { [id: string]: ListAttributeValue };
    initialFilter?: FilterValue[];
    initialFilters?: { [id: string]: FilterValue[] };
}

export function getFilterDispatcher(): Context<FilterContextValue> | undefined {
    return (window as any)["com.mendix.widgets.web.filterable.filterContext"] as Context<FilterContextValue>;
}

export function useFilterContext(): { FilterContext: Context<FilterContextValue> } {
    const globalFilterContext = getFilterDispatcher();
    if (globalFilterContext) {
        return { FilterContext: globalFilterContext };
    }

    const FilterContext = createContext((undefined as any) as FilterContextValue);

    (window as any)["com.mendix.widgets.web.filterable.filterContext"] = FilterContext;
    return { FilterContext };
}
