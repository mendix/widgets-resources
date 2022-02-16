import { createElement, ReactElement, useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
    CKEditorHookProps,
    CKEditorType,
    CKEditorConfig,
    CKEditorEventAction,
    CKEditorInstance
} from "ckeditor4-react";
import { getDimensions, Dimensions } from "@mendix/piw-utils-internal";
import { defineEnterMode, addPlugin, PluginName } from "../utils/ckeditorConfigs";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
import { ReadOnlyStyleEnum, EnterModeEnum, ShiftEnterModeEnum, AdvancedConfigType } from "../../typings/RichTextProps";
import { MainEditor } from "./MainEditor";

export interface RichTextProps {
    name: string;
    readOnly: boolean;
    spellChecker: boolean;
    sanitizeContent?: boolean;
    value: string | undefined;
    advancedConfig: AdvancedConfigType[] | null;
    plugins?: string[];
    readOnlyStyle: ReadOnlyStyleEnum;
    toolbar: CKEditorConfig;
    enterMode?: EnterModeEnum;
    shiftEnterMode?: ShiftEnterModeEnum;
    editorType: CKEditorType;
    dimensions?: Dimensions;
    advancedContentFilter?: { allowedContent: string; disallowedContent: string } | null;
    onValueChange?: (value: string) => void;
    onKeyChange?: () => void;
    onKeyPress?: () => void;
    tabIndex: number | undefined;
}

export const RichTextEditor = (props: RichTextProps): ReactElement => {
    const { editorType, plugins, enterMode, shiftEnterMode, value, readOnly, readOnlyStyle, advancedContentFilter } =
        props;
    const [element, setElement] = useState<HTMLElement | null>(null);
    const localEditorValueRef = useRef("");
    const editorInstanceRef = useRef<null | CKEditorInstance>(null);
    const editorRefCallback = useCallback(
        (editor: null | CKEditorInstance) => (editorInstanceRef.current = editor),
        []
    );
    const { width, height } = props.dimensions
        ? getDimensions({ ...props.dimensions })
        : {
              width: "100%",
              height: "100%"
          };
    const [ckeditorConfig, setCkeditorConfig] = useState<CKEditorHookProps<"change" | "key">>({
        element,
        editorUrl: `${window.mx.remoteUrl}widgets/ckeditor/ckeditor.js`,
        type: editorType,
        config: {
            autoGrow_minHeight: 300,
            toolbarCanCollapse: true,
            autoGrow_onStartup: true,
            width,
            height,
            tabIndex: props.tabIndex,
            enterMode: defineEnterMode(enterMode || ""),
            shiftEnterMode: defineEnterMode(shiftEnterMode || ""),
            disableNativeSpellChecker: !props.spellChecker,
            readOnly: props.readOnly
        },
        initContent: value,
        dispatchEvent: ({ type, payload }) => {
            if (type === CKEditorEventAction.key) {
                if (props.onKeyPress) {
                    props.onKeyPress();
                }
            }
            if (type === CKEditorEventAction.change) {
                const value = payload.editor.getData();
                if (props.onKeyChange) {
                    props.onKeyChange();
                }
                if (props?.onValueChange) {
                    const content = props.sanitizeContent ? sanitizeHtml(value) : value;
                    localEditorValueRef.current = content;
                    props?.onValueChange(content);
                }
            }
        },
        subscribeTo: ["change", "key"]
    });

    const key = useMemo(() => Date.now(), [ckeditorConfig]);
    useEffect(() => {
        const config = { ...props.toolbar };
        if (plugins?.length) {
            plugins.forEach((plugin: PluginName) => addPlugin(plugin, config));
        }
        if (advancedContentFilter) {
            config.allowedContent = advancedContentFilter.allowedContent;
            config.disallowedContent = advancedContentFilter.disallowedContent;
        }

        setCkeditorConfig({
            ...ckeditorConfig,
            initContent: value,
            element,
            config: {
                ...ckeditorConfig.config,
                ...config,
                readOnly: props.readOnly
            }
        });
    }, [element]);

    useEffect(() => {
        const editor = editorInstanceRef.current;
        if (editor) {
            if (localEditorValueRef.current !== value) {
                editor.setData(value);
                localEditorValueRef.current = value ?? "";
            }
        }
    }, [value]);

    return (
        <div
            className={classNames("widget-rich-text", `${readOnly ? `editor-${readOnlyStyle}` : ""}`)}
            style={{ width, height }}
        >
            <div ref={setElement} id={props.name} />
            <MainEditor key={key} config={ckeditorConfig} editorRef={editorRefCallback} />
        </div>
    );
};
