import { createElement, ReactElement, useState } from "react";
import { useCKEditor, CKEditorConfig } from "ckeditor4-react";
import { RichTextContainerProps, EnterModeEnum, ShiftEnterModeEnum } from "../../typings/RichTextProps";
import {
    getToolbarGroupByName,
    defineEnterMode,
    AVAILABLE_GROUPS,
    GroupType,
    getPreset
} from "../utils/ckeditorConfigs";

export const RichText = (props: RichTextContainerProps): ReactElement => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const { stringAttribute, editorType, preset } = props;
    const editorUrl: string | null = getPreset(preset);

    const setEnterMode = (
        enterMode: EnterModeEnum,
        shiftEnterMode: ShiftEnterModeEnum
    ): { enterMode: any; shiftEnterMode: any } => {
        return {
            enterMode: defineEnterMode(enterMode),
            shiftEnterMode: defineEnterMode(shiftEnterMode)
        };
    };

    const setToolBarGroups = (props: RichTextContainerProps): any => {
        const { toolbarConfig } = props;
        let toolbar: CKEditorConfig = [];
        if (toolbarConfig === "basic") {
            AVAILABLE_GROUPS.forEach((groupName: GroupType) => {
                if (props[groupName] === "yes") {
                    if (groupName.includes("separator")) {
                        toolbar.push("/");
                    } else {
                        toolbar.push(getToolbarGroupByName(groupName.replace("Group", "").toLowerCase()));
                    }
                }
            });
        } else if (toolbarConfig === "advanced") {
            toolbar = [
                ["Source", "-", "NewPage", "Preview", "-", "Templates"],
                ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"],
                "/",
                ["Bold", "Italic"]
            ];
        }
        return toolbar;
    };

    const renderCKEditorNode = (): any => {
        const { toolbarConfig, spellChecker, enterMode, shiftEnterMode } = props;
        const config: CKEditorConfig = {
            ...setEnterMode(enterMode, shiftEnterMode)
        };
        const toolbar = setToolBarGroups(props);
        if (spellChecker) {
            config.disableNativeSpellChecker = false;
        }
        if (toolbarConfig === "basic") {
            config.toolbarGroups = toolbar;
        } else {
            config.toolbar = toolbar;
        }
        return config;
    };

    useCKEditor({
        editorUrl,
        element,
        config: renderCKEditorNode(),
        type: editorType,
        initContent: stringAttribute.value,
        subscribeTo: ["customEvent", "anotherCustomEvent"]
    });

    return (
        <div className={props.class}>
            <div ref={setElement} />
        </div>
    );
};
