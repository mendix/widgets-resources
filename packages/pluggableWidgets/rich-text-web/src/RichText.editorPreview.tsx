import { createElement, ReactElement } from "react";
import { RichTextPreviewProps } from "../typings/RichTextProps";
import { RichText } from "./components/RichText";

interface PreviewProps extends Omit<RichTextPreviewProps, "class"> {
    className: string;
    readOnly: boolean;
    name: string;
}

export const preview = (props: PreviewProps): ReactElement => {
    return (
        <RichText
            label={props.labelMessage}
            readOnly={props.readOnly}
            plugins={[]}
            value={"Editor Preview"}
            advancedContentFilter={null}
            name={props.name}
            toolbarGroup={[]}
            advancedGroup={null}
            spellChecker={"no"}
            class={props.className}
            editorType={props.editorType}
            preset={props.preset}
            readOnlyStyle={props.readOnlyStyle}
            toolbarConfig={props.toolbarConfig}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/RichText.scss");
}
