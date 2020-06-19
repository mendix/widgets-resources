import { createElement, ReactElement, useCallback, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const isServerSide = !(props.columnsFilterable || props.columnsSortable);

    // TODO: Autoload more/Infinite loading needs to keep offset as zero

    // ComponentWillMount
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
            const currentPage = props.datasource.offset / props.pageSize;
            props.datasource.setOffset(computePage(currentPage) * props.pageSize);
        },
        [props.datasource, props.pageSize]
    );
    return (
        <Table
            className={props.class}
            columns={props.columns}
            data={props.datasource.items ?? []}
            setPage={setPage}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            page={isServerSide ? props.datasource.offset / props.pageSize : 0}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            columnsHidable={props.columnsHidable}
            pageSize={props.pageSize}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            footerWidgets={<div className="header">{props.footerWidgets}</div>}
            headerWidgets={<div className="footer">{props.headerWidgets}</div>}
        />
    );
}
