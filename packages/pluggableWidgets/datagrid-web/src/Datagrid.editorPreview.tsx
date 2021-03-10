import { createElement, ReactElement, useCallback } from "react";
import { ColumnsPreviewType, DatagridPreviewProps } from "../typings/DatagridProps";

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
                      showContentAs: "attribute",
                      content: { renderer: () => <div />, widgetCount: 0 },
                      dynamicText: "Dynamic Text",
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
                    switch (column.showContentAs) {
                        case "attribute":
                            return renderWrapper(
                                <span className="td-text">
                                    {"{"}
                                    {column.attribute}
                                    {"}"}
                                </span>,
                                className
                            );
                        case "dynamicText":
                            return renderWrapper(<span className="td-text">{column.dynamicText}</span>, className);
                        case "customContent":
                            return <column.content.renderer>{renderWrapper(null, className)}</column.content.renderer>;
                    }
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
            emptyPlaceholderRenderer={useCallback(
                renderWrapper =>
                    props.showEmptyPlaceholder === "custom" ? (
                        <props.emptyPlaceholder.renderer>{renderWrapper(null)}</props.emptyPlaceholder.renderer>
                    ) : (
                        <div />
                    ),
                [props.emptyPlaceholder]
            )}
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
            paging={props.pagination === "buttons"}
            pagingPosition={props.pagingPosition}
            preview
            styles={parseStyle(props.style)}
            valueForSort={useCallback(() => undefined, [])}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DatagridPreview.scss");
}
