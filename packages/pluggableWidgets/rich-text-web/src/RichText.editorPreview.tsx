import { createElement, ReactElement } from "react";
import RichTextPreviewSVG from "./assets/rich-text-preview-light.svg";
import { RichTextPreviewProps } from "../typings/RichTextProps";

export const preview = (props: RichTextPreviewProps): ReactElement => {
    let doc = decodeURI(RichTextPreviewSVG);
    doc = props.stringAttribute ? doc.replace("[No attribute selected]", `[${props.stringAttribute}]`) : doc;

    return (
        <div className="widget-rich-text">
            <img src={doc} alt="" />
        </div>
    );
};

export function getPreviewCss(): string {
    return require("./ui/RichTextEditorPreview.scss");
}
