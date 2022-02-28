import { ReactElement, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";
import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { exampleDocUrl } from "./assets/example-doc";
import { useStyle } from "./utils/useStyle";

export function preview(props: DocumentViewerPreviewProps): ReactElement {
    const style = useStyle(props);
    return <DocumentViewerComponent src={exampleDocUrl} rootStyle={{ pointerEvents: "none", ...style }} />;
}

export function getPreviewCss(): string {
    return require("./ui/DocumentViewer.scss");
}
