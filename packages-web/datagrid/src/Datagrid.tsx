import { createElement, ReactElement, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { useColumns, useData } from "./utils/hooks";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [data] = useData(
        props.datasource,
        props.columns,
        props.pagingEnabled,
        props.pageSize,
        page,
        isSortingOrFiltering,
        setHasMoreItems
    );
    const [columns, columnsConfig] = useColumns(props.columns);

    return (
        <Table
            className={props.class}
            columns={columns}
            columnsConfig={columnsConfig}
            data={data}
            setPage={setPage}
            hasMoreItems={hasMoreItems}
            page={page}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            columnsHidable={props.columnsHidable}
            pageSize={props.pageSize}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            footerWidgets={props.footerWidgets}
            headerWidgets={props.headerWidgets}
        />
    );
}
