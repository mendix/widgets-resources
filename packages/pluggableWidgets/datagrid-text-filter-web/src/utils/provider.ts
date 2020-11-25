import { createContext, Dispatch, useContext } from "react";
import { ObjectItem, ListAttributeValue } from "mendix";

export const FilterContext = createContext((undefined as any) as Dispatch<FilterFunction>);

(window as any)["com.mendix.widgets.web.datagrid.filterContext"] = FilterContext;

export interface FilterFunction {
    filter(item: ObjectItem, attribute: ListAttributeValue): boolean;
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
