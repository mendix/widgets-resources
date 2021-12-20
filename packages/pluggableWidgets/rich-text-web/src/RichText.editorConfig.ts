import { Properties, hidePropertiesIn, transformGroupsIntoTabs, hidePropertyIn } from "@mendix/piw-utils-internal";
import { RichTextPreviewProps } from "../typings/RichTextProps";

const advancedModeItems: Array<keyof RichTextPreviewProps> = [
    "enterMode",
    "shiftEnterMode",
    "spellChecker",
    "codeHighlight",
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

export function getProperties(
    values: RichTextPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.preset !== "custom") {
        hidePropertiesIn(defaultProperties, values, toolbarGroups.concat(["toolbarConfig", "advancedConfig"]));
    }
    if (values.toolbarConfig === "basic") {
        hidePropertiesIn(defaultProperties, values, ["advancedConfig"]);
    }
    if (values.toolbarConfig === "advanced") {
        hidePropertiesIn(defaultProperties, values, toolbarGroups);
    }
    if (values.advancedContentFilter === "auto") {
        hidePropertiesIn(defaultProperties, values, ["allowedContent", "disallowedContent"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "advancedMode");
        if (!values.advancedMode) {
            hidePropertiesIn(defaultProperties, values, advancedModeItems);
        }
    }
    return defaultProperties;
}
