import { ReactNode, createElement, useCallback } from "react";
import { RichText as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { generateUUID } from "@mendix/piw-utils-internal/dist/components/web";
import { getToolbarGroupByName, GroupType } from "./utils/ckeditorConfigs";
import "./ui/RichText.scss";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const id = generateUUID();
    const onChangeFn = useCallback(
        (value: string) => {
            props.stringAttribute.setValue(value);
        },
        [props.stringAttribute]
    );
    const toolbarGroup = () => {
        const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
        const { toolbarConfig, advancedGroup } = props;
        if (toolbarConfig === "basic") {
            return groupKeys
                .filter((groupName: GroupType) => props[groupName] === "yes")
                .map((groupName: GroupType) => {
                    return groupName.includes("separator")
                        ? "/"
                        : getToolbarGroupByName(groupName.replace("Group", "").toLowerCase());
                });
        } else if (toolbarConfig === "advanced") {
            return advancedGroup.map(group => [group.ctItemType !== "seperator" ? group.ctItemType : "-"]);
        }
    };
    const plugins = [];
    if (props.advancedMode) {
        if (props.codeHighlight) {
            plugins.push("codesnippet");
        }
        if (props.wordCount) {
            plugins.push("wordcount");
        }
    }
    if (props.advancedContentFilter === "custom") {
    }
    return (
        <RichTextComponent
            id={`RichText-${id}`}
            advancedGroup={props.advancedGroup}
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
            value={props.stringAttribute.value}
            onChange={onChangeFn}
            label={props.labelMessage?.value}
            dimensions={{
                width: props.width,
                widthUnit: props.widthUnit,
                height: props.height,
                heightUnit: props.heightUnit
            }}
        />
    );
}
