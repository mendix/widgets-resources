import {
    UseFiltersColumnOptions,
    UseFiltersOptions,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsOptions,
    UseSortByColumnOptions,
    UseSortByOptions,
    UseSortByInstanceProps,
    UseColumnOrderInstanceProps,
    UsePaginationInstanceProps,
    UseFiltersColumnProps
} from "react-table";

declare module "react-table" {
    import { UseResizeColumnsColumnProps, UseSortByColumnProps } from "react-table";

    export interface TableOptions<D extends object>
        extends UseFiltersOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            UseSortByColumnOptions<D>,
            UseSortByOptions<D> {}

    export interface ColumnInterface<D extends object = {}>
        extends UseFiltersColumnOptions<D>,
            UseSortByColumnOptions<D>,
            UseResizeColumnsOptions<D> {
        canHide?: boolean;
        canDrag?: boolean;
    }

    export interface TableState<D extends object = {}> extends UsePaginationState<D> {}

    export interface TableInstance<D extends object = {}>
        extends UseSortByInstanceProps<D>,
            UseColumnOrderInstanceProps<D>,
            UsePaginationInstanceProps<D> {}

    export interface ColumnInstance<D extends object>
        extends UseFiltersColumnProps<D>,
            UseSortByColumnProps<D>,
            UseResizeColumnsColumnProps<D> {}
}
