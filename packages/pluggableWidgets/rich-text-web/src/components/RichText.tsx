import { createElement, ReactElement, useState, useEffect, useMemo } from "react";
import { CKEditorHookProps, CKEditorType, CKEditorConfig } from "ckeditor4-react";
import { getDimensions, Dimensions } from "@mendix/piw-utils-internal";
import { defineEnterMode, getPreset, addPlugin } from "../utils/ckeditorConfigs";
import classNames from "classnames";
import {
    ReadOnlyStyleEnum,
    PresetEnum,
    ToolbarConfigEnum,
    EnterModeEnum,
    ShiftEnterModeEnum,
    SpellCheckerEnum
} from "../../typings/RichTextProps";
import { MainEditor } from "./MainEditor";

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
    enterMode?: EnterModeEnum;
    shiftEnterMode?: ShiftEnterModeEnum;
    advancedGroup: any;
    toolbarGroup: any;
    plugins?: string[];
    label?: string | undefined;
    dimensions?: Dimensions;
    advancedContentFilter?: { allowedContent: string; disallowedContent: string } | null;
    sanitizeContent?: boolean;
}

export const RichText = (props: RichTextProps): ReactElement => {
    const {
        editorType,
        preset,
        plugins,
        enterMode,
        shiftEnterMode,
        value,
        readOnly,
        readOnlyStyle,
        advancedContentFilter
    } = props;
    const [element, setElement] = useState<HTMLElement | null>(null);
    const { width, height } = props.dimensions
        ? getDimensions({ ...props.dimensions })
        : {
              width: "100%",
              height: "100%"
          };
    const [ckeditorConfig, setCkeditorConfig] = useState<CKEditorHookProps<any>>({
        element,
        type: editorType,
        config: {
            width,
            height,
            enterMode: defineEnterMode(enterMode || ""),
            shiftEnterMode: defineEnterMode(shiftEnterMode || ""),
            disableNativeSpellChecker: props.spellChecker === "no"
        },
        initContent: value,
        subscribeTo: ["instanceReady", "beforeLoad", "loaded"]
    });
    const editorPreset: CKEditorConfig | null = getPreset(preset);
    const key = useMemo(() => Date.now(), [ckeditorConfig]);
    const setToolbar = (config: CKEditorConfig) => {
        if (!editorPreset) {
            const { toolbarConfig, toolbarGroup } = props;
            if (toolbarConfig === "basic") {
                config.toolbarGroups = toolbarGroup;
            } else {
                config.toolbar = [...toolbarGroup];
            }
            return config;
        } else {
            return editorPreset;
        }
    };
    useEffect(() => {
        const config = setToolbar({});
        if (advancedContentFilter) {
            config.allowedContent = advancedContentFilter.allowedContent;
            config.disallowedContent = advancedContentFilter.disallowedContent;
        }
        setCkeditorConfig({
            ...ckeditorConfig,
            element,
            config: {
                ...ckeditorConfig.config,
                ...config,
                readOnly
            }
        });
    }, [props]);
    useEffect(() => {
        if (plugins?.length) {
            plugins.forEach(plugin => addPlugin(plugin, ckeditorConfig));
            setCkeditorConfig(ckeditorConfig);
        }
    }, [ckeditorConfig]);
    return (
        <div className={classNames(props.class, "widget-rich-text", `${readOnly ? `editor-${readOnlyStyle}` : ""}`)}>
            <div id={props.id} ref={setElement} />
            <MainEditor config={ckeditorConfig} key={key} />
        </div>
    );
};
