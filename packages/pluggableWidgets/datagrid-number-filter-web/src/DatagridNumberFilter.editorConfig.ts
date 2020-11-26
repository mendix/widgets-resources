import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { DatagridNumberFilterPreviewProps } from "../typings/DatagridNumberFilterProps";

export function getProperties(values: DatagridNumberFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}
