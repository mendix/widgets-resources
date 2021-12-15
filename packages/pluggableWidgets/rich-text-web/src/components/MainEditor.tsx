import { useCKEditor, CKEditorHookProps } from "ckeditor4-react";

export const MainEditor = ({ config }: { config: CKEditorHookProps<string> }): null => {
    useCKEditor(config);
    return null;
};
