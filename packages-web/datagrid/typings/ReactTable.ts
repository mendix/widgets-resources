import {
    ColumnInstance,
    TableInstance,
    UseColumnOrderInstanceProps,
    UseResizeColumnsColumnProps,
    UseSortByColumnProps
} from "react-table";

export interface ExtendedColumnInstance
    extends ColumnInstance<any>,
        UseSortByColumnProps<any>,
        UseResizeColumnsColumnProps<any> {}

export interface ExtendedTableInstance extends TableInstance<object>, UseColumnOrderInstanceProps<object> {}

export interface CellProperties {
    value: any;
    data: any[];
    row: { index: number };
    column: { id: string };
}
