import { createElement, ReactElement, useState, useEffect } from "react";
import { useCKEditor, CKEditorConfig, CKEditorHookProps, CKEditorEventAction, CKEditorType } from "ckeditor4-react";
import { getPreset, defineEnterMode, addPlugin } from "../utils/ckeditorConfigs";
import classNames from "classnames";
import {
    ReadOnlyStyleEnum,
    PresetEnum,
    ToolbarConfigEnum,
    EnterModeEnum,
    ShiftEnterModeEnum,
    SpellCheckerEnum
} from "../../typings/RichTextProps";

interface RichTextProps {
    id?: string;
    name: string;
    class: string;
    preset: PresetEnum;
    editorType: CKEditorType;
    readOnly: boolean;
    readOnlyStyle: ReadOnlyStyleEnum;
    value: any;
    onChange?: (value: string) => void;
    toolbarConfig: ToolbarConfigEnum;
    spellChecker: SpellCheckerEnum;
    enterMode: EnterModeEnum;
    shiftEnterMode: ShiftEnterModeEnum;
    advancedGroup: any;
    toolbarGroup: any;
    plugins: string[];
}

export const RichText = (props: RichTextProps): ReactElement => {
    const { editorType, preset, plugins, enterMode, shiftEnterMode, readOnly, readOnlyStyle, value } = props;
    const [element, setElement] = useState<HTMLElement | null>(null);
    const ckeditorConfig: CKEditorHookProps<any> = {
        element,
        type: editorType,
        config: {
            readOnly: false,
            enterMode: defineEnterMode(enterMode),
            shiftEnterMode: defineEnterMode(shiftEnterMode),
            disableNativeSpellChecker: props.spellChecker === "no"
        },
        dispatchEvent: ({ type }) => {
            if (type === CKEditorEventAction.beforeLoad) {
                // payload.plugins.basePath = "/";
                // payload.plugins.addExternal("wordcount", "/src/assets/", "plugin.js");
            }
            if (type === CKEditorEventAction.loaded) {
                // onChange("readOnly");
            }
        },
        initContent: value,
        subscribeTo: ["instanceReady", "beforeLoad", "loaded"]
    };
    const editorPreset: CKEditorConfig | null = getPreset(preset);
    const { editor, status } = useCKEditor(ckeditorConfig);
    useEffect(() => {
        if (!editorPreset) {
            const config: CKEditorConfig = {};
            const { toolbarConfig, toolbarGroup } = props;
            if (toolbarConfig === "basic") {
                config.toolbarGroups = toolbarGroup;
            } else {
                config.toolbar = [...toolbarGroup];
            }
        } else {
            Object.assign(ckeditorConfig.config, editorPreset);
        }
        if (status === "loaded") {
            // editor?.window.CKEDITOR.replace(props.id, { element, config: { toolbar: [] } });
            if (readOnly) {
                editor?.setReadOnly(readOnly);

                switch (readOnlyStyle) {
                    case "bordered":
                        editor.removeToolbar();
                }
            }
        }
    }, [props, status]);

    useEffect(() => {
        if (plugins.length) {
            // @ts-ignore
            plugins.forEach(plugin => addPlugin(plugin, ckeditorConfig));
        }
    }, [plugins]);
    return (
        <div className={classNames(props.class, "widget-rich-text")}>
            <div ref={setElement} id={props.id} />
        </div>
    );
};
