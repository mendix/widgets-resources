import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ListValue } from "mendix";
import { ColumnsType } from "../../typings/DatagridProps";
import { ColumnInstance } from "react-table";

export function useData(
    datasource: ListValue,
    columns: ColumnsType[],
    pagingEnabled: boolean,
    pageSize: number,
    currentPage: number,
    setHasMoreItems: Dispatch<SetStateAction<boolean>>
) {
    const [items, setItems] = useState<any[]>([]);
    const datasourceData = useMemo(
        () =>
            datasource.items?.map(item =>
                columns
                    .map((column, index) => ({
                        [`col_${index}`]: column.hasWidgets ? column.content?.(item) : column.attribute?.(item).value
                    }))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
            ) || [],
        [datasource]
    );

    const data = useMemo(() => {
        if (!pagingEnabled) {
            setItems(items => Array.from(new Set([...(items || []), ...datasourceData])));
        }
        datasource.setLimit(pageSize);
        datasource.setOffset(currentPage * pageSize);
        setHasMoreItems(datasource.hasMoreItems || false);
        console.warn("Loading items from", currentPage * pageSize);

        return pagingEnabled ? datasourceData : Array.from(new Set([...items, ...datasourceData]));
    }, [datasource, columns, pageSize, currentPage, datasourceData]);

    return [data];
}

export function useColumns(columns: ColumnsType[]) {
    const columnsData = useMemo(
        () =>
            columns.map((column, index) => ({
                Header: column.header.value,
                accessor: `col_${index}`
            })) || [],
        [columns]
    ) as any[];
    return [columnsData];
}

export function useDraggable(
    columnsDraggable: boolean,
    visibleColumns: ColumnInstance[],
    setColumnOrder: (order: any[]) => void,
    setDragOver: Dispatch<SetStateAction<string>>
) {
    const handleDragStart = (e: any): void => {
        const { id } = e.target;
        e.dataTransfer.setData("colDestination", id);
    };

    const handleDragOver = (e: any): void => {
        e.preventDefault();
    };

    const handleDragEnter = (e: any): void => {
        const { id } = e.target;
        setDragOver(id);
    };

    const handleOnDrop = (e: any): void => {
        setDragOver("");
        const { id: colOrigin } = e.target;
        const colDestination = e.dataTransfer.getData("colDestination");

        const colOriginIndex = visibleColumns.findIndex((col: any) => col.id === colOrigin);
        const colDestinationIndex = visibleColumns.findIndex((col: any) => col.id === colDestination);

        if (colOriginIndex !== colDestinationIndex) {
            const newOrder = [...visibleColumns];
            newOrder[colOriginIndex] = colDestination;
            newOrder[colDestinationIndex] = colOrigin;
            setColumnOrder(newOrder);
        }
    };

    return [
        columnsDraggable
            ? {
                  draggable: true,
                  onDragStart: handleDragStart,
                  onDragOver: handleDragOver,
                  onDrop: handleOnDrop,
                  onDragEnter: handleDragEnter
              }
            : {}
    ];
}
