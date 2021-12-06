/**
 * This file was generated from RichText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type EditorTypeEnum = "classic" | "inline";

export type ReadOnlyStyleEnum = "text" | "bordered" | "borderedToolbar";

export type PresetEnum = "basic" | "standard" | "full" | "custom";

export type ToolbarConfigEnum = "basic" | "advanced";

export type CtItemTypeEnum =
    | "seperator"
    | "About"
    | "Anchor"
    | "BGColor"
    | "Blockquote"
    | "Bold"
    | "BulletedList"
    | "Button"
    | "Checkbox"
    | "CodeSnippet"
    | "Copy"
    | "CreateDiv"
    | "Cut"
    | "Find"
    | "Flash"
    | "Font"
    | "FontSize"
    | "Form"
    | "Format"
    | "HiddenField"
    | "HorizontalRule"
    | "Iframe"
    | "Image"
    | "ImageButton"
    | "Indent"
    | "Italic"
    | "JustifyBlock"
    | "JustifyCenter"
    | "JustifyLeft"
    | "JustifyRight"
    | "Language"
    | "Link"
    | "Maximize"
    | "mendixlink"
    | "NewPage"
    | "NumberedList"
    | "Outdent"
    | "PageBreak"
    | "Paste"
    | "PasteFromWord"
    | "PasteText"
    | "Preview"
    | "Print"
    | "Radio"
    | "Redo"
    | "RemoveFormat"
    | "Replace"
    | "Scayt"
    | "Select"
    | "SelectAll"
    | "ShowBlocks"
    | "Smiley"
    | "Source"
    | "SpecialChar"
    | "Strike"
    | "Styles"
    | "Subscript"
    | "Superscript"
    | "Table"
    | "Templates"
    | "BidiLtr"
    | "BidiRtl"
    | "TextColor"
    | "TextField"
    | "Textarea"
    | "Underline"
    | "Undo"
    | "Unlink";

export interface AdvancedConfigType {
    ctItemType: CtItemTypeEnum;
    ctItemToolbar: string;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type EnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type ShiftEnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type AdvancedContentFilterEnum = "auto" | "custom";

export interface AdvancedConfigPreviewType {
    ctItemType: CtItemTypeEnum;
    ctItemToolbar: string;
}

export interface RichTextContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    advancedMode: boolean;
    editorType: EditorTypeEnum;
    stringAttribute: EditableValue<string>;
    sanitizeContent: boolean;
    readOnlyStyle: ReadOnlyStyleEnum;
    preset: PresetEnum;
    toolbarConfig: ToolbarConfigEnum;
    documentGroup: boolean;
    clipboardGroup: boolean;
    editingGroup: boolean;
    formsGroup: boolean;
    separatorGroup: boolean;
    basicStylesGroup: boolean;
    paragraphGroup: boolean;
    linksGroup: boolean;
    separator2Group: boolean;
    stylesGroup: boolean;
    colorsGroup: boolean;
    toolsGroup: boolean;
    othersGroup: boolean;
    advancedConfig: AdvancedConfigType[];
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    onKeyPress?: ActionValue;
    onChange?: ActionValue;
    enterMode: EnterModeEnum;
    shiftEnterMode: ShiftEnterModeEnum;
    spellChecker: boolean;
    codeHighlight: boolean;
    wordCount: boolean;
    maxChars: number;
    advancedContentFilter: AdvancedContentFilterEnum;
    allowedContent: string;
    disallowedContent: string;
}

export interface RichTextPreviewProps {
    class: string;
    style: string;
    advancedMode: boolean;
    editorType: EditorTypeEnum;
    stringAttribute: string;
    sanitizeContent: boolean;
    readOnlyStyle: ReadOnlyStyleEnum;
    preset: PresetEnum;
    toolbarConfig: ToolbarConfigEnum;
    documentGroup: boolean;
    clipboardGroup: boolean;
    editingGroup: boolean;
    formsGroup: boolean;
    separatorGroup: boolean;
    basicStylesGroup: boolean;
    paragraphGroup: boolean;
    linksGroup: boolean;
    separator2Group: boolean;
    stylesGroup: boolean;
    colorsGroup: boolean;
    toolsGroup: boolean;
    othersGroup: boolean;
    advancedConfig: AdvancedConfigPreviewType[];
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    onKeyPress: {} | null;
    onChange: {} | null;
    enterMode: EnterModeEnum;
    shiftEnterMode: ShiftEnterModeEnum;
    spellChecker: boolean;
    codeHighlight: boolean;
    wordCount: boolean;
    maxChars: number | null;
    advancedContentFilter: AdvancedContentFilterEnum;
    allowedContent: string;
    disallowedContent: string;
}
