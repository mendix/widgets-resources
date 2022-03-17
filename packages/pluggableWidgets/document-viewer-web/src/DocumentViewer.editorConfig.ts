import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { hidePropertyIn, Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(props: DocumentViewerPreviewProps, defaultProperties: Properties): Properties {
    hidePropertyIn(defaultProperties, props, props.dataSourceType === "file" ? "url" : "file");

    return defaultProperties;
}

type Checker = (props: DocumentViewerPreviewProps) => Problem[];

const fileSourceCheck: Checker = ({ dataSourceType, file }) => {
    if (dataSourceType === "file" && !file) {
        return [
            {
                property: "file",
                message: "Missing value for 'File Entity' property"
            }
        ];
    }

    return [];
};

const urlSourceCheck: Checker = ({ dataSourceType, url }) => {
    if (dataSourceType === "url" && !url) {
        return [
            {
                property: "url",
                message: "Missing value for 'URL' property"
            }
        ];
    }

    return [];
};

export function check(props: DocumentViewerPreviewProps): Problem[] {
    return [fileSourceCheck, urlSourceCheck].map(checker => checker(props)).flat();
}
