import { ReactNode, createElement, useCallback } from "react";
import { RichTextEditor as RichTextComponent } from "./components/RichText";
import { RichTextContainerProps } from "../typings/RichTextProps";
import { GroupType, createCustomToolbar, ToolbarItems } from "./utils/ckeditorPresets";
import { debounce, executeAction } from "@mendix/piw-utils-internal";
import { getPreset, defineAdvancedGroups } from "./utils/ckeditorConfigs";
import { CKEditorConfig } from "ckeditor4-react";
import loadingCircleSvg from "./ui/loading-circle.svg";
import "./ui/RichText.scss";

export default function RichText(props: RichTextContainerProps): ReactNode {
    const onKeyChange = useCallback(() => executeAction(props.onChange), [props.onChange]);
    const onKeyPress = useCallback(() => executeAction(props.onKeyPress), [props.onKeyPress]);
    const onChangeFn = useCallback(
        debounce((value: string) => props.stringAttribute.setValue(value), 500),
        [props.stringAttribute]
    );

    if (props.stringAttribute.status !== "available") {
        return <img src={loadingCircleSvg} className="widget-rich-text-loading-spinner" alt="" aria-hidden />;
    }

    const defineToolbar = (): CKEditorConfig => {
        const { advancedConfig, toolbarConfig, preset } = props;
        if (preset !== "custom") {
            return getPreset(preset);
        } else {
            const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
            let groupItems: ToolbarItems[] | string[];
            if (toolbarConfig === "basic") {
                groupItems = groupKeys
                    .filter((groupName: GroupType) => props[groupName])
                    .map((groupName: GroupType) =>
                        groupName.includes("separator") ? "/" : groupName.replace("Group", "").toLowerCase()
                    );
            } else {
                groupItems = defineAdvancedGroups(advancedConfig);
            }

            return createCustomToolbar(groupItems, toolbarConfig === "basic");
        }
    };
    const plugins = ["openlink"];
    if (props.codeHighlight) {
        plugins.push("codesnippet");
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
            editorType={props.editorType}
            readOnlyStyle={props.readOnlyStyle}
            readOnly={props.stringAttribute.readOnly}
            enterMode={props.enterMode}
            shiftEnterMode={props.shiftEnterMode}
            spellChecker={props.spellChecker}
            toolbar={defineToolbar()}
            plugins={plugins}
            value={props.stringAttribute.value}
            onValueChange={onChangeFn}
            onKeyPress={onKeyPress}
            onKeyChange={onKeyChange}
            dimensions={{
                width: props.width,
                widthUnit: props.widthUnit,
                height: props.height,
                heightUnit: props.heightUnit
            }}
            tabIndex={props.tabIndex}
        />
    );
}
