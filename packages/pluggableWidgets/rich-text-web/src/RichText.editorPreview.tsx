import { createElement, ReactElement } from "react";
import RichTextPreviewSVGLight from "./assets/rich-text-preview-light.svg";
import { RichTextPreviewProps } from "../typings/RichTextProps";

export const preview = (props: RichTextPreviewProps): ReactElement => {
    let doc = decodeURIComponent(RichTextPreviewSVGLight.replace("data:image/svg+xml,", "")).replace(
        "width='602' height='148'",
        ""
    );

    doc = props.stringAttribute ? doc.replace("[No attribute selected]", `[${props.stringAttribute}]`) : doc;

    return <div className="widget-rich-text" style={{ maxWidth: 602 }} dangerouslySetInnerHTML={{ __html: doc }}></div>;
};
