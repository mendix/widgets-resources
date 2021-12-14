import { createElement, ReactElement } from "react";
import { RichTextPreviewProps } from "../typings/RichTextProps";
import { RichTextEditor } from "./components/RichText";
import { getPreset } from "./utils/ckeditorConfigs";

interface PreviewProps extends Omit<RichTextPreviewProps, "readOnly"> {
    readOnly: boolean;
    name: string;
}

export const preview = (props: PreviewProps): ReactElement => {
    return (
        <RichTextEditor
            readOnly={props.readOnly}
            plugins={[]}
            value={"Editor Preview"}
            advancedContentFilter={null}
            name={props.name}
            toolbar={getPreset("basic")}
            advancedConfig={null}
            spellChecker={false}
            editorType={props.editorType}
            readOnlyStyle={props.readOnlyStyle}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/RichText.scss");
}
