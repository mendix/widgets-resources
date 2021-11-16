import { Problem, Properties, hidePropertiesIn } from "@mendix/piw-utils-internal";
import { RichTextPreviewProps } from "../typings/RichTextProps";

export function getProperties(values: RichTextPreviewProps, defaultProperties: Properties): Properties {
    if (!values.advancedMode) {
        hidePropertiesIn(defaultProperties, values, [
            "maxChars",
            "wordCount",
            "advancedContentFilter",
            "codeHighlight",
            "allowedContent",
            "disallowedContent"
        ]);
    }
    if (values.advancedMode && values.advancedContentFilter === "auto") {
        hidePropertiesIn(defaultProperties, values, ["allowedContent", "disallowedContent"]);
    }
    if (values.preset !== "custom") {
        hidePropertiesIn(defaultProperties, values, [
            "toolsGroup",
            "toolbarConfig",
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
            "separator2Group",
            "advancedGroup"
        ]);
    }
    if (values.toolbarConfig === "basic") {
        hidePropertiesIn(defaultProperties, values, ["advancedGroup"]);
    }
    if (values.toolbarConfig === "advanced") {
        hidePropertiesIn(defaultProperties, values, [
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
        ]);
    }
    return defaultProperties;
}

export function check(_values: RichTextPreviewProps): Problem[] {
    return [];
}
