import { Context, createContext, Dispatch } from "react";
import { ListAttributeValue } from "mendix";

export type SortDirection = "asc" | "desc";
export type ListAttributeId = string & {
    __attributeIdTag: never;
};
export type SortInstruction = [id: ListAttributeId, dir: SortDirection];

export interface SortFunction {
    getSortCondition: () => SortInstruction | undefined;
}

export interface SortContextValue {
    sortDispatcher: Dispatch<SortFunction>;
    attributes?: Array<{ attribute: ListAttributeValue; caption: string }>;
    initialSort?: SortInstruction[];
}

export function getSortDispatcher(): Context<SortContextValue> | undefined {
    return (global as any)["com.mendix.widgets.native.sortable.sortContext"] as Context<SortContextValue>;
}

export function useSortContext(): { SortContext: Context<SortContextValue> } {
    const globalSortContext = getSortDispatcher();
    if (globalSortContext) {
        return { SortContext: globalSortContext };
    }

    const SortContext = createContext<SortContextValue>(undefined as any);

    (global as any)["com.mendix.widgets.native.sortable.sortContext"] = SortContext;
    return { SortContext };
}
