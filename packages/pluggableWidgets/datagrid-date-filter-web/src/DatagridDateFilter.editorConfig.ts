import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { DatagridDateFilterPreviewProps } from "../typings/DatagridDateFilterProps";

export function getProperties(values: DatagridDateFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}
