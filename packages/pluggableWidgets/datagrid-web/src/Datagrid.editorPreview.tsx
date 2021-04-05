import { createElement, ReactElement, useCallback } from "react";
import { ColumnsPreviewType, DatagridPreviewProps } from "../typings/DatagridProps";

import { Table } from "./components/Table";
import { parseStyle } from "@mendix/piw-utils-internal";
import { Selectable } from "mendix/preview/Selectable";

export function preview(props: DatagridPreviewProps): ReactElement {
    const data = Array.from({ length: props.pageSize ?? 5 }).map(() => ({}));
    const columns: ColumnsPreviewType[] =
        props.columns.length > 0
            ? props.columns
            : [
                  {
                      header: "Column",
                      attribute: "[No attribute selected]",
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

    const selectableWrapperRenderer = useCallback(
        (columnIndex: number, header: ReactElement) => {
            const column = columns[columnIndex];
            return (
                <Selectable
                    object={column}
                    caption={column.header.trim().length > 0 ? column.header : "[Empty caption]"}
                    key={`selectable_column_${columnIndex}`}
                >
                    {header}
                </Selectable>
            );
        },
        [columns]
    );

    return (
        <Table
            className={props.class}
            cellRenderer={useCallback(
                (renderWrapper, _, columnIndex) => {
                    const column = columns[columnIndex];
                    const className = column.alignment ? `align-column-${column.alignment}` : "";
                    let content;
                    switch (column.showContentAs) {
                        case "attribute":
                            content = renderWrapper(
                                <span className="td-text">
                                    {"["}
                                    {column.attribute.length > 0 ? column.attribute : "No attribute selected"}
                                    {"]"}
                                </span>,
                                className
                            );
                            break;
                        case "dynamicText":
                            content = renderWrapper(<span className="td-text">{column.dynamicText}</span>, className);
                            break;
                        case "customContent":
                            content = (
                                <column.content.renderer>{renderWrapper(null, className)}</column.content.renderer>
                            );
                    }

                    return selectableWrapperRenderer(columnIndex, content);
                },
                [columns]
            )}
            columns={columns}
            columnsDraggable={props.columnsDraggable}
            columnsFilterable={props.columnsFilterable}
            columnsHidable={props.columnsHidable}
            columnsResizable={props.columnsResizable}
            columnsSortable={props.columnsSortable}
            data={data}
            emptyPlaceholderRenderer={useCallback(
                renderWrapper => (
                    <props.emptyPlaceholder.renderer caption="Empty list message: Place widgets here">
                        {renderWrapper(null)}
                    </props.emptyPlaceholder.renderer>
                ),
                [props.emptyPlaceholder]
            )}
            filterRenderer={useCallback(
                (renderWrapper, columnIndex) => {
                    const column = columns[columnIndex];
                    return column.filter ? (
                        <column.filter.renderer caption="Place filter widget here">
                            {renderWrapper(null)}
                        </column.filter.renderer>
                    ) : (
                        renderWrapper(null)
                    );
                },
                [columns]
            )}
            hasMoreItems={false}
            headerWrapperRenderer={selectableWrapperRenderer}
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
