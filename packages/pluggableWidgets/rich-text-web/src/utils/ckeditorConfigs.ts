import { PresetEnum } from "../../typings/RichTextProps";
const TOOLBAR_CONFIGS: any = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker"] },
    { name: "forms" },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] },
    { name: "links" },
    { name: "insert" },
    { name: "styles" },
    { name: "colors" },
    { name: "tools" },
    { name: "others" },
    { name: "about" }
];
export const AVAILABLE_GROUPS: string[] = TOOLBAR_CONFIGS.map((group: any) => group.name);

export function getToolbarGroupByName(name: string): { name: string; groups: string[] } {
    return TOOLBAR_CONFIGS.find((group: any) => group.name === name);
}

export function defineEnterMode(type: string): number {
    switch (type) {
        case "paragraph":
            return 1;
        case "breakLines":
            return 2;
        case "blocks":
            return 3;
        default:
            return 1;
    }
}

export function getPreset(type: PresetEnum): string | null {
    switch (type) {
        case "standard":
            return "https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js";
        case "basic":
            return "https://cdn.ckeditor.com/4.16.2/basic/ckeditor.js";
        case "full":
            return "https://cdn.ckeditor.com/4.16.2/full/ckeditor.js";
        case "custom":
            return null;
        default:
            return "https://cdn.ckeditor.com/4.16.2/basic/ckeditor.js";
    }
}

export type GroupType =
    | "documentGroup"
    | "formsGroup"
    | "editingGroup"
    | "clipboardGroup"
    | "basicStylesGroup"
    | "paragraphGroup"
    | "linksGroup"
    | "colorsGroup"
    | "toolsGroup"
    | "othersGroup"
    | "stylesGroup";
