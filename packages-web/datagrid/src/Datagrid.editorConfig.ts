import { hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { DatagridPreviewProps } from "../typings/DatagridProps";

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

export function check(values: DatagridPreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.columns
        .filter(c => c.attribute === undefined)
        .forEach((column, index) => {
            errors.push({
                property: "columnDefinitions.attribute",
                message: `Attribute is required for column ${column.header ?? index + 1}`
            });
        });

    return errors;
}
