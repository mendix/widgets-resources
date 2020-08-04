import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
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
            hidePropertyIn(defaultProperties, values, "columns", index, "filterable");
            hidePropertyIn(defaultProperties, values, "columns", index, "customFilter");
            hidePropertyIn(defaultProperties, values, "filterMethod");
        } else if (column.filterable !== "custom") {
            hidePropertyIn(defaultProperties, values, "columns", index, "customFilter");
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
    if (!values.showHeader) {
        hidePropertyIn(defaultProperties, values, "headerWidgets");
    }
    if (!values.showFooter) {
        hidePropertyIn(defaultProperties, values, "footerWidgets");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridPreviewProps): any => {
    const columnProps: ColumnsPreviewType[] =
        values.columns && values.columns.length > 0
            ? values.columns
            : [
                  {
                      header: "Header",
                      attribute: "Attribute",
                      width: "autoFit",
                      columnClass: "",
                      filterable: "no",
                      customFilter: undefined as any,
                      resizable: false,
                      hasWidgets: false,
                      content: undefined as any,
                      draggable: false,
                      hidable: "no",
                      size: 1,
                      sortable: false
                  }
              ];
    const columns = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(column => ({
            type: "Container",
            borders: true,
            grow: column.width === "manual" ? column.size : 1,
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
        }))
    };
    const headers = {
        type: "RowLayout",
        columnSize: "fixed",
        children: columnProps.map(column => {
            const header = column.header.trim();
            const content = {
                type: "Container",
                borders: true,
                grow: column.width === "manual" ? column.size : 1,
                children: [
                    {
                        type: "Container",
                        children: [
                            { type: "text", bold: true, fontSize: 10, content: header.length > 0 ? header : "Header" },
                            ...(values.columnsFilterable && column.filterable === "custom"
                                ? [
                                      {
                                          type: "DropZone",
                                          property: column.customFilter
                                      }
                                  ]
                                : [])
                        ]
                    }
                ]
            };
            return values.columns.length > 0
                ? {
                      type: "Selectable",
                      object: column,
                      child: {
                          type: "Container",
                          grow: column.width === "manual" ? column.size : 1,
                          children: [content]
                      }
                  }
                : content;
        })
    };
    return {
        type: "Container",
        children: [headers, ...Array.from({ length: 5 }).map(() => columns)]
    };
};
