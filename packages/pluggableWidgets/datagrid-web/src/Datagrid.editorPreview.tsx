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
                      filter: { renderer: () => <div />, widgetCount: 0 },
                      resizable: false,
                      hasWidgets: false,
                      content: { renderer: () => <div />, widgetCount: 0 },
                      draggable: false,
                      hidable: "no",
                      size: 1,
                      sortable: false,
                      alignment: "left"
                  }
              ];

    return (
        <Table
            className={props.class}
            cellRenderer={useCallback(
                (renderWrapper, _, columnIndex) => {
                    const column = columns[columnIndex];
                    const className = column.alignment ? `align-column-${column.alignment}` : "";
                    return column.hasWidgets ? (
                        <column.content.renderer>{renderWrapper(null, className)}</column.content.renderer>
                    ) : (
                        renderWrapper(<span className="td-text">{column.attribute}</span>, className)
                    );
                },
                [props.columns]
            )}
            columns={columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={data}
            emptyPlaceholderRenderer={
                props.showEmptyPlaceholder
                    ? useCallback(
                renderWrapper => (
                    <props.emptyPlaceholder.renderer>{renderWrapper(null)}</props.emptyPlaceholder.renderer>
                ),
                [props.emptyPlaceholder]
                      )
                    : undefined
            }
            filterRenderer={useCallback(
                (renderWrapper, columnIndex) => {
                    const column = columns[columnIndex];
                    return column.filter ? (
                        <column.filter.renderer>{renderWrapper(null)}</column.filter.renderer>
                    ) : (
                        renderWrapper(null)
                    );
                },
                [props.columns]
            )}
            hasMoreItems={false}
            numberOfItems={5}
            page={0}
            pageSize={props.pageSize ?? 5}
            paging={props.pagingEnabled}
            pagingPosition={props.pagingPosition}
            preview
            styles={parseStyle(props.style)}
            valueForSort={useCallback(() => undefined, [])}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Datagrid.scss") + require("./ui/DatagridPreview.scss");
}
