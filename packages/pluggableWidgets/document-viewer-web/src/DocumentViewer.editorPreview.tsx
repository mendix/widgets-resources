import { ReactElement, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";
import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";

export function preview(_props: DocumentViewerPreviewProps): ReactElement {
    return <DocumentViewerComponent src={"111"} />;
}
