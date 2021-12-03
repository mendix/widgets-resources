import { createElement, ReactElement, useState, useMemo, useEffect } from "react";
import { CKEditorHookProps, CKEditorType, CKEditorConfig, CKEditorEventAction } from "ckeditor4-react";
import { getDimensions, Dimensions } from "@mendix/piw-utils-internal";
import { defineEnterMode, getPreset } from "../utils/ckeditorConfigs";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
import {
    ReadOnlyStyleEnum,
    PresetEnum,
    ToolbarConfigEnum,
    EnterModeEnum,
    ShiftEnterModeEnum
} from "../../typings/RichTextProps";
import { MainEditor } from "./MainEditor";

interface RichTextProps {
    id?: string;
    name: string;
    class: string;
    readOnly: boolean;
    spellChecker: boolean;
    sanitizeContent?: boolean;
    value: any;
    advancedGroup: any;
    toolbarGroup: any;
    plugins?: string[];
    readOnlyStyle: ReadOnlyStyleEnum;
    toolbarConfig: ToolbarConfigEnum;
    enterMode?: EnterModeEnum;
    shiftEnterMode?: ShiftEnterModeEnum;
    preset: PresetEnum;
    editorType: CKEditorType;
    dimensions?: Dimensions;
    advancedContentFilter?: { allowedContent: string; disallowedContent: string } | null;
    onValueChange?: (value: string) => void;
    onKeyChange?: () => void;
    onKeyPress?: () => void;
}

export const RichText = (props: RichTextProps): ReactElement => {
    const {
        editorType,
        preset,
        // plugins,
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
        // editorUrl: "/widgets/ckeditor/ckeditor.js",
        type: editorType,
        config: {
            width,
            height,
            enterMode: defineEnterMode(enterMode || ""),
            shiftEnterMode: defineEnterMode(shiftEnterMode || ""),
            disableNativeSpellChecker: props.spellChecker
        },
        initContent: value,
        dispatchEvent: ({ type, payload }) => {
            if (type === CKEditorEventAction.change) {
                const value = payload.editor.getData() as string;
                if (props.onKeyChange) {
                    props.onKeyChange();
                }
                if (props.onKeyPress) {
                    props.onKeyPress();
                }
                if (props?.onValueChange) {
                    const content = props.sanitizeContent ? sanitizeHtml(value) : value;
                    props?.onValueChange(content);
                }
            }
        },
        subscribeTo: ["change"]
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
            console.log("editorPreset", editorPreset);
            return editorPreset;
        }
    };
    useEffect(() => {
        const config = setToolbar({});
        if (advancedContentFilter) {
            config.allowedContent = advancedContentFilter.allowedContent;
            config.disallowedContent = advancedContentFilter.disallowedContent;
        }
        // if (plugins?.length) {
        //     plugins.forEach(plugin => addPlugin(plugin, ckeditorConfig));
        // }
        setCkeditorConfig({
            ...ckeditorConfig,
            initContent: value,
            element,
            config: {
                ...ckeditorConfig.config,
                ...config,
                readOnly
            }
        });
    }, [props]);
    console.log(ckeditorConfig);
    return (
        <div className={classNames(props.class, "widget-rich-text", `${readOnly ? `editor-${readOnlyStyle}` : ""}`)}>
            <div id={props.id} ref={setElement} />
            <MainEditor config={ckeditorConfig} key={key} />
        </div>
    );
};
