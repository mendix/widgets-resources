import { ReactElement, createElement, CSSProperties } from "react";
import classnames from "classnames";

export interface DocumentViewerProps {
    src: string;
    className?: string;
    rootStyle?: CSSProperties;
    tabIndex?: number;
}

export function DocumentViewer({ className, src, rootStyle, tabIndex }: DocumentViewerProps): ReactElement {
    return (
        <div
            className={classnames("widget-document-viewer", className)}
            style={{ ...rootStyle, position: "relative" }}
            tabIndex={tabIndex}
        >
            <object
                className="widget-document-viewer-content"
                data={src}
                type="application/pdf"
                style={{ position: "absolute" }}
            >
                <p>
                    We having issues with preview of the current file. Please download the file to view it:&nbsp;
                    <a href={src}>Download</a>
                </p>
            </object>
        </div>
    );
}
