import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { hidePropertyIn, Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(props: DocumentViewerPreviewProps, defaultProperties: Properties): Properties {
    hidePropertyIn(defaultProperties, props, props.dataSourceType === "file" ? "uri" : "file");

    return defaultProperties;
}

export function check(props: DocumentViewerPreviewProps): Problem[] {
    if (props.dataSourceType === "file" && !props.file) {
        return [
            {
                property: "file",
                message: "Missing value for 'File Entity' property"
            }
        ];
    }

    if (props.dataSourceType === "uri" && !props.uri) {
        return [
            {
                property: "uri",
                message: "Missing value for 'URI' property"
            }
        ];
    }

    return [];
}
