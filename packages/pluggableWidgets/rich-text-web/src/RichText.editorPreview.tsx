import { createElement, ReactElement } from "react";
import { RichTextPreviewProps } from "../typings/RichTextProps";
interface PreviewProps extends Omit<RichTextPreviewProps, "class"> {
    className: string;
    readOnly: boolean;
    name: string;
}

export const preview = (props: PreviewProps): ReactElement => {
    console.log(props);
    return <div>Editor Preview</div>;
};
