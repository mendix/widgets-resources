import { createElement, ReactElement, useCallback, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";
import classNames from "classnames";
import { FilterContext, FilterFunction } from "./components/provider";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const isServerSide = !(props.columnsFilterable || props.columnsSortable);
    const isInfiniteLoad = !props.pagingEnabled && isServerSide;
    const currentPage = isInfiniteLoad
        ? props.datasource.limit / props.pageSize
        : props.datasource.offset / props.pageSize;

    useState(() => {
        if (isServerSide) {
            if (props.datasource.limit === Number.POSITIVE_INFINITY) {
                props.datasource.setLimit(props.pageSize);
            }
        } else {
            props.datasource.setLimit(undefined);
            props.datasource.setOffset(0);
        }
    });

    const setPage = useCallback(
        computePage => {
            const newPage = computePage(currentPage);
            if (isInfiniteLoad) {
                props.datasource.setLimit((newPage + 1) * props.pageSize);
            } else {
                props.datasource.setOffset(newPage * props.pageSize);
            }
        },
        [props.datasource, props.pageSize, isInfiniteLoad, currentPage]
    );

    const customFiltersState = props.columns.map(() => useState<FilterFunction>());
    const items = (props.datasource.items ?? []).filter(item =>
        customFiltersState.every(
            ([customFilter], columnIndex) =>
                !customFilter || customFilter.filter(item, props.columns[columnIndex].attribute)
        )
    );

    return (
        <Table
            className={props.class}
            cellRenderer={useCallback(
                (renderWrapper, value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    return renderWrapper(
                        column.hasWidgets && column.content ? (
                            column.content(value)
                        ) : (
                            <span className="td-text">{column.attribute(value).displayValue}</span>
                        ),
                        classNames(
                            column.alignment ? `align-column-${column.alignment}` : "",
                            props.rowClass?.(value)?.value,
                            column.columnClass?.(value)?.value
                        )
                    );
                },
                [props.columns, props.rowClass]
            )}
            columns={props.columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={items}
            emptyPlaceholderRenderer={useCallback(renderWrapper => renderWrapper(props.emptyPlaceholder), [
                props.emptyPlaceholder
            ])}
            filterRenderer={useCallback(
                (renderWrapper, columnIndex) => {
                    const column = props.columns[columnIndex];
                    const [, setValue] = customFiltersState[columnIndex];
                    return renderWrapper(
                        <FilterContext.Provider value={setValue}>{column.filter}</FilterContext.Provider>
                    );
                },
                [props.columns, props.datasource]
            )}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            numberOfItems={props.datasource.totalCount}
            page={currentPage}
            pageSize={props.pageSize}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            settings={props.configurationAttribute}
            setPage={setPage}
            styles={props.style}
            valueForSort={useCallback(
                (value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    return column.attribute(value).value;
                },
                [props.columns]
            )}
        />
    );
}
