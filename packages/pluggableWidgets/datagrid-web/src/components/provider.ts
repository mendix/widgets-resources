import { createContext, Dispatch, useContext } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export const FilterContext = createContext((undefined as any) as Dispatch<FilterFunction>);

(window as any)["com.mendix.widgets.web.datagrid.filterContext"] = FilterContext;

export interface FilterFunction {
    getFilterCondition(attribute: ListAttributeValue): FilterCondition | undefined;
}

export function useFilterDispatcher(): Dispatch<FilterFunction> {
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
