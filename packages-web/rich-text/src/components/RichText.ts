import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";

import { Alert } from "./Alert";
import Quill from "quill";
import sanitizeHtml from "sanitize-html";

import { ReadOnlyStyle } from "./RichTextContainer";
import { getAdvancedOptions, getBasicOptions, getToolbar } from "../utils/Quill";

import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../ui/RichText.scss";

export interface CommonRichTextProps {
    editorOption: EditorOption;
    value: string;
    sanitizeContent: boolean;
    readOnly: boolean;
    readOnlyStyle: ReadOnlyStyle;
    translatable: boolean;
    theme: Theme;
    customOptions: Array<{ option: string }>;
    minNumberOfLines: number;
    maxNumberOfLines: number;
    recreate?: boolean;
    alertMessage?: string;
    tabAction?: TabOptions;
}

export interface RichTextProps extends CommonRichTextProps {
    className?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    style?: object;
}

export type EditorOption = "basic" | "extended" | "custom";
export type TabOptions = "indent" | "changeFocus";
export type Theme = "snow" | "bubble";

export class RichText extends Component<RichTextProps> {
    private richTextNode?: HTMLElement;
    private quillNode?: HTMLElement;
    private quill?: Quill.Quill;
    private averageLineHeight = 1.42857; // Copied from the bootstrap <p/> element css
    private textChanged = false;
    private undoDefault = "<p><br></p>"; // Text left in editor when ctrl + z clears all content

    UNSAFE_componentWillMount(): void {
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setQuillNode = this.setQuillNode.bind(this);
        this.setRichTextNode = this.setRichTextNode.bind(this);
    }

    render(): ReactNode {
        return createElement(
            "div",
            {
                className: classNames("widget-rich-text", this.props.className, {
                    "has-error": !!this.props.alertMessage,
                    notranslate: !this.props.translatable || this.props.readOnlyStyle !== "text",
                    [RichText.getReadOnlyClasses(this.props.readOnlyStyle)]: this.props.readOnly,
                    "buttons-hidden": this.props.editorOption === "custom" && this.props.customOptions.length === 0,
                    "ql-snow": this.props.readOnly && this.props.readOnlyStyle === "text"
                })
            },
            createElement(
                "div",
                {
                    className: this.props.readOnly && this.props.readOnlyStyle === "text" ? "ql-editor" : undefined,
                    dangerouslySetInnerHTML: this.getReadOnlyText(),
                    ref: this.setRichTextNode,
                    style: { whiteSpace: "pre-wrap", ...this.props.style }
                },
                this.renderQuillNode()
            ),
            this.renderAlertMessage()
        );
    }

    componentDidMount(): void {
        this.setUpEditor(this.props);
    }

    componentDidUpdate(prevProps: RichTextProps): void {
        if (this.props.recreate) {
            this.recreateEditor(this.props);

            return;
        }
        if (prevProps.readOnly && !this.props.readOnly && this.props.readOnlyStyle !== "text") {
            this.setUpEditor(this.props);
        }
        if (
            this.quill &&
            this.props.value !== this.quill.root.innerHTML &&
            !(this.props.readOnly && this.props.readOnlyStyle === "text")
        ) {
            this.updateEditor(this.props);
        }
    }

    componentWillUnmount(): void {
        this.handleSelectionChange();
        if (this.quill) {
            this.quill.off("selection-change", this.handleSelectionChange);
            this.quill.off("text-change", this.handleTextChange);
        }
    }

    private getReadOnlyText(): { __html: string } | undefined {
        return this.props.readOnly && this.props.readOnlyStyle === "text"
            ? { __html: this.sanitize(this.props.value) }
            : undefined;
    }

    private sanitize(value: string): string {
        if (this.props.sanitizeContent) {
            try {
                return sanitizeHtml(value, {
                    allowedTags: [
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "p",
                        "br",
                        "a",
                        "ul",
                        "li",
                        "ol",
                        "s",
                        "u",
                        "em",
                        "pre",
                        "strong",
                        "blockquote",
                        "span"
                    ],
                    allowedAttributes: {
                        "*": ["class", "style"],
                        a: ["href", "name", "target"]
                    },
                    allowedSchemes: ["http", "https", "ftp", "mailto"]
                });
            } catch (e) {
                // Catch error in IE where link href="{%attribute%}"
                mx.ui.error("Failed to sanitize text, please use an other browser");
                if (this.quill) {
                    this.quill.enable(false);
                }
                return "";
            }
        }
        return value;
    }

