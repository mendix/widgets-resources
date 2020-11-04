import { Filters, IdType, SortingRule } from "react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { EditableValue, ValueStatus } from "mendix";
import { ColumnWidth, TableColumn } from "../components/Table";

declare type Option<T> = T | undefined;

interface Settings {
    columnOrder: Array<IdType<object>>;
    hiddenColumns: Array<IdType<object>>;
    sortBy: Array<SortingRule<object>>;
    filters: Filters<object>;
    widths: ColumnWidth;
}

interface PersistedSettings {
    column: string;
    sort: boolean;
    sortMethod: "asc" | "desc";
    filter: string;
    hidden: boolean;
    order: number;
    width: number | undefined;
}

export function createSettings(
    { columnOrder, hiddenColumns, sortBy, filters, widths }: Settings,
    columns: Array<{ header: string; id: string }>
): PersistedSettings[] {
    return columns.map((column, index) => {
        const columnIndex = columnOrder.findIndex(o => o === column.id);
        return {
            column: column.header,
            sort: !!sortBy.find(s => s.id === column.id),
            sortMethod: sortBy.find(s => s.id === column.id)?.desc ? "desc" : "asc",
            filter: filters.find(f => f.id === column.id)?.value ?? "",
            hidden: !!hiddenColumns.find(h => h === column.id),
            order: columnIndex > -1 ? columnIndex : index,
            width: widths[column.id]
        };
    });
}

export function useSettings(
    settings: Option<EditableValue<string>>,
    columns: TableColumn[],
    columnOrder: Array<IdType<object>>,
    setColumnOrder: Dispatch<SetStateAction<Array<IdType<object>>>>,
    hiddenColumns: Array<IdType<object>>,
    setHiddenColumns: Dispatch<SetStateAction<Array<IdType<object>>>>,
    sortBy: Array<SortingRule<object>>,
    setSortBy: Dispatch<SetStateAction<Array<SortingRule<object>>>>,
    filters: Filters<object>,
    setFilters: Dispatch<SetStateAction<Filters<object>>>,
    widths: ColumnWidth,
    setWidths: Dispatch<SetStateAction<ColumnWidth>>
): void {
    const previousLoadedSettings = useRef<string>();

    const filteredColumns = useMemo(
        () =>
            columns.map((c, index) => ({
                header: typeof c.header === "object" ? c.header.value : c.header,
                id: index.toString(),
                hidable: c.hidable
            })) as Array<{ header: string; id: string; hidable: string }>,
        [columns]
    );

    useEffect(() => {
        if (
            settings &&
            settings.status !== ValueStatus.Loading &&
            settings.value &&
            settings.value !== previousLoadedSettings.current
        ) {
            const newSettings = JSON.parse(settings.value) as PersistedSettings[];
            const columns = newSettings.map(columnSettings => ({
                ...columnSettings,
                columnId: filteredColumns.find(c => c.header === columnSettings.column)?.id || ""
            }));

            const extractedSettings = {
                columnOrder: columns.sort((a, b) => a.order - b.order).map(s => s.columnId),
                hiddenColumns: columns.filter(s => s.hidden).map(s => s.columnId),
                sortBy: columns
                    .filter(s => s.sort)
                    .map(s => ({
                        id: s.columnId,
                        desc: s.sortMethod === "desc"
                    })),
                filters: columns.filter(s => s.filter).map(s => ({ id: s.columnId, value: s.filter })),
                widths: Object.fromEntries(columns.map(s => [s.columnId, s.width]))
            };
            setColumnOrder(extractedSettings.columnOrder);
            setHiddenColumns(extractedSettings.hiddenColumns);
            setSortBy(extractedSettings.sortBy);
            setFilters(extractedSettings.filters);
            setWidths(extractedSettings.widths);
        }
    }, [settings, filteredColumns, previousLoadedSettings.current]);

    useEffect(() => {
        if (settings && settings.status === ValueStatus.Available) {
            const newSettings = JSON.stringify(
                createSettings(
                    {
                        columnOrder,
                        hiddenColumns,
                        sortBy,
                        filters,
                        widths
                    },
                    filteredColumns
                ) ?? []
            );
            if (previousLoadedSettings.current !== newSettings && settings.value !== newSettings) {
                settings.setValue(newSettings);
                previousLoadedSettings.current = newSettings;
            }
        }
    }, [columnOrder, hiddenColumns, sortBy, filters, widths, settings, previousLoadedSettings.current]);
}
