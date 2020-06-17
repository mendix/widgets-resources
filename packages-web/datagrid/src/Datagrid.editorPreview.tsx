import { createElement, ReactElement } from "react";
import { DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export function preview(props: DatagridPreviewProps): ReactElement {
    const columns = props.columns.map((column, index) => ({
        Header: column.header,
        accessor: `col_${index}`,
        filter: "text"
    }));

    const columnsConfig = props.columns
        .map((column, index) => {
            const { ...data } = column;
            delete data.content;
            delete data.attribute;
            return {
                [`col_${index}`]: data
            };
        })
        .reduce((acc, current) => ({ ...acc, ...current }), {});

    const data = Array.from({ length: props.pageSize ?? 5 }).map(() =>
        props.columns
            .map((column, index) => ({
                [`col_${index}`]: column.attribute,
                [`col_${index}_hasWidgets`]: false,
                [`content_col_${index}`]: (
                    <column.content.renderer>
                        <div />
                    </column.content.renderer>
                )
            }))
            .reduce((acc, current) => ({ ...acc, ...current }), {})
    );

    return (
        <Table
            className={props.class}
            columns={columns}
            columnsConfig={columnsConfig}
            data={data}
            hasMoreItems={false}
            page={0}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            columnsHidable={props.columnsHidable}
            pageSize={props.pageSize ?? 5}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            footerWidgets={
                <props.footerWidgets.renderer>
                    <div />
                </props.footerWidgets.renderer>
            }
            headerWidgets={
                <props.headerWidgets.renderer>
                    <div />
                </props.headerWidgets.renderer>
            }
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss");
}
