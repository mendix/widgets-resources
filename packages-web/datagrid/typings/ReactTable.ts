import {
    HeaderGroup,
    TableInstance,
    UseColumnOrderInstanceProps,
    UseFiltersColumnProps,
    UseResizeColumnsColumnProps,
    UseSortByColumnProps
} from "react-table";

export interface ExtendedColumnInstance
    extends HeaderGroup<any>,
        UseSortByColumnProps<any>,
        UseResizeColumnsColumnProps<any>,
        UseFiltersColumnProps<any> {}

export interface ExtendedTableInstance extends TableInstance<object>, UseColumnOrderInstanceProps<object> {}

export interface CellProperties {
    value: any;
    data: any[];
    row: { index: number };
    column: { id: string };
}

export interface FilterProperties {
    column: { filterValue: any; setFilter: (e: any) => void; filter: string };
}
