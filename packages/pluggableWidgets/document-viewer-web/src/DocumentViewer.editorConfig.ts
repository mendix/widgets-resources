import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(_values: DocumentViewerPreviewProps, defaultProperties: Properties): Properties {
    return defaultProperties;
}

export function check(props: DocumentViewerPreviewProps): Problem[] {
    if (!props.file) {
        return [
            {
                property: "file",
                message: "Missing value for 'File Entity' property"
            }
        ];
    }

    return [];
}
