import {
    UseFiltersColumnOptions,
    UseFiltersOptions,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsOptions,
    UseSortByColumnOptions,
    UseSortByOptions,
    UseSortByColumnProps,
    UseSortByInstanceProps,
    UseColumnOrderInstanceProps,
    UseResizeColumnsColumnProps,
    UsePaginationInstanceProps,
    UseFiltersColumnProps,
    UseColumnOrderState,
    UseSortByState,
    UseFiltersState
} from "react-table";
import { ReactNode } from "react";

declare module "react-table" {
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
        hidden?: boolean;
        customFilter?: ReactNode;
        weight?: number;
    }

    export interface TableState<D extends object = {}>
        extends UsePaginationState<D>,
            UseColumnOrderState<D>,
            UseSortByState<D>,
            UseFiltersState<D> {}

    export interface TableInstance<D extends object = {}>
        extends UseSortByInstanceProps<D>,
            UseColumnOrderInstanceProps<D>,
            UsePaginationInstanceProps<D> {}

    export interface ColumnInstance<D extends object>
        extends UseFiltersColumnProps<D>,
            UseSortByColumnProps<D>,
            UseResizeColumnsColumnProps<D> {}
}
