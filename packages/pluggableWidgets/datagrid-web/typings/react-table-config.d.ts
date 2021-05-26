import { UseColumnOrderInstanceProps, UseColumnOrderState } from "react-table";
import { ReactNode } from "react";
import { WidthEnum } from "./DatagridProps";

declare module "react-table" {
    export interface ColumnInterface<D extends object = {}> {
        alignment: string;
        canHide?: boolean;
        canDrag?: boolean;
        canSort?: boolean;
        canResize?: boolean;
        hidden?: boolean;
        customFilter?: ReactNode;
        weight?: number;
        width?: WidthEnum;
    }

    export interface TableState<D extends object = {}> extends UseColumnOrderState<D> {}

    export interface TableInstance<D extends object = {}> extends UseColumnOrderInstanceProps<D> {
        rowIndex: number;
    }

    export interface ColumnInstance<D extends object> extends UseSortByColumnProps<D> {}
}
