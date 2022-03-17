import { ReactNode, createElement } from "react";
import { DocumentViewer as DocumentViewerComponent } from "./components/DocumentViewer";
import { DocumentViewerContainerProps } from "../typings/DocumentViewerProps";
import { useFileURL } from "./utils/useFileURL";
import { useStyle } from "./utils/useStyle";
import "./ui/DocumentViewer.scss";
import { Alert } from "@mendix/piw-utils-internal/components/web";

export function DocumentViewer(props: DocumentViewerContainerProps): ReactNode {
    const result = useFileURL(props);
    const style = useStyle(props);

    if (result.loading) {
        return null;
    }

    if (result.error !== null) {
        return <Alert bootstrapStyle="danger">{result.error}</Alert>;
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
