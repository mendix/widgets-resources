import { Component, createElement, ReactNode } from "react";

import { RichText, RichTextProps } from "./components/RichText";
import { RichTextContainerProps } from "./components/RichTextContainer";

import { ValidateConfigs } from "./components/ValidateConfigs";
import { parseStyle } from "./utils/ContainerUtils";

export class preview extends Component<RichTextContainerProps, {}> {
    render(): ReactNode {
        return createElement(
            ValidateConfigs,
            { ...(this.props as RichTextContainerProps), showOnError: true },
            createElement(RichText, preview.transformProps(this.props))
        );
    }

    private static transformProps(props: RichTextContainerProps): RichTextProps {
        const valueAttribute = props.stringAttribute ? props.stringAttribute.split(".")[2] : "";

        return {
            editorOption: props.editorOption,
            theme: props.theme,
            customOptions: props.customOptions,
            minNumberOfLines: props.minNumberOfLines,
            maxNumberOfLines: props.maxNumberOfLines,
            readOnlyStyle: props.mxObject ? props.readOnlyStyle : "bordered",
            translatable: false,
            className: props.class,
            style: parseStyle(props.style),
            sanitizeContent: props.sanitizeContent,
            readOnly: props.editable === "never",
            recreate: true,
            value: `<p>${valueAttribute ? `[${valueAttribute}]` : props.stringAttribute}</p>`,
            onChange: value => value,
            onBlur: () => null
        };
    }
}

export function getPreviewCss(): string {
    return (
        require("quill/dist/quill.snow.css") + require("quill/dist/quill.bubble.css") + require("./ui/RichText.scss")
    );
}
