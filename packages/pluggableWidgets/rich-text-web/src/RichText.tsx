import { ReactNode, createElement, useCallback, useMemo } from "react";
import { RichText as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { generateUUID } from "@mendix/piw-utils-internal/dist/components/web";
import { getToolbarGroupByName, GroupType } from "./utils/ckeditorConfigs";
import "./ui/RichText.scss";
import { debounce } from "@mendix/piw-utils-internal";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const id = useMemo(() => generateUUID(), []);
    const onChangeFn = useCallback(
        debounce((value: string) => props.stringAttribute.setValue(value), 500),
        [props.stringAttribute]
    );
    const toolbarGroup = () => {
        const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
        const { toolbarConfig, advancedGroup } = props;
        if (toolbarConfig === "basic") {
            return groupKeys
                .filter((groupName: GroupType) => props[groupName])
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
