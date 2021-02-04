import {
    ContainerProps,
    DropZoneProps,
    hidePropertyIn,
    Problem,
    Properties,
    RowLayoutProps,
    StructurePreviewProps
} from "@widgets-resources/piw-utils";
import { ColumnsPreviewType, DatagridPreviewProps } from "../typings/DatagridProps";

export function getProperties(values: DatagridPreviewProps, defaultProperties: Properties): Properties {
    values.columns.forEach((column, index) => {
        if (column.showContentAs !== "attribute" && !column.sortable && !values.columnsFilterable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "attribute");
        }
        if (column.showContentAs !== "dynamicText") {
            hidePropertyIn(defaultProperties, values, "columns", index, "dynamicText");
        }
        if (column.showContentAs !== "customContent") {
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
    const hasColumns = values.columns && values.columns.length > 0;
    const columnProps: ColumnsPreviewType[] = hasColumns
        ? values.columns
        : [
              {
                  header: "Header",
                  attribute: "Attribute",
                  width: "autoFit",
                  columnClass: "",
                  filter: { widgetCount: 0, renderer: () => null },
                  resizable: false,
                  showContentAs: "attribute",
                  content: { widgetCount: 0, renderer: () => null },
                  dynamicText: "Dynamic text",
                  draggable: false,
                  hidable: "no",
                  size: 1,
                  sortable: false,
                  alignment: "left"
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
                        column.showContentAs === "customContent"
                            ? {
                                  type: "DropZone",
                                  property: column.content
                              }
                            : {
                                  type: "Container",
                                  padding: 8,
                                  children: [
                                      {
                                          type: "Text",
                                          content:
                                              column.showContentAs === "dynamicText"
                                                  ? column.dynamicText ?? "Dynamic text"
                                                  : `{${column.attribute ?? "Attribute"}}`,
                                          fontSize: 10
                                      }
                                  ]
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
                grow:
                    values.columns.length > 0
                        ? column.width === "manual" && column.size
                            ? column.size
                            : 1
                        : undefined,
                backgroundColor: "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                bold: true,
                                fontSize: 10,
                                content: header.length > 0 ? header : "Header",
                                fontColor: header.length === 0 ? "#F5F5F5" : undefined
                            }
                        ]
                    },
                    ...(hasColumns && values.columnsFilterable
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
                      grow: column.width === "manual" && column.size ? column.size : 1,
                      child: {
                          type: "Container",
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

export function check(values: DatagridPreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.columns.forEach((column: ColumnsPreviewType) => {
        if (column.showContentAs === "attribute" && !column.attribute) {
            errors.push({
                property: "column.attribute",
                message: `An attribute is required when 'Show' is set to 'Attribute'. Select the 'Attribute' property for column ${column.header}`
            });
        } else if (!column.attribute && (column.sortable || values.columnsFilterable)) {
            errors.push({
                property: "column.attribute",
                message: `An attribute is required when filtering or sorting is enabled. Select the 'Attribute' property for column ${column.header}`
            });
        }
    });

    return errors;
}
