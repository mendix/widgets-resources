import { CKEditorConfig } from "ckeditor4-react";

export interface ToolbarGroup {
    name: string;
    groups?: string[];
}

const TOOLBAR_GROUP: Array<ToolbarGroup | string> = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker"] },
    { name: "forms" },
    "/",
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] },
    { name: "links" },
    { name: "styles" },
    { name: "colors" },
    { name: "tools", groups: ["maximize", "showblocks"] },
    "/",
    { name: "insert", groups: [] },
    { name: "others" }
];

function SET_PRESET(type: "basic" | "standard" | "full"): CKEditorConfig {
    const config: CKEditorConfig = {};
    switch (type) {
        case "basic":
            config.toolbarGroups = TOOLBAR_GROUP;
            config.removeButtons = `Source,PastePlainText,Spellchecker,Anchor,Underline,Strike,Subscript,Superscript,Maximize,ShowBlocks,Table,HorizontalRule,VerticalRule,SpecialChar,Image`;
            break;
        case "standard":
            config.toolbarGroups = TOOLBAR_GROUP;
            config.removeButtons = "Underline,Subscript,Superscript";
            config.format_tags = "p;h1;h2;h3;pre";
            config.removeDialogTabs = "image:advanced;link:advanced";
            break;
        default:
            config.toolbarGroups = TOOLBAR_GROUP;
    }
    return config;
}

export { TOOLBAR_GROUP, SET_PRESET };
