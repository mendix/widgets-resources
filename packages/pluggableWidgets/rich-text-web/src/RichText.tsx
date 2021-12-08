import { ReactNode, createElement, useCallback } from "react";
import { RichTextEditor as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { GroupType, SET_CUSTOM } from "./utils/ckeditorPresets";
import { debounce } from "@mendix/piw-utils-internal";
import { getPreset, defineAdvancedGroups } from "./utils/ckeditorConfigs";
import { CKEditorConfig } from "ckeditor4-react";
import "./ui/RichText.scss";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const onChangeFn = useCallback(
        debounce((value: string) => props.stringAttribute.setValue(value), 500),
        [props.stringAttribute]
    );
    const defineToolbar = (): CKEditorConfig => {
        const { advancedConfig, toolbarConfig, preset } = props;
        if (preset !== "custom") {
            return getPreset(preset);
        } else {
            const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
            let groupItems: any[];
            if (toolbarConfig === "basic") {
                groupItems = groupKeys
                    .filter((groupName: GroupType) => props[groupName])
                    .map((groupName: GroupType) =>
                        groupName.includes("separator") ? "/" : groupName.replace("Group", "").toLowerCase()
                    );
            } else {
                groupItems = defineAdvancedGroups(advancedConfig);
            }

            return SET_CUSTOM(groupItems, toolbarConfig === "basic");
        }
    };
    const plugins = [];
    if (props.advancedMode) {
        if (props.codeHighlight) {
            plugins.push("codesnippet");
        }
    }
    return (
        <RichTextComponent
            advancedConfig={props.advancedConfig}
            advancedContentFilter={
                props.advancedContentFilter === "custom"
                    ? {
                          allowedContent: props.allowedContent,
                          disallowedContent: props.disallowedContent
                      }
                    : null
            }
            sanitizeContent={props.sanitizeContent}
            name={props.name}
            class={props.class}
            editorType={props.editorType}
            readOnlyStyle={props.readOnlyStyle}
            readOnly={props.stringAttribute.readOnly}
            enterMode={props.enterMode}
            shiftEnterMode={props.shiftEnterMode}
            spellChecker={props.spellChecker}
            toolbar={defineToolbar()}
            plugins={plugins}
            value={props.stringAttribute.value as string}
            onValueChange={onChangeFn}
            onKeyPress={props.onKeyPress?.execute}
            onKeyChange={props.onChange?.execute}
            dimensions={{
                width: props.width,
                widthUnit: props.widthUnit,
                height: props.height,
                heightUnit: props.heightUnit
            }}
        />
    );
}
