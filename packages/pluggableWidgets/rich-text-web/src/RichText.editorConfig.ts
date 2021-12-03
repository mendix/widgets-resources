import { Problem, Properties, hidePropertiesIn } from "@mendix/piw-utils-internal";
import { RichTextPreviewProps } from "../typings/RichTextProps";

const advancedModeItems: Array<keyof RichTextPreviewProps> = [
    "enterMode",
    "shiftEnterMode",
    "autoParagraph",
    "spellChecker",
    "codeHighlight",
    "maxChars",
    "advancedContentFilter",
    "allowedContent",
    "disallowedContent"
];
const toolbarGroups: Array<keyof RichTextPreviewProps> = [
    "toolsGroup",
    "separatorGroup",
    "stylesGroup",
    "basicStylesGroup",
    "clipboardGroup",
    "colorsGroup",
    "documentGroup",
    "editingGroup",
    "formsGroup",
    "linksGroup",
    "paragraphGroup",
    "othersGroup",
    "separator2Group"
];

export function getProperties(values: RichTextPreviewProps, defaultProperties: Properties): Properties {
    if (!values.advancedMode) {
        hidePropertiesIn(defaultProperties, values, advancedModeItems);
    }
    if (values.advancedMode && values.advancedContentFilter === "auto") {
        hidePropertiesIn(defaultProperties, values, ["allowedContent", "disallowedContent"]);
    }
    if (values.preset !== "custom") {
        hidePropertiesIn(defaultProperties, values, toolbarGroups.concat(["toolbarConfig", "advancedGroup"]));
    }
    if (values.toolbarConfig === "basic") {
        hidePropertiesIn(defaultProperties, values, ["advancedGroup"]);
    }
    if (values.toolbarConfig === "advanced") {
        hidePropertiesIn(defaultProperties, values, toolbarGroups);
    }

    if (!values.wordCount) {
        hidePropertiesIn(defaultProperties, values, ["maxChars"]);
    }
    return defaultProperties;
}

export function check(_values: RichTextPreviewProps): Problem[] {
    return [];
}
