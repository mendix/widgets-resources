import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { DatagridPreviewProps } from "../typings/DatagridProps";

export function getProperties(values: DatagridPreviewProps, defaultProperties: Properties): Properties {
    values.columns.forEach((column, index) => {
        if (!column.hasWidgets) {
            hidePropertyIn(defaultProperties, values, "columns", index, "content");
        }
        if (!values.columnsResizable || !column.resizable) {
            hidePropertyIn(defaultProperties, values, "columns", index, "minWidth");
            hidePropertyIn(defaultProperties, values, "columns", index, "maxWidth");
            hidePropertyIn(defaultProperties, values, "columns", index, "defaultWidth");
        } else {
            hidePropertyIn(defaultProperties, values, "columns", index, "defaultWeight");
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
