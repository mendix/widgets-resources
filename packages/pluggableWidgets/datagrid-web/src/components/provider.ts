import { createContext, Dispatch, useContext } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export interface FilterFunction {
    getFilterCondition(): FilterCondition | undefined;
}

export interface FilterContextValue {
    filterDispatcher: Dispatch<FilterFunction>;
    attribute: ListAttributeValue;
}

export const FilterContext = createContext((undefined as any) as FilterContextValue);

(window as any)["com.mendix.widgets.web.datagrid.filterContext"] = FilterContext;

export function useFilterDispatcher(): FilterContextValue {
    const filterContext = (window as any)["com.mendix.widgets.web.datagrid.filterContext"] as
        | typeof FilterContext
        | undefined;
    return useContext(ensure(filterContext));
}

function ensure<T>(value: T | undefined): T {
    if (value == null) {
        throw new Error();
    }
    return value;
}
