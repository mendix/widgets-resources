import { Context, Dispatch } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export interface FilterFunction {
    getFilterCondition(): FilterCondition | undefined;
}

export interface FilterContextValue {
    filterDispatcher: Dispatch<FilterFunction>;
    attribute: ListAttributeValue;
}

export function getFilterDispatcher(): Context<FilterContextValue> | undefined {
    return (window as any)["com.mendix.widgets.web.datagrid.filterContext"] as Context<FilterContextValue>;
}
