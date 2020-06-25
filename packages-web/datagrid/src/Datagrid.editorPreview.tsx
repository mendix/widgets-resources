import { createElement, ReactElement, useCallback } from "react";
import { DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";
import { parseStyle } from "@widgets-resources/piw-utils";

export function preview(props: DatagridPreviewProps): ReactElement {
    const data = Array.from({ length: props.pageSize ?? 5 }).map(() => ({}));

    return (
        <Table
            className={props.class}
            columns={props.columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={data}
            footerWidgets={
                <props.footerWidgets.renderer>
                    <div className="header" />
                </props.footerWidgets.renderer>
            }
            hasMoreItems={false}
            headerWidgets={
                <props.headerWidgets.renderer>
                    <div className="footer" />
                </props.headerWidgets.renderer>
            }
            numberOfPages={1}
            page={0}
            pageSize={props.pageSize ?? 5}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            styles={parseStyle(props.style)}
            cellRenderer={useCallback(
                (Wrapper, _, columnIndex) => {
                    const column = props.columns[columnIndex];
                    return column.hasWidgets ? (
                        <column.content.renderer>
                            <Wrapper />
                        </column.content.renderer>
                    ) : (
                        <Wrapper>{column.attribute}</Wrapper>
                    );
                },
                [props.columns]
            )}
            valueForFilter={useCallback(() => undefined, [])}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss");
}
