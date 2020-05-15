import { Children, createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { useBlockLayout, useResizeColumns, useSortBy, useTable } from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";
import classNames from "classnames";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [items, setItems] = useState<any[]>([]);
    const columns = useMemo(
        () =>
            props.columns.map((column, index) => ({
                Header: column.header.value,
                accessor: `col_${index}`
            })) || [],
        [props.columns]
    ) as any;

    const datasourceData = useMemo(
        () =>
            props.datasource.items?.map(item =>
                props.columns
                    .map((column, index) => ({
                        [`col_${index}`]: column.attribute ? column.attribute(item).value : "",
                        [`content_col_${index}`]: column.content ? column.content(item) : null
                    }))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
            ) || [],
        [props.datasource]
    );

    const data = useMemo(() => {
        if (!props.pagingEnabled) {
            // Carregar itens anteriores
            setItems(items => Array.from(new Set([...(items || []), ...datasourceData])));
        }
        props.datasource.setLimit(props.pageSize);
        props.datasource.setOffset(page * props.pageSize);
        setHasMoreItems(props.datasource.hasMoreItems || false);
        console.warn("Loading items from", page * props.pageSize);

        return props.pagingEnabled ? datasourceData : Array.from(new Set([...items, ...datasourceData]));
    }, [props.datasource, props.columns, props.pageSize, page, datasourceData]);

    const defaultColumn = {
        Cell: ({
            value,
            data,
            row: { index },
            column: { id }
        }: {
            value: any;
            data: any[];
            row: { index: number };
            column: { id: string };
        }) => {
            const content = data[index][`content_${id}`];
            return Children.count(content.children) > 0 ? content : value;
        },
        minWidth: 30,
        width: 150,
        maxWidth: 400
    };

    const { getTableProps, headerGroups, rows, prepareRow, getTableBodyProps, allColumns } = useTable(
        {
            columns,
            data,
            defaultColumn,
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            initialState: { pageSize: props.pageSize }
        } as any,
        useSortBy,
        // usePagination,
        useBlockLayout,
        useResizeColumns
    );

    const trackScrolling = useCallback(
        e => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
                if (hasMoreItems) {
                    setPage(prev => prev + 1);
                }
            }
        },
        [hasMoreItems]
    );

    // const rowSelector = props.pagingEnabled ? page : rows;

    return (
        <div className={classNames(props.class, "table")} {...getTableProps()}>
            <div className="header">
                <span>Header</span>
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
            </div>
            <div className="thead" role="rowgroup">
                {headerGroups.map((headerGroup: any, index: number) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr" key={`headers_row_${index}`}>
                        {headerGroup.headers.map((column: any, index: number) => (
                            <div
                                className={classNames("th", props.columnsSortable ? "clickable" : "")}
                                {...column.getHeaderProps()}
                                {...(props.columnsSortable ? column.getSortByToggleProps() : {})}
                                key={`headers_column_${index}`}
                                style={{
                                    width:
                                        column.width > column.maxWidth
                                            ? column.maxWidth
                                            : column.width < column.minWidth
                                            ? column.minWidth
                                            : column.width
                                }}
                            >
                                {column.render("Header")}
                                <div className="column-options">
                                    {props.columnsSortable && (
                                        <span className="sort-text">
                                            {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                                        </span>
                                    )}
                                    {props.columnsResizable && (
                                        <div {...column.getResizerProps()} className="column-resizer" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="tbody" {...getTableBodyProps()} onScroll={trackScrolling}>
                {rows.map((row: any, index: number) => {
                    prepareRow(row);
                    return (
                        <div className="tr" {...row.getRowProps()} key={`row_${index}`}>
                            {row.cells.map((cell: any, index: number) => (
                                <div className="td" {...cell.getCellProps()} key={`column_${index}`}>
                                    {cell.render("Cell")}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className="tfoot">
                <div className="tr">
                    <div className="td">
                        {props.pagingEnabled && (
                            <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />
                        )}
                        Showing from items till {(page + 1) * props.pageSize}
                    </div>
                </div>
            </div>
        </div>
    );
}
