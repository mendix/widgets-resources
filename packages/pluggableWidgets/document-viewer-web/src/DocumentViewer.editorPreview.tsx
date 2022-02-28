import { ReactElement, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";
import { DocumentViewerPreviewProps } from "../typings/DocumentViewerProps";
import { exampleDocUrl } from "./assets/example-doc";
import { useStyle } from "./utils/useStyle";

function Preview(props: DocumentViewerPreviewProps): ReactElement {
    const style = useStyle(props);
    return <DocumentViewerComponent src={exampleDocUrl} rootStyle={{ pointerEvents: "none", ...style }} />;
}

export { Preview as preview };

export function getPreviewCss(): string {
    return require("./ui/DocumentViewer.scss");
}
