/**
 * This file was generated from RichText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type EditorTypeEnum = "classic" | "inline";

export type ShowLabelEnum = "yes" | "no";

export type ReadOnlyStyleEnum = "text" | "bordered" | "borderedToolbar";

export type PresetEnum = "basic" | "standard" | "full" | "custom";

export type ToolbarConfigEnum = "basic" | "advanced";

export type DocumentGroupEnum = "yes" | "no";

export type ClipboardGroupEnum = "yes" | "no";

export type EditingGroupEnum = "yes" | "no";

export type FormsGroupEnum = "yes" | "no";

export type SeparatorGroupEnum = "yes" | "no";

export type BasicStylesGroupEnum = "yes" | "no";

export type ParagraphGroupEnum = "yes" | "no";

export type LinksGroupEnum = "yes" | "no";

export type Separator2GroupEnum = "yes" | "no";

export type StylesGroupEnum = "yes" | "no";

export type ColorsGroupEnum = "yes" | "no";

export type ToolsGroupEnum = "yes" | "no";

export type OthersGroupEnum = "yes" | "no";

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

export interface AdvancedGroupType {
    ctItemType: CtItemTypeEnum;
    ctItemToolbar: string;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type EnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type ShiftEnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type AutoParagraphEnum = "yes" | "no";

export type SpellCheckerEnum = "yes" | "no";

export type CodeHighlightEnum = "yes" | "no";

export type WordCountEnum = "yes" | "no";

export type AdvancedContentFilterEnum = "auto" | "custom";

export interface AdvancedGroupPreviewType {
    ctItemType: CtItemTypeEnum;
    ctItemToolbar: string;
}

export interface RichTextContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advancedMode: boolean;
    editorType: EditorTypeEnum;
    stringAttribute: EditableValue<string>;
    sanitizeContent: boolean;
    showLabel: ShowLabelEnum;
    labelMessage?: DynamicValue<string>;
    readOnlyStyle: ReadOnlyStyleEnum;
    preset: PresetEnum;
    toolbarConfig: ToolbarConfigEnum;
    documentGroup: DocumentGroupEnum;
    clipboardGroup: ClipboardGroupEnum;
    editingGroup: EditingGroupEnum;
    formsGroup: FormsGroupEnum;
    separatorGroup: SeparatorGroupEnum;
    basicStylesGroup: BasicStylesGroupEnum;
    paragraphGroup: ParagraphGroupEnum;
    linksGroup: LinksGroupEnum;
    separator2Group: Separator2GroupEnum;
    stylesGroup: StylesGroupEnum;
    colorsGroup: ColorsGroupEnum;
    toolsGroup: ToolsGroupEnum;
    othersGroup: OthersGroupEnum;
    advancedGroup: AdvancedGroupType[];
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    onKeyPress?: ActionValue;
    onChange?: ActionValue;
    enterMode: EnterModeEnum;
    shiftEnterMode: ShiftEnterModeEnum;
    autoParagraph: AutoParagraphEnum;
    spellChecker: SpellCheckerEnum;
    codeHighlight: CodeHighlightEnum;
    wordCount: WordCountEnum;
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
    showLabel: ShowLabelEnum;
    labelMessage: string;
    readOnlyStyle: ReadOnlyStyleEnum;
    preset: PresetEnum;
    toolbarConfig: ToolbarConfigEnum;
    documentGroup: DocumentGroupEnum;
    clipboardGroup: ClipboardGroupEnum;
    editingGroup: EditingGroupEnum;
    formsGroup: FormsGroupEnum;
    separatorGroup: SeparatorGroupEnum;
    basicStylesGroup: BasicStylesGroupEnum;
    paragraphGroup: ParagraphGroupEnum;
    linksGroup: LinksGroupEnum;
    separator2Group: Separator2GroupEnum;
    stylesGroup: StylesGroupEnum;
    colorsGroup: ColorsGroupEnum;
    toolsGroup: ToolsGroupEnum;
    othersGroup: OthersGroupEnum;
    advancedGroup: AdvancedGroupPreviewType[];
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
    onKeyPress: {} | null;
    onChange: {} | null;
    enterMode: EnterModeEnum;
    shiftEnterMode: ShiftEnterModeEnum;
    autoParagraph: AutoParagraphEnum;
    spellChecker: SpellCheckerEnum;
    codeHighlight: CodeHighlightEnum;
    wordCount: WordCountEnum;
    maxChars: number | null;
    advancedContentFilter: AdvancedContentFilterEnum;
    allowedContent: string;
    disallowedContent: string;
}
