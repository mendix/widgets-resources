import { Component, ReactNode, createElement } from "react";
import * as classNames from "classnames";

import * as Quill from "quill";
import * as sanitizeHtml from "sanitize-html";

import { ReadOnlyStyle } from "./RichTextContainer";
import { getAdvancedOptions, getBasicOptions, getToolbar } from "../utils/Quill";

import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../ui/RichText.scss";

export interface CommonRichTextProps {
    editorOption: EditorOption;
    value: string;
    readOnly: boolean;
    readOnlyStyle: ReadOnlyStyle;
    theme: Theme;
    customOptions: { option: string }[];
    minNumberOfLines: number;
    maxNumberOfLines: number;
}

export interface RichTextProps extends CommonRichTextProps {
    className?: string;
    onChange?: (value: string) => void;
    style?: object;
}

export type EditorOption = "basic" | "extended" | "custom";
export type Theme = "snow" | "bubble";

export class RichText extends Component<RichTextProps, {}> {
    private quillNode?: HTMLElement;
    private quill?: Quill.Quill;
    private averageLineHeight = 1.42857; // Copied from the bootstrap <p/> element css

    constructor(props: RichTextProps) {
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.setQuillNode = this.setQuillNode.bind(this);
    }

    render() {
        return createElement("div",
            {
                className: classNames("widget-rich-text", this.props.className, {
                    [ RichText.getReadOnlyClasses(this.props.readOnlyStyle) ]: this.props.readOnly,
                    "buttons-hidden": this.props.editorOption === "custom" && this.props.customOptions.length === 0
                }),
                dangerouslySetInnerHTML: this.getReadOnlyText(),
                style: this.props.style
            },
            this.renderQuillNode()
        );
    }

    componentDidMount() {
        this.setUpEditor(this.props);
    }

    componentDidUpdate(prevProps: RichTextProps) {
        if (prevProps.readOnly && !this.props.readOnly && this.props.readOnlyStyle !== "text") {
            this.setUpEditor(this.props);
        }
        this.updateEditor(this.props);
    }

    componentWillUnmount() {
        this.handleSelectionChange();
        if (this.quill) {
            this.quill.off("selection-change", this.handleSelectionChange);
        }
    }

    private static getReadOnlyClasses(readOnlyStyle: ReadOnlyStyle): string {
        return classNames({
            "disabled-text": readOnlyStyle === "text",
            "disabled-bordered": readOnlyStyle === "bordered",
            "disabled-bordered-toolbar": readOnlyStyle === "borderedToolbar"
        });
    }

    private getReadOnlyText(): { __html: string } | undefined {
        return this.props.readOnly && this.props.readOnlyStyle === "text"
            ? { __html: sanitizeHtml(this.props.value) }
            : undefined;
    }

    private renderQuillNode(): ReactNode {
        return !(this.props.readOnly && this.props.readOnlyStyle === "text")
            ? createElement("div", {
                className: classNames("widget-rich-text-quill"),
                ref: this.setQuillNode
            })
            : null;
    }

    private setQuillNode(node: HTMLElement) {
        this.quillNode = node;
    }

    private setUpEditor(props: RichTextProps) {
        if (this.quillNode && !this.quill) {
            this.quill = new Quill(this.quillNode, {
                modules: this.getEditorOptions(),
                theme: props.theme
            });

            this.quill.on("selection-change", this.handleSelectionChange);

            this.updateEditor(props);
        }
    }

    private handleSelectionChange() {
        if (this.quill && !this.quill.hasFocus() && this.props.onChange) {
            const value = this.quill.container.firstChild.innerHTML;
            if (this.props.value !== value) {
                this.props.onChange(value);
            }
        }
    }

    private updateEditor(props: RichTextProps) {
        if (this.quill) {
            this.quill.enable(!props.readOnly);
            this.quill.clipboard.dangerouslyPasteHTML(props.value);

            this.setEditorStyle(props);
        }
    }

    private setEditorStyle(props: RichTextProps) {
        if (this.quillNode) {
            const quillEditor = this.quillNode.getElementsByClassName("ql-editor")[ 0 ] as HTMLDivElement;
            if (quillEditor) {
                quillEditor.classList.add("form-control");
                if (props.minNumberOfLines > 0) {
                    quillEditor.style.minHeight = `${(props.minNumberOfLines + 1) * this.averageLineHeight}em`;
                }
                if (props.maxNumberOfLines > 0) {
                    quillEditor.style.maxHeight = `${(props.maxNumberOfLines + 1) * this.averageLineHeight}em`;
                }
            }
        }
    }

    private getEditorOptions(): Quill.StringMap {
        if (this.props.editorOption === "basic") {
            return getBasicOptions();
        } else if (this.props.editorOption === "extended") {
            return getAdvancedOptions();
        }

        return getToolbar(this.props.customOptions.length ? this.props.customOptions : [ { option: "spacer" } ]);
    }
}
