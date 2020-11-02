import {
    UseFiltersColumnOptions,
    UseFiltersOptions,
    UsePaginationOptions,
    UsePaginationState,
    UseSortByColumnOptions,
    UseSortByOptions,
    UseSortByColumnProps,
    UseSortByInstanceProps,
    UseColumnOrderInstanceProps,
    UsePaginationInstanceProps,
    UseFiltersColumnProps,
    UseColumnOrderState,
    UseSortByState,
    UseFiltersState
} from "react-table";
import { ReactNode } from "react";
import { WidthEnum } from "./DatagridProps";

declare module "react-table" {
    export interface TableOptions<D extends object>
        extends UseFiltersOptions<D>,
            UsePaginationOptions<D>,
            UseSortByColumnOptions<D>,
            UseSortByOptions<D> {}

    export interface ColumnInterface<D extends object = {}>
        extends UseFiltersColumnOptions<D>,
            UseSortByColumnOptions<D> {
        canHide?: boolean;
        canDrag?: boolean;
        canResize?: boolean;
        hidden?: boolean;
        customFilter?: ReactNode;
        weight?: number;
        width?: WidthEnum;
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

    export interface ColumnInstance<D extends object> extends UseFiltersColumnProps<D>, UseSortByColumnProps<D> {}
}
