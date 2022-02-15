import { createElement, useState, useRef, useEffect, ReactElement } from "react";
import { CKEditorType, CKEditorConfig, CKEditorEventAction, useCKEditor } from "ckeditor4-react";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
import { ReadOnlyStyleEnum } from "../../typings/RichTextProps";

export interface RichTextSettings {
    config?: CKEditorConfig | null;
    type?: CKEditorType | null;
    sanitizeContent?: boolean;
}

export interface RichTextEditorProps {
    value: string;
    editorSettings: RichTextSettings;
    name?: string;
    onChange?: (value: string) => void;
    onKeyPress?: () => void;
    readOnlyStyle?: ReadOnlyStyleEnum;
}

export function RichTextEditor({
    value,
    name,
    editorSettings,
    onChange,
    onKeyPress,
    readOnlyStyle
}: RichTextEditorProps): ReactElement {
    const localEditorValueRef = useRef(value);
    // Use `useState` rather than `useRef` in order to trigger re-render.
    const [element, setElement] = useState<null | HTMLElement>(null);

    const { editor, status } = useCKEditor({
        ...editorSettings,
        element,
        editorUrl: `${window.mx.remoteUrl}widgets/ckeditor/ckeditor.js`,
        initContent: value,
        dispatchEvent: ({ type, payload }) => {
            if (type === CKEditorEventAction.key) {
                if (onKeyPress) {
                    onKeyPress();
                }
            }

            if (onChange && type === CKEditorEventAction.change) {
                const valueRaw = payload.editor.getData();
                const value = editorSettings.sanitizeContent ? sanitizeHtml(valueRaw) : valueRaw;

                localEditorValueRef.current = value;

                if (onChange) {
                    onChange(value);
                }
            }
        },
        subscribeTo: ["change", "key"]
    });

    useEffect(() => {
        if (editor) {
            if (localEditorValueRef.current !== value) {
                editor.setData(value);
                localEditorValueRef.current = value;
            }
        }
    }, [editor, localEditorValueRef, value]);

    return (
        <div
            className={classNames("widget-rich-text", readOnlyStyle && `editor-${readOnlyStyle}`)}
            style={{ width: editorSettings.config?.width, height: editorSettings.config?.height }}
        >
            <div id={name} ref={setElement} style={status !== "ready" ? { visibility: "hidden" } : undefined} />
        </div>
    );
}
