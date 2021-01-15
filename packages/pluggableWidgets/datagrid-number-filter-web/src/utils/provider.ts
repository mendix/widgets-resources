import { Context, Dispatch } from "react";
import { ObjectItem, ListAttributeValue } from "mendix";

export interface FilterFunction {
    filter(item: ObjectItem, attribute: ListAttributeValue): boolean;
}

export function getFilterDispatcher(): Context<Dispatch<FilterFunction>> | undefined {
    return (window as any)["com.mendix.widgets.web.datagrid.filterContext"] as Context<Dispatch<FilterFunction>>;
}
