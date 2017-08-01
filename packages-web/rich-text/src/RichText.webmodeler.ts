import { Component, createElement } from "react";

import { RichText, RichTextProps } from "./components/RichText";
import { RichTextContainerProps } from "./components/RichTextContainer";

import { parseStyle } from "./utils/ContainerUtils";
import { ValidateConfigs } from "./components/ValidateConfigs";

interface PreviewState {
    reloadEditor: boolean;
}

// tslint:disable-next-line class-name
export class preview extends Component<RichTextContainerProps, PreviewState> {
    constructor(props: RichTextContainerProps) {
        super(props);

        this.state = {
            reloadEditor: false
        };
    }

    render() {
        return !this.state.reloadEditor
            ? createElement(ValidateConfigs, { ...this.props as RichTextContainerProps, showOnError: true },
                createElement(RichText, preview.transformProps(this.props)))
            : null;
    }

    componentWillReceiveProps() {
        this.setState({ reloadEditor: true });
    }

    componentDidUpdate() {
        if (this.state.reloadEditor) {
            this.setState({ reloadEditor: false });
        }
    }

    private static transformProps(props: RichTextContainerProps): RichTextProps {
        const valueAttribute = props.stringAttribute ? props.stringAttribute.split(".")[ 2 ] : "";

        return {
            className: props.class,
            customOptions: props.customOptions,
            editorOption: props.editorOption,
            maxNumberOfLines: props.maxNumberOfLines,
            minNumberOfLines: props.minNumberOfLines,
            readOnly: props.editable === "never",
            readOnlyStyle: props.readOnlyStyle,
            style: parseStyle(props.style),
            theme: props.theme,
            value: `<p>${valueAttribute ? `[${valueAttribute}]` : props.stringAttribute}</p>`
        };
    }
}

export function getPreviewCss() {
    return (
        require("quill/dist/quill.snow.css") +
        require("quill/dist/quill.bubble.css") +
        require("./ui/RichText.scss")
    );
}
