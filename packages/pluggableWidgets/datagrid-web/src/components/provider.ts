import { createContext } from "react";
import { FilterContextValue } from "@mendix/piw-utils-internal";

export const FilterContext = createContext((undefined as any) as FilterContextValue);

(window as any)["com.mendix.widgets.web.datagrid.filterContext"] = FilterContext;
