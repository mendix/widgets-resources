import { hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { DatagridPreviewProps } from "../typings/DatagridProps";

export function getProperties(values: DatagridPreviewProps, defaultProperties: Properties): Properties {
    values.columns.forEach((c, index) => {
        if (!c.hasWidgets) {
            hidePropertyIn(defaultProperties, values, "columns", index, "content");
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
    console.log(values);

    return errors;
}
