import { createElement, ReactElement, useCallback, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";

import { Table } from "./components/Table";
import classNames from "classnames";
import { FilterContext, FilterFunction } from "./components/provider";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const isServerSide = !(props.columnsFilterable || props.columnsSortable);
    const isInfiniteLoad = props.pagination === "virtualScrolling" && isServerSide;
    const currentPage = isInfiniteLoad
        ? props.datasource.limit / props.pageSize
        : props.datasource.offset / props.pageSize;

    // @ts-ignore // TODO: Remove when Studio Pro 9.0.5 typings are released
    props.datasource.requestTotalCount?.(isServerSide);

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

    const onConfigurationChange = useCallback(() => {
        props.onConfigurationChange?.execute();
    }, [props.onConfigurationChange]);

    const customFiltersState = props.columns.map(() => useState<FilterFunction>());
    const items = (props.datasource.items ?? []).filter(item =>
        customFiltersState.every(
            ([customFilter], columnIndex) =>
                !customFilter || customFilter.filter(item, props.columns[columnIndex].attribute!)
        )
    );

    return (
        <Table
            className={props.class}
            cellRenderer={useCallback(
                (renderWrapper, value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    let content;

                    if (column.showContentAs === "attribute") {
                        content = <span className="td-text">{column.attribute?.(value)?.displayValue ?? ""}</span>;
                    } else if (column.showContentAs === "dynamicText") {
                        content = <span className="td-text">{column.dynamicText?.(value)?.value ?? ""}</span>;
                    } else {
                        content = column.content?.(value);
                    }

                    return renderWrapper(
                        content,
                        classNames(`align-column-${column.alignment}`, column.columnClass?.(value)?.value),
                        props.onClick
                            ? useCallback(() => props.onClick?.(value).execute(), [props.onClick, value])
                            : undefined
                    );
                },
                [props.columns, props.rowClass, props.onClick]
            )}
            columns={props.columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={items}
            emptyPlaceholderRenderer={
                props.showEmptyPlaceholder === "custom"
                    ? useCallback(renderWrapper => renderWrapper(props.emptyPlaceholder), [props.emptyPlaceholder])
                    : undefined
            }
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
            onSettingsChange={props.onConfigurationChange ? onConfigurationChange : undefined}
            page={currentPage}
            pageSize={props.pageSize}
            paging={props.pagination === "buttons"}
            pagingPosition={props.pagingPosition}
            rowClass={useCallback(value => props.rowClass?.(value)?.value ?? "", [props.rowClass])}
            settings={props.configurationAttribute}
            setPage={setPage}
            styles={props.style}
            valueForSort={useCallback(
                (value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    return column.attribute ? column.attribute(value).value : "";
                },
                [props.columns]
            )}
        />
    );
}
