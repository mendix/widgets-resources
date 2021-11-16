import { ReactNode, createElement } from "react";
import { RichText as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";

export default function RichText(props: RichTextContainerProps): ReactNode {
    return (
        <RichTextComponent
            advancedGroup={props.advancedGroup}
            name={props.name}
            class={props.class}
            stringAttribute={props.stringAttribute}
            sanitizeContent={props.sanitizeContent}
            editorType={props.editorType}
            readOnlyStyle={props.readOnlyStyle}
            advancedMode={props.advancedMode}
            preset={props.preset}
            toolbarConfig={props.toolbarConfig}
            documentGroup={props.documentGroup}
            clipboardGroup={props.clipboardGroup}
            editingGroup={props.editingGroup}
            formsGroup={props.formsGroup}
            separatorGroup={props.separatorGroup}
            basicStylesGroup={props.basicStylesGroup}
            paragraphGroup={props.paragraphGroup}
            linksGroup={props.linksGroup}
            separator2Group={props.separator2Group}
            stylesGroup={props.stylesGroup}
            colorsGroup={props.colorsGroup}
            toolsGroup={props.toolsGroup}
            othersGroup={props.othersGroup}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
            enterMode={props.enterMode}
            shiftEnterMode={props.shiftEnterMode}
            autoParagraph={props.autoParagraph}
            spellChecker={props.spellChecker}
            codeHighlight={props.codeHighlight}
            wordCount={props.wordCount}
            maxChars={props.maxChars}
            advancedContentFilter={props.advancedContentFilter}
            allowedContent={props.allowedContent}
            disallowedContent={props.disallowedContent}
        />
    );
}
