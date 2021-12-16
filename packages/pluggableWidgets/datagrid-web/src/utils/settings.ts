import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from "react";
import { EditableValue, ValueStatus } from "mendix";
import { ColumnWidth, TableColumn } from "../components/Table";

declare type Option<T> = T | undefined;

interface Settings {
    columnOrder: string[];
    hiddenColumns: string[];
    sortBy: SortingRule[];
    widths: ColumnWidth;
}

interface PersistedSettings {
    column: string;
    sort: boolean;
    sortMethod: "asc" | "desc";
    hidden: boolean;
    order: number;
    width: number | undefined;
}

export interface SortingRule {
    id: string;
    desc: boolean;
}

export function createSettings(
    { columnOrder, hiddenColumns, sortBy, widths }: Settings,
    columns: Array<{ header: string; id: string }>
): PersistedSettings[] {
    return columns.map((column, index) => {
        const columnIndex = columnOrder.findIndex(o => o === column.id);
        return {
            column: column.header,
            sort: !!sortBy.find(s => s.id === column.id),
            sortMethod: sortBy.find(s => s.id === column.id)?.desc ? "desc" : "asc",
            hidden: !!hiddenColumns.find(h => h === column.id),
            order: columnIndex > -1 ? columnIndex : index,
            width: widths[column.id]
        };
    });
}

export function useSettings(
    settings: Option<EditableValue<string>>,
    columns: TableColumn[],
    columnOrder: string[],
    setColumnOrder: Dispatch<SetStateAction<string[]>>,
    hiddenColumns: string[],
    setHiddenColumns: Dispatch<SetStateAction<string[]>>,
    sortBy: SortingRule[],
    setSortBy: Dispatch<SetStateAction<SortingRule[]>>,
    widths: ColumnWidth,
    setWidths: Dispatch<SetStateAction<ColumnWidth>>
): { updateSettings: () => void } {
    const previousLoadedSettings = useRef<string>();
    const shouldUpdate = useRef(true);

    const filteredColumns = useMemo(
        () =>
            columns.map((c, index) => ({
                header: c.header,
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
                widths: Object.fromEntries(columns.map(s => [s.columnId, s.width]))
            };

            previousLoadedSettings.current = settings.value;

            // Avoid settings to be saved if the value changes from the database or dataview around.
            shouldUpdate.current = false;

            setColumnOrder(prev => setValue(prev, extractedSettings.columnOrder));
            setHiddenColumns(prev => setValue(prev, extractedSettings.hiddenColumns));
            setSortBy(prev => setValue(prev, extractedSettings.sortBy));
            setWidths(prev => setValue(prev, extractedSettings.widths));

            setTimeout(() => {
                shouldUpdate.current = true;
            }, 100);
        }
    }, [settings, filteredColumns, previousLoadedSettings.current]);

    const updateSettings = useCallback(() => {
        if (settings && settings.status === ValueStatus.Available && shouldUpdate.current) {
            const newSettings = JSON.stringify(
                createSettings(
                    {
                        columnOrder,
                        hiddenColumns,
                        sortBy,
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
    }, [settings, columnOrder, hiddenColumns, sortBy, widths, filteredColumns]);

    return { updateSettings };
}

function setValue<T>(previous: T, current: T): T {
    if (JSON.stringify(previous) === JSON.stringify(current)) {
        return previous;
    }
    return current;
}
