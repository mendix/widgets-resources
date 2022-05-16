import { ReactElement, createElement } from "react";
import { HTMLNodePreviewProps } from "../typings/HTMLNodeProps";

export function preview(props: HTMLNodePreviewProps): ReactElement {
    return <div className={props.className}>HTML Node</div>;
}

export function getPreviewCss(): string {
    // html node has no styling by design
    return "";
}
