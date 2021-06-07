import { createElement, ReactElement, useCallback, useState } from "react";
import { ColumnsType, DatagridContainerProps } from "../typings/DatagridProps";
import { FilterCondition } from "mendix/filters";
import { and } from "mendix/filters/builders";

import { Table, TableColumn } from "./components/Table";
import classNames from "classnames";
import { FilterContext, FilterFunction } from "./components/provider";
import { isAvailable } from "@mendix/piw-utils-internal";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const [sortParameters, setSortParameters] = useState<{ columnIndex: number; desc: boolean } | undefined>(undefined);
    const isInfiniteLoad = props.pagination === "virtualScrolling";
    const currentPage = isInfiniteLoad
        ? props.datasource.limit / props.pageSize
        : props.datasource.offset / props.pageSize;

    props.datasource.requestTotalCount(true);

    useState(() => {
        if (props.datasource.limit === Number.POSITIVE_INFINITY) {
            props.datasource.setLimit(props.pageSize);
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

    const filters = customFiltersState
        .map(([customFilter]) => customFilter?.getFilterCondition?.())
        .filter((filter): filter is FilterCondition => filter !== undefined);

    if (filters.length > 0) {
        props.datasource.setFilter(filters.length > 1 ? and(...filters) : filters[0]);
    } else {
        props.datasource.setFilter(undefined);
    }

    if (sortParameters) {
        props.datasource.setSortOrder([
            [props.columns[sortParameters.columnIndex].attribute!.id, sortParameters.desc ? "desc" : "asc"]
        ]);
    } else {
        props.datasource.setSortOrder([]);
    }

    return (
        <Table
            cellRenderer={useCallback(
                (renderWrapper, value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    let content;

                    if (column.showContentAs === "attribute") {
                        content = <span className="td-text">{column.attribute?.get(value)?.displayValue ?? ""}</span>;
                    } else if (column.showContentAs === "dynamicText") {
                        content = <span className="td-text">{column.dynamicText?.get(value)?.value ?? ""}</span>;
                    } else {
                        content = column.content?.get(value);
                    }

                    return renderWrapper(
                        content,
                        classNames(`align-column-${column.alignment}`, column.columnClass?.get(value)?.value),
                        props.onClick ? props.onClick?.get(value).execute : undefined
                    );
                },
                [props.columns, props.onClick]
            )}
            className={props.class}
            columns={transformColumnProps(props.columns)}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={props.datasource.items ?? []}
            emptyPlaceholderRenderer={useCallback(
                renderWrapper =>
                    props.showEmptyPlaceholder === "custom" ? renderWrapper(props.emptyPlaceholder) : <div />,
                [props.emptyPlaceholder, props.showEmptyPlaceholder]
            )}
            filterRenderer={useCallback(
                (renderWrapper, columnIndex) => {
                    const { attribute, filter } = props.columns[columnIndex];
                    const [, filterDispatcher] = customFiltersState[columnIndex];
                    return attribute
                        ? renderWrapper(
                              <FilterContext.Provider value={{ filterDispatcher, attribute }}>
                                  {filter}
                              </FilterContext.Provider>
                          )
                        : renderWrapper(filter);
                },
                [props.columns, props.datasource]
            )}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            headerWrapperRenderer={useCallback((_columnIndex: number, header: ReactElement) => header, [])}
            numberOfItems={props.datasource.totalCount}
            onSettingsChange={props.onConfigurationChange ? onConfigurationChange : undefined}
            page={currentPage}
            pageSize={props.pageSize}
            paging={props.pagination === "buttons"}
            pagingPosition={props.pagingPosition}
            rowClass={useCallback(value => props.rowClass?.get(value)?.value ?? "", [props.rowClass])}
            setPage={setPage}
            setSortParameters={setSortParameters}
            settings={props.configurationAttribute}
            styles={props.style}
            valueForSort={useCallback(
                (value, columnIndex) => {
                    const column = props.columns[columnIndex];
                    return column.attribute ? column.attribute.get(value).value : "";
                },
                [props.columns]
            )}
        />
    );
}

function transformColumnProps(props: ColumnsType[]): TableColumn[] {
    return props.map(prop => ({
        ...prop,
        header: prop.header && isAvailable(prop.header) ? prop.header.value ?? "" : "",
        sortable: prop.sortable && (prop.attribute?.sortable ?? false)
    }));
}
