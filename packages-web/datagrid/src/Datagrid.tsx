import { createElement, ReactElement, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { useColumns, useData } from "./utils/hooks";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const {
        class: className,
        headerWidgets,
        footerWidgets,
        pagingPosition,
        columnsSortable,
        columnsFilterable,
        columnsResizable,
        columnsDraggable,
        columnsHidable,
        datasource,
        columns: columnsProps,
        pagingEnabled,
        pageSize
    } = props;

    const isSortingOrFiltering = useMemo(() => columnsFilterable || columnsSortable, [
        columnsFilterable,
        columnsSortable
    ]);
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [data] = useData(
        datasource,
        columnsProps,
        pagingEnabled,
        pageSize,
        page,
        isSortingOrFiltering,
        setHasMoreItems
    );
    const [columns, columnsConfig] = useColumns(columnsProps);

    return (
        <Table
            className={className}
            columns={columns}
            columnsConfig={columnsConfig}
            data={data}
            setPage={setPage}
            hasMoreItems={hasMoreItems}
            page={page}
            columnsDraggable={columnsDraggable}
            columnsFilterable={columnsFilterable}
            columnsResizable={columnsResizable}
            columnsSortable={columnsSortable}
            columnsHidable={columnsHidable}
            pageSize={pageSize}
            paging={pagingEnabled}
            pagingPosition={pagingPosition}
            footerWidgets={footerWidgets}
            headerWidgets={headerWidgets}
        />
    );
}
