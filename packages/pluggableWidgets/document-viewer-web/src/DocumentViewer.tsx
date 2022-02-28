import { ReactElement, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";

// import { DocumentViewerContainerProps } from "../typings/DocumentViewerProps";

export function DocumentViewer(): ReactElement {
    return <DocumentViewerComponent src={"111"} />;
}
