import { createElement, ReactElement, useState, useMemo, useEffect } from "react";
import { CKEditorHookProps, CKEditorType, CKEditorConfig, CKEditorEventAction } from "ckeditor4-react";
import { getDimensions, Dimensions } from "@mendix/piw-utils-internal";
import { defineEnterMode, addPlugin } from "../utils/ckeditorConfigs";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
import { ReadOnlyStyleEnum, EnterModeEnum, ShiftEnterModeEnum, AdvancedConfigType } from "../../typings/RichTextProps";
import { MainEditor } from "./MainEditor";

export interface RichTextProps {
    name: string;
    readOnly: boolean;
    spellChecker: boolean;
    sanitizeContent?: boolean;
    value: string;
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
}

export const RichTextEditor = (props: RichTextProps): ReactElement => {
    const {
        editorType,
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
        editorUrl: "/widgets/ckeditor/ckeditor.js",
        type: editorType,
        config: {
            autoGrow_minHeight: 300,
            toolbarCanCollapse: true,
            autoGrow_onStartup: true,
            width,
            height,
            enterMode: defineEnterMode(enterMode || ""),
            shiftEnterMode: defineEnterMode(shiftEnterMode || ""),
            disableNativeSpellChecker: !props.spellChecker
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
    const key = useMemo(() => Date.now(), [ckeditorConfig]);
    useEffect(() => {
        const config = { ...props.toolbar };
        if (plugins?.length) {
            plugins.forEach(plugin => addPlugin(plugin, config));
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
                ...config
            }
        });
    }, [props]);
    return (
        <div
            className={classNames("widget-rich-text", `${readOnly ? `editor-${readOnlyStyle}` : ""}`)}
            style={{ width, height }}
        >
            <div ref={setElement} id={props.name} />
            <MainEditor config={ckeditorConfig} key={key} />
        </div>
    );
};
