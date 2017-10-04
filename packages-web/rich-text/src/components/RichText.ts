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
    recreate?: boolean;
}

export interface RichTextProps extends CommonRichTextProps {
    className?: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    style?: object;
}

export type EditorOption = "basic" | "extended" | "custom";
export type Theme = "snow" | "bubble";

export class RichText extends Component<RichTextProps, {}> {
    private richTextNode?: HTMLElement;
    private quillNode?: HTMLElement;
    private quill?: Quill.Quill;
    private averageLineHeight = 1.42857; // Copied from the bootstrap <p/> element css
    private textChanged = false;
    private undoDefault = "<p><br></p>"; // Text left in editor when ctrl + z clears all content

    constructor(props: RichTextProps) {
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setQuillNode = this.setQuillNode.bind(this);
        this.setRichTextNode = this.setRichTextNode.bind(this);
    }

    render() {
        return createElement("div",
            {
                className: classNames("widget-rich-text", this.props.className, {
                    [ RichText.getReadOnlyClasses(this.props.readOnlyStyle) ]: this.props.readOnly,
                    "buttons-hidden": this.props.editorOption === "custom" && this.props.customOptions.length === 0
                }),
                dangerouslySetInnerHTML: this.getReadOnlyText(),
                ref: this.setRichTextNode,
                style: this.props.style
            },
            this.renderQuillNode()
        );
    }

    componentDidMount() {
        this.setUpEditor(this.props);
    }

    componentDidUpdate(prevProps: RichTextProps) {
        if (this.props.recreate) {
            this.recreateEditor(this.props);

            return;
        }
        if (prevProps.readOnly && !this.props.readOnly && this.props.readOnlyStyle !== "text") {
            this.setUpEditor(this.props);
        }
        if (this.quill && this.props.value !== this.quill.root.innerHTML) {
            this.updateEditor(this.props);
        }
    }

    componentWillUnmount() {
        this.handleSelectionChange();
        if (this.quill) {
            this.quill.off("selection-change", this.handleSelectionChange);
            this.quill.off("text-change", this.handleTextChange);
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
            ? createElement("div", { className: "widget-rich-text-quill", ref: this.setQuillNode })
            : null;
    }

    private setQuillNode(node: HTMLElement) {
        this.quillNode = node;
    }

    private setRichTextNode(node: HTMLElement) {
        this.richTextNode = node;
    }

    private setUpEditor(props: RichTextProps) {
        if (this.quillNode && !this.quill) {
            this.quill = new Quill(this.quillNode, {
                modules: this.getEditorOptions(),
                theme: props.theme
            });
            this.updateEditor(props);
            this.quill.on("selection-change", this.handleSelectionChange);
            this.quill.on("text-change", this.handleTextChange);
            const toolbar = this.richTextNode && this.richTextNode.querySelector(".ql-toolbar");
            if (toolbar) {
                // required to disable editor blur events when the toolbar is clicked
                toolbar.addEventListener("mousedown", event => event.preventDefault());
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

    private handleTextChange() {
        if (this.quill) {
            const value = this.quill.root.innerHTML !== this.undoDefault ? this.quill.root.innerHTML : "";
            if (this.props.value !== value) {
                this.props.onChange(value);
                this.textChanged = true;
            }
        }
    }

    private handleSelectionChange() {
        if (this.textChanged && this.quill && !this.quill.hasFocus()) {
            this.props.onBlur();
            this.textChanged = false;
        }
    }

    private recreateEditor(props: RichTextProps) {
        if (this.quill && this.richTextNode) {
            this.quill.off("selection-change", this.handleSelectionChange);
            this.quill.off("text-change", this.handleTextChange);
            this.quill = undefined;
            const toolbar = this.richTextNode.querySelector(".ql-toolbar");
            if (toolbar) {
                toolbar.remove();
            }
        }
        this.setUpEditor(props);
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
