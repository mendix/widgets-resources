import { createElement, ReactElement } from "react";
import { DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export function preview(props: DatagridPreviewProps): ReactElement {
    const data = Array.from({ length: props.pageSize ?? 5 }).map(() => ({
        id: "" as any
    }));

    return (
        <Table
            className={props.class}
            columns={props.columns}
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
                    <div className="header" />
                </props.footerWidgets.renderer>
            }
            headerWidgets={
                <props.headerWidgets.renderer>
                    <div className="footer" />
                </props.headerWidgets.renderer>
            }
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss");
}
