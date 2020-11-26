import { createElement, ReactElement, useCallback } from "react";
import { ColumnsPreviewType, DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";
import { parseStyle } from "@widgets-resources/piw-utils";

export function preview(props: DatagridPreviewProps): ReactElement {
    const data = Array.from({ length: props.pageSize ?? 5 }).map(() => ({}));
    const columns: ColumnsPreviewType[] =
        props.columns.length > 0
            ? props.columns
            : [
                  {
                      header: "Header",
                      attribute: "{Attribute}",
                      width: "autoFill",
                      columnClass: "",
                      filterable: "no",
                      customFilter: { renderer: () => <div />, widgetCount: 0 },
                      resizable: false,
                      hasWidgets: false,
                      content: { renderer: () => <div />, widgetCount: 0 },
                      draggable: false,
                      hidable: "no",
                      size: 1,
                      sortable: false
                  }
              ];

    return (
        <Table
            className={props.class}
            columns={columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={data}
            footerWidgets={
                <props.footerWidgets.renderer>
                    <div className="footer" />
                </props.footerWidgets.renderer>
            }
            hasMoreItems={false}
            headerWidgets={
                <props.headerWidgets.renderer>
                    <div className="header" />
                </props.headerWidgets.renderer>
            }
            numberOfItems={5}
            page={0}
            pageSize={props.pageSize ?? 5}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            styles={parseStyle(props.style)}
            cellRenderer={useCallback(
                (renderWrapper, _, columnIndex) => {
                    const column = columns[columnIndex];
                    return column.hasWidgets ? (
                        <column.content.renderer>{renderWrapper(null)}</column.content.renderer>
                    ) : (
                        renderWrapper(<span className="td-text">{column.attribute}</span>)
                    );
                },
                [props.columns]
            )}
            valueForFilter={useCallback(() => undefined, [])}
            valueForSort={useCallback(() => undefined, [])}
            filterMethod={props.filterMethod}
            filterRenderer={useCallback(
                (renderWrapper, columnIndex) => {
                    const column = columns[columnIndex];
                    return column.customFilter ? (
                        <column.customFilter.renderer>{renderWrapper(null)}</column.customFilter.renderer>
                    ) : (
                        renderWrapper(null)
                    );
                },
                [props.columns]
            )}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss") + require("./ui/DatagridPreview.scss");
}
