import { Context, Dispatch } from "react";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";

export interface FilterFunction {
    getFilterCondition(attribute: ListAttributeValue): FilterCondition | undefined;
}

export function getFilterDispatcher(): Context<Dispatch<FilterFunction>> | undefined {
    return (window as any)["com.mendix.widgets.web.datagrid.filterContext"] as Context<Dispatch<FilterFunction>>;
}
