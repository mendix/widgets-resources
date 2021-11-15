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

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export type EnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type ShiftEnterModeEnum = "paragraph" | "breakLines" | "blocks";

export type AutoParagraphEnum = "yes" | "no";

export type SpellCheckerEnum = "yes" | "no";

export type CodeHighlightEnum = "yes" | "no";

export type WordCountEnum = "yes" | "no";

export type AdvancedContentFilterEnum = "yes" | "no";

export interface RichTextContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    stringAttribute: EditableValue<string>;
    sanitizeContent: boolean;
    editorType: EditorTypeEnum;
    readOnlyStyle: ReadOnlyStyleEnum;
    advancedMode: boolean;
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
}

export interface RichTextPreviewProps {
    class: string;
    style: string;
    stringAttribute: string;
    sanitizeContent: boolean;
    editorType: EditorTypeEnum;
    readOnlyStyle: ReadOnlyStyleEnum;
    advancedMode: boolean;
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
}
