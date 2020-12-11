import {
    UsePaginationOptions,
    UsePaginationState,
    UseSortByColumnOptions,
    UseSortByOptions,
    UseSortByColumnProps,
    UseSortByInstanceProps,
    UseColumnOrderInstanceProps,
    UsePaginationInstanceProps,
    UseColumnOrderState,
    UseSortByState
} from "react-table";
import { ReactNode } from "react";
import { WidthEnum } from "./DatagridProps";

declare module "react-table" {
    export interface TableOptions<D extends object>
        extends UsePaginationOptions<D>,
            UseSortByColumnOptions<D>,
            UseSortByOptions<D> {}

    export interface ColumnInterface<D extends object = {}> extends UseSortByColumnOptions<D> {
        alignment: string;
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
            UseSortByState<D> {}

    export interface TableInstance<D extends object = {}>
        extends UseSortByInstanceProps<D>,
            UseColumnOrderInstanceProps<D>,
            UsePaginationInstanceProps<D> {
        rowIndex: number;
    }

    export interface ColumnInstance<D extends object> extends UseSortByColumnProps<D> {}
}