    private renderQuillNode(): ReactNode {
        return !(this.props.readOnly && this.props.readOnlyStyle === "text")
            ? createElement("div", { className: "widget-rich-text-quill", ref: this.setQuillNode })
            : null;
    }

    private renderAlertMessage(): ReactNode {
        return !this.props.readOnly ? createElement(Alert, { message: this.props.alertMessage }) : null;
    }

    private setQuillNode(node: HTMLElement): void {
        this.quillNode = node;
    }

    private setRichTextNode(node: HTMLElement): void {
        this.richTextNode = node;
    }

    private setUpEditor(props: RichTextProps): void {
        if (this.quillNode && !this.quill) {
            this.quill = new Quill(this.quillNode, {
                modules: {
                    ...this.getEditorOptions(),
                    keyboard: this.props.tabAction === "changeFocus" ? this.createKeyboardModule() : {}
                },
                theme: props.theme,
                clipboard: { matchVisual: false }
            } as any);
            this.updateEditor(props);
            this.quill.on("selection-change", this.handleSelectionChange);
            this.quill.on("text-change", this.handleTextChange);
            const toolbar = this.richTextNode && this.richTextNode.querySelector(".ql-toolbar");
            const editor = this.richTextNode && this.richTextNode.querySelector(".ql-editor");
            if (toolbar) {
                // required to disable editor blur events when the toolbar is clicked
                toolbar.addEventListener("mousedown", event => event.preventDefault());
            }
            if (editor && props.tabAction === "indent") {
                editor.addEventListener("keydown", event => event.stopPropagation());
                editor.addEventListener("touchend", event => event.stopPropagation());
            } else if (editor) {
                editor.addEventListener("touchend", () => {
                    if (this.quill && !this.quill.hasFocus()) {
                        this.quill.focus();
                    }
                });
            }
        }
    }

    private updateEditor(props: RichTextProps): void {
        if (this.quill) {
            try {
                this.quill.clipboard.dangerouslyPasteHTML(this.sanitize(props.value), "silent");
                this.quill.enable(!props.readOnly);
                this.setEditorStyle(props);
            } catch (e) {
                // Catch error in IE where link href="{%attribute%}"
                mx.ui.error("Failed to sanitize text, please use an other browser");
                this.quill.enable(false);
            }
        }
    }

    private handleTextChange(): void {
        if (this.quill) {
            const value = this.quill.root.innerHTML !== this.undoDefault ? this.quill.root.innerHTML : "";
            if (this.props.value !== value && this.props.onChange) {
                this.props.onChange(value);
                this.textChanged = true;
            }
        }
    }

    private handleSelectionChange(): void {
        if (this.textChanged && this.quill && !this.quill.hasFocus() && this.props.onBlur) {
            this.props.onBlur();
            this.textChanged = false;
        }
    }

    private recreateEditor(props: RichTextProps): void {
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

    private setEditorStyle(props: RichTextProps): void {
        if (this.quillNode) {
            const quillEditor = this.quillNode.getElementsByClassName("ql-editor")[0] as HTMLDivElement;
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

        return getToolbar(this.props.customOptions.length ? this.props.customOptions : [{ option: "spacer" }]);
    }

    private createKeyboardModule(): any {
        return {
            bindings: {
                indent: {
                    key: 9,
                    handler: (range: { index: number; length: number }) => {
                        this.formatText(range);
                        return false;
                    }
                },
                tab: {
                    key: 9,
                    handler: (range: { index: number; length: number }) => {
                        this.formatText(range);
                        return false;
                    }
                }
            }
        };
    }

    private formatText(range: { index: number; length: number }): void {
        if (this.quill) {
            this.quill.formatText(range.index, range.length + 1, { indent: -1 });
        }
    }

    private static getReadOnlyClasses(readOnlyStyle: ReadOnlyStyle): string {
        return classNames({
            "disabled-text": readOnlyStyle === "text",
            "disabled-bordered": readOnlyStyle === "bordered",
            "disabled-bordered-toolbar": readOnlyStyle === "borderedToolbar"
        });
    }
}
