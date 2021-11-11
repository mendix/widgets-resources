/**
 * This file was generated from RichText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type ThemeEnum = "snow" | "bubble";

export type EditorOptionEnum = "basic" | "extended" | "custom";

export type ReadOnlyStyleEnum = "text" | "bordered" | "borderedToolbar";

export type OptionEnum =
    | "bold"
    | "italic"
    | "underline"
    | "strike"
    | "link"
    | "headings"
    | "orderedList"
    | "bulletList"
    | "blockQuote"
    | "codeBlock"
    | "subScript"
    | "superScript"
    | "indent"
    | "outdent"
    | "direction"
    | "textColor"
    | "fillColor"
    | "align"
    | "clean"
    | "spacer";

export interface CustomOptionsType {
    option: OptionEnum;
}

export type TabActionEnum = "indent" | "changeFocus";

export interface CustomOptionsPreviewType {
    option: OptionEnum;
}

export interface RichTextContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    stringAttribute: EditableValue<string>;
    sanitizeContent: boolean;
    theme: ThemeEnum;
    editorOption: EditorOptionEnum;
    readOnlyStyle: ReadOnlyStyleEnum;
    minNumberOfLines: number;
    maxNumberOfLines: number;
    customOptions: CustomOptionsType[];
    tabAction: TabActionEnum;
    action?: ActionValue;
}

export interface RichTextPreviewProps {
    class: string;
    style: string;
    stringAttribute: string;
    sanitizeContent: boolean;
    theme: ThemeEnum;
    editorOption: EditorOptionEnum;
    readOnlyStyle: ReadOnlyStyleEnum;
    minNumberOfLines: number | null;
    maxNumberOfLines: number | null;
    customOptions: CustomOptionsPreviewType[];
    tabAction: TabActionEnum;
    action: {} | null;
}
