import {
    ContainerProps,
    DropZoneProps,
    hidePropertyIn,
    Properties,
    RowLayoutProps,
    StructurePreviewProps
} from "@widgets-resources/piw-utils";
import { ColumnsPreviewType, DatagridPreviewProps } from "../typings/DatagridProps";

export function getProperties(values: DatagridPreviewProps, defaultProperties: Properties): Properties {
    values.columns.forEach((column, index) => {
        if (!column.hasWidgets) {
            hidePropertyIn(defaultProperties, values, "columns", index, "content");
        }
        if (!values.columnsSortable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "sortable");
        }
        if (!values.columnsFilterable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "filter");
        }
        if (!values.columnsResizable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "resizable");
        }
        if (!values.columnsDraggable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "draggable");
        }
        if (!values.columnsHidable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "hidable");
        }
        if (column.width !== "manual") {
            hidePropertyIn(defaultProperties, values, "columns", index, "size");
        }
    });
    if (!values.pagingEnabled) {
        hidePropertyIn(defaultProperties, values, "pagingPosition");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridPreviewProps): StructurePreviewProps => {
    const columnProps: ColumnsPreviewType[] =
        values.columns && values.columns.length > 0
            ? values.columns
            : [
                  {
                      header: "Header",
                      attribute: "Attribute",
                      width: "autoFit",
                      columnClass: "",
                      filter: { widgetCount: 0, renderer: () => null },
                      resizable: false,
                      hasWidgets: false,
                      content: { widgetCount: 0, renderer: () => null },
                      draggable: false,
                      hidable: "no",
                      size: 1,
                      sortable: false
                  }
              ];
    const columns: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(
            column =>
                ({
                    type: "Container",
                    borders: true,
                    grow: column.width === "manual" && column.size ? column.size : 1,
                    children: [
                        column.hasWidgets
                            ? {
                                  type: "DropZone",
                                  property: column.content
                              }
                            : {
                                  type: "text",
                                  content: `{${column.attribute ?? "Attribute"}}`,
                                  fontSize: 10
                              }
                    ]
                } as ContainerProps)
        )
    };
    const headers: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(column => {
            const header = column.header.trim();
            const content: ContainerProps = {
                type: "Container",
                borders: true,
                grow: column.width === "manual" && column.size ? column.size : 1,
                children: [
                    { type: "Text", bold: true, fontSize: 10, content: header.length > 0 ? header : "Header" },
                    ...(values.columnsFilterable
                        ? [
                              {
                                  type: "DropZone",
                                  property: column.filter
                              } as DropZoneProps
                          ]
                        : [])
                ]
            };
            return values.columns.length > 0
                ? {
                      type: "Selectable",
                      object: column,
                      child: {
                          type: "Container",
                          grow: column.width === "manual" && column.size ? column.size : 1,
                          children: [content]
                      }
                  }
                : content;
        })
    };
    const footer = values.showEmptyPlaceholder
        ? [
              {
                  type: "RowLayout",
                  columnSize: "fixed",
                  children: [
                      {
                          type: "DropZone",
                          property: values.emptyPlaceholder
                      } as DropZoneProps
                  ]
              } as RowLayoutProps
          ]
        : [];
    return {
        type: "Container",
        children: [headers, ...Array.from({ length: 5 }).map(() => columns), ...footer]
    };
};
