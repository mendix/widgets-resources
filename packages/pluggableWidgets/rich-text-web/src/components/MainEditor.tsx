import { useCKEditor, CKEditorHookProps, CKEditorInstance } from "ckeditor4-react";

export interface MainEditoProps {
    config: CKEditorHookProps<string>;
    editorRef?: (editor: CKEditorInstance | null) => void;
}
export const MainEditor = ({ config, editorRef }: MainEditoProps): null => {
    config.config = {
        ...config.config,
        on: {
            instanceReady() {
                if (editorRef) {
                    editorRef(this);
                }
            },
            destroy() {
                if (editorRef) {
                    editorRef(null);
                }
            }
        }
    };
    useCKEditor(config);
    return null;
};
