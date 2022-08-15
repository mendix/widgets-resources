import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertyIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

import DocumentViewerURLPreviewSVGDark from "./assets/document-viewer-url-preview.dark.svg";
import DocumentViewerURLPreviewSVGLight from "./assets/document-viewer-url-preview.light.svg";
import DocumentViewerEntityPreviewSVGDark from "./assets/document-viewer-entity-preview.dark.svg";
import DocumentViewerEntityPreviewSVGLight from "./assets/document-viewer-entity-preview.light.svg";

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

export function getPreview(props: DocumentViewerPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const urlImage = isDarkMode ? DocumentViewerURLPreviewSVGDark : DocumentViewerURLPreviewSVGLight;
    const entityImage = isDarkMode ? DocumentViewerEntityPreviewSVGDark : DocumentViewerEntityPreviewSVGLight;

    return {
        type: "Image",
        document:
            props.dataSourceType === "url"
                ? decodeURIComponent(urlImage.replace("data:image/svg+xml,", ""))
                : decodeURIComponent(entityImage.replace("data:image/svg+xml,", ""))
    };
}
