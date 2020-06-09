import {
    HeaderGroup,
    TableInstance,
    UseColumnOrderInstanceProps,
    UseFiltersColumnProps,
    UsePaginationInstanceProps,
    UseResizeColumnsColumnProps,
    UseSortByColumnProps
} from "react-table";
import { HidableEnum } from "./DatagridProps";

export interface ExtendedColumnInstance
    extends HeaderGroup<any>,
        UseSortByColumnProps<any>,
        UseResizeColumnsColumnProps<any>,
        UseFiltersColumnProps<any> {}

export interface ExtendedTableInstance
    extends TableInstance<object>,
        UseColumnOrderInstanceProps<object>,
        UsePaginationInstanceProps<object> {}

export interface CellProperties {
    value: any;
    data: any[];
    row: { index: number };
    column: { id: string };
}

export interface FilterProperties {
    column: { filterValue: any; setFilter: (e: any) => void; filter: string };
}

export interface ColumnConfig {
    hasWidgets: boolean;
    sortable: boolean;
    filterable: boolean;
    resizable: boolean;
    draggable: boolean;
    hidable: HidableEnum;
}

export interface ColumnsConfig {
    [key: string]: ColumnConfig;
}
