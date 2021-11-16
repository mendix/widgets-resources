import { createElement, ReactElement, useState } from "react";
import { useCKEditor, CKEditorConfig } from "ckeditor4-react";
import { getDimensions } from "@mendix/piw-utils-internal";
import classNames from "classnames";
import { RichTextContainerProps } from "../../typings/RichTextProps";
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

    const setToolBarGroups = (props: RichTextContainerProps): any => {
        const { toolbarConfig, advancedGroup } = props;
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
            try {
                const parsedAdvancedGroup = JSON.parse(advancedGroup);
                toolbar = [parsedAdvancedGroup];
            } catch (e) {
                toolbar = [];
            }
        }
        return toolbar;
    };

    const defineConfigurations = (): CKEditorConfig => {
        const { toolbarConfig, spellChecker, enterMode, shiftEnterMode } = props;
        const config: CKEditorConfig = {
            enterMode: defineEnterMode(enterMode),
            shiftEnterMode: defineEnterMode(shiftEnterMode)
        };
        if (spellChecker) {
            config.disableNativeSpellChecker = false;
        }
        if (!editorUrl) {
            const toolbar = setToolBarGroups(props);
            if (toolbarConfig === "basic") {
                config.toolbarGroups = toolbar;
            } else {
                config.toolbar = toolbar;
            }
        }
        return config;
    };

    useCKEditor({
        editorUrl,
        element,
        config: defineConfigurations(),
        type: editorType,
        initContent: stringAttribute.value
    });

    return (
        <div className={classNames(props.class, "widget-rich-text")} style={{ ...getDimensions(props) }}>
            <div ref={setElement} />
        </div>
    );
};
