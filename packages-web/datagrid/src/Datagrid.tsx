import { Children, createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { useSortBy, useTable } from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";

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
    const [bodySize, setBodySize] = useState(0);
    const isInfinite = useMemo(() => !props.pagingEnabled, [props.pagingEnabled]);

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
            return Children.count(content.props.children) > 0 ? content : value;
        }
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
        useSortBy
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

    function calculateBodyHeight(ref: HTMLTableSectionElement): void {
        if (ref && isInfinite && bodySize <= 0 && hasMoreItems) {
            setBodySize(ref.clientHeight - 20);
        }
    }

    return (
        <div className={props.class}>
            <div className="header">
                <span>Header</span>
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
            </div>
            <table {...getTableProps()} className="table">
                <thead role="rowgroup">
                    {headerGroups.map((headerGroup: any, index: number) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`headers_row_${index}`}>
                            {headerGroup.headers.map((column: any, index: number) => (
                                <th
                                    className={props.columnsSortable ? "clickable" : ""}
                                    {...column.getHeaderProps()}
                                    {...(props.columnsSortable ? column.getSortByToggleProps() : {})}
                                    key={`headers_column_${index}`}
                                >
                                    {column.render("Header")}
                                    <div className="column-options">
                                        {props.columnsSortable && (
                                            <span className="sort-text">
                                                {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                                            </span>
                                        )}
                                        {/* {props.columnsResizable && (*/}
                                        {/*    <div {...column.getResizerProps()} className="column-resizer" />*/}
                                        {/* )}*/}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className={isInfinite ? "infinite-loading" : ""}
                    ref={calculateBodyHeight}
                    onScroll={isInfinite ? trackScrolling : undefined}
                    style={isInfinite && bodySize > 0 ? { maxHeight: bodySize } : { backgroundColor: "red" }}
                >
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={`row_${index}`}>
                                {row.cells.map((cell, index) => (
                                    <td {...cell.getCellProps()} key={`column_${index}`}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot className="tfoot">
                    <tr className="tr">
                        <td className="td">
                            {!isInfinite && <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />}
                            {isInfinite && <strong>Showing items till {(page + 1) * props.pageSize}</strong>}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
