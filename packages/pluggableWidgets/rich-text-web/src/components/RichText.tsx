import { createElement, ReactElement, useState, useMemo } from "react";
import { useCKEditor, CKEditorHookProps, CKEditorEventAction, CKEditorType } from "ckeditor4-react";
import { defineEnterMode } from "../utils/ckeditorConfigs";
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

function CKInstance({ config }: { config: CKEditorHookProps<string> }) {
    useCKEditor(config);
    return null;
}

export const RichText = (props: RichTextProps): ReactElement => {
    const { editorType, preset, plugins, enterMode, shiftEnterMode, readOnly, readOnlyStyle, value } = props;
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [currentPreset, setCurrentPreset] = useState(false);
    const onClick = () => setCurrentPreset(prev => !prev);
    const preset1 = [
        { name: "document", groups: ["mode", "document", "doctools"] },
        { name: "clipboard", groups: ["clipboard", "undo"] }
    ];
    const preset2 = [{ name: "clipboard", groups: ["clipboard", "undo"] }];

    console.log(plugins, readOnly, readOnlyStyle, preset);
    // const [element, setElement] = useState<HTMLElement | null>(null);
    const ckeditorConfig: CKEditorHookProps<any> = {
        element,
        type: editorType,
        config: {
            readOnly: false,
            enterMode: defineEnterMode(enterMode),
            shiftEnterMode: defineEnterMode(shiftEnterMode),
            disableNativeSpellChecker: props.spellChecker === "no",
            toolbarGroups: currentPreset ? preset1 : preset2
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
    // const editorPreset: CKEditorConfig | null = getPreset(preset);
    const key = useMemo(() => Date.now(), [ckeditorConfig]);
    console.log(key);

    // useLayoutEffect();

    // useEffect(() => {
    //     if (!editorPreset) {
    //         const config: CKEditorConfig = {};
    //         const { toolbarConfig, toolbarGroup } = props;
    //         if (toolbarConfig === "basic") {
    //             config.toolbarGroups = toolbarGroup;
    //         } else {
    //             config.toolbar = [...toolbarGroup];
    //         }
    //     } else {
    //         Object.assign(ckeditorConfig.config, editorPreset);
    //     }
    // }, [props]);

    // useEffect(() => {
    //     if (status === "loaded") {
    //         console.log("Toolbar", editor);
    //         // @ts-ignore
    //
    //         // editor?.window.CKEDITOR.replace(props.id, { element, config: { toolbar: [] } });
    //         if (readOnly) {
    //             editor?.setReadOnly(readOnly);
    //
    //             switch (readOnlyStyle) {
    //                 case "bordered":
    //                 // editor.removeToolbar();
    //             }
    //         }
    //     }
    // }, [status, readOnly]);
    // useEffect(() => {
    //     if (plugins.length) {
    //         // @ts-ignore
    //         plugins.forEach(plugin => addPlugin(plugin, ckeditorConfig));
    //     }
    // }, [plugins]);
    return (
        <div className={classNames(props.class, "widget-rich-text")}>
            <button onClick={onClick}>Change preset</button>
            <div id="editor-sdfjvsdlfvn" ref={setElement} />
            {element && <CKInstance key={currentPreset.toString()} config={ckeditorConfig} />}
        </div>
    );
};
