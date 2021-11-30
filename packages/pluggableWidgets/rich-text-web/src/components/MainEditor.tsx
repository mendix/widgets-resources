import { useCKEditor, CKEditorHookProps } from "ckeditor4-react";

export const MainEditor = ({ config }: { config: CKEditorHookProps<string> }) => {
    useCKEditor(config);
    return null;
};
