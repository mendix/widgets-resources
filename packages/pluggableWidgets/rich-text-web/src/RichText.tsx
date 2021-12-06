import { ReactNode, createElement, useCallback } from "react";
import { RichTextEditor as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { GroupType } from "./utils/ckeditorPresets";
import { debounce } from "@mendix/piw-utils-internal";
import "./ui/RichText.scss";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const onChangeFn = useCallback(
        debounce((value: string) => props.stringAttribute.setValue(value), 500),
        [props.stringAttribute]
    );
    const toolbarGroup = (): string[] | undefined => {
        const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
        const { toolbarConfig, advancedConfig } = props;
        if (toolbarConfig === "basic") {
            return groupKeys
                .filter((groupName: GroupType) => props[groupName])
                .map((groupName: GroupType) =>
                    groupName.includes("separator") ? "/" : groupName.replace("Group", "").toLowerCase()
                );
        } else if (toolbarConfig === "advanced") {
            return advancedConfig.map(group => (group.ctItemType !== "seperator" ? group.ctItemType : "-"));
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
            autoParagraph={props.autoParagraph}
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
            preset={props.preset}
            enterMode={props.enterMode}
            shiftEnterMode={props.shiftEnterMode}
            spellChecker={props.spellChecker}
            toolbarConfig={props.toolbarConfig}
            toolbarGroup={toolbarGroup()}
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
