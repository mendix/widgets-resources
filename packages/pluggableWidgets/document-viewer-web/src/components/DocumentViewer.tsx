import { ReactElement, createElement, CSSProperties } from "react";

export interface DocumentViewerProps {
    src: string;
    previewStyle?: CSSProperties;
}

export function DocumentViewer(_props: DocumentViewerProps): ReactElement {
    return <div className="mx-document-viewer">Document</div>;
}
