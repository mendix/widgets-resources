import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { DatagridTextFilterPreviewProps } from "../typings/DatagridTextFilterProps";

export function getProperties(values: DatagridTextFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}
