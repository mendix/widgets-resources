import { ReactNode, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";
import { DocumentViewerContainerProps } from "../typings/DocumentViewerProps";
import { useFileURL } from "./utils/useFileURL";
import { useStyle } from "./utils/useStyle";
import "./ui/DocumentViewer.scss";

export function DocumentViewer(props: DocumentViewerContainerProps): ReactNode {
    const result = useFileURL(props);
    const style = useStyle(props);

    if (result.loading) {
        return null;
    }

    if (result.error !== null) {
        return <pre>{result.error}</pre>;
    }

    return (
        <DocumentViewerComponent
            className={props.class}
            src={result.data}
            tabIndex={props.tabIndex}
            rootStyle={style}
        />
    );
}
