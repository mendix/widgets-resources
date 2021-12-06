import { CKEditorConfig } from "ckeditor4-react";

export interface ToolbarGroup {
    name: string;
    groups?: string[];
}

export interface ToolbarItems {
    name: string;
    items: string[];
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

const TOOLBAR_GROUP: ToolbarGroup[] = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker", "editing"] },
    { name: "forms", groups: ["forms"] },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"] },
    { name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    { name: "styles", groups: ["styles"] },
    { name: "colors", groups: ["colors"] },
    { name: "tools", groups: ["tools"] },
    { name: "others", groups: ["others"] },
    { name: "about", groups: ["about"] }
];

const TOOLBAR_ITEMS: ToolbarItems[] = [
    { name: "document", items: ["Source", "-", "Save", "NewPage", "ExportPdf", "Preview", "Print", "-", "Templates"] },
    { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
    { name: "editing", items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"] },
    {
        name: "forms",
        items: ["Form", "Checkbox", "Radio", "TextField", "Textarea", "Select", "Button", "ImageButton", "HiddenField"]
    },
    {
        name: "basicstyles",
        items: [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "Subscript",
            "Superscript",
            "-",
            "CopyFormatting",
            "RemoveFormat"
        ]
    },
    {
        name: "paragraph",
        items: [
            "NumberedList",
            "BulletedList",
            "-",
            "Outdent",
            "Indent",
            "-",
            "Blockquote",
            "CreateDiv",
            "-",
            "JustifyLeft",
            "JustifyCenter",
            "JustifyRight",
            "JustifyBlock",
            "-",
            "BidiLtr",
            "BidiRtl",
            "Language"
        ]
    },
    { name: "links", items: ["Link", "Unlink", "Anchor"] },
    { name: "insert", items: ["Image", "Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak", "Iframe"] },
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize", "ShowBlocks"] },
    { name: "about", items: ["About"] }
];

function SET_PRESET(type: "basic" | "standard" | "full"): CKEditorConfig {
    const config: CKEditorConfig = {};
    let toolbarGroup: Array<ToolbarGroup | string> = [];
    switch (type) {
        case "basic":
            config.toolbarGroups = [...TOOLBAR_GROUP];
            config.removeButtons =
                "Source,Save,Templates,NewPage,ExportPdf,Preview,Print,Cut,Redo,Copy,Undo,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Underline,Subscript,Superscript,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,JustifyLeft,BidiLtr,Image,Table,BidiRtl,JustifyCenter,JustifyRight,Language,JustifyBlock,HorizontalRule,SpecialChar,Smiley,PageBreak,Iframe,Styles,TextColor,BGColor,ShowBlocks,Maximize,Format,Font,FontSize,Anchor";
            break;
        case "standard":
            toolbarGroup = [...TOOLBAR_GROUP];
            toolbarGroup.splice(4, 0, "/");
            config.toolbarGroups = toolbarGroup;
            config.removeButtons =
                "Save,Templates,NewPage,ExportPdf,Preview,Print,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Underline,Subscript,Superscript,CopyFormatting,CreateDiv,JustifyLeft,BidiLtr,BidiRtl,JustifyCenter,JustifyRight,Language,JustifyBlock,Smiley,PageBreak,Iframe,TextColor,BGColor,Font,FontSize,ShowBlocks";
            break;
        case "full":
            toolbarGroup = [...TOOLBAR_GROUP];
            toolbarGroup.splice(3, 0, "/");
            toolbarGroup.splice(5, 0, "/");
            toolbarGroup.splice(6, 0, "/");
            config.toolbarGroups = toolbarGroup;
            config.removeButtons = "";
            config.extraPlugins =
                "save,templates,newpage,print,exportpdf,forms,find,selectall,copyformatting,div,divarea,justify,bidi,language,font,colorbutton,showblocks";
            break;
        default:
            config.toolbarGroups = [...TOOLBAR_GROUP];
    }
    return config;
}

function SET_ADVANCED(groups: string[], withGroupNames = true): CKEditorConfig {
    if (withGroupNames) {
        const toolbar: Array<ToolbarItems | string> = [];
        groups.forEach(groupName => {
            if (groupName === "/") {
                toolbar.push(groupName);
            } else {
                const item = TOOLBAR_ITEMS.find(item => item.name === groupName);
                if (item) {
                    toolbar.push(item);
                }
            }
        });
        return {
            toolbar
        };
    } else {
        return {
            extraPlugins:
                "save,templates,newpage,print,exportpdf,forms,find,selectall,copyformatting,div,divarea,justify,bidi,language,font,colorbutton,showblocks",
            toolbar: [
                {
                    name: "other",
                    items: [...groups]
                }
            ]
        };
    }
}

export { TOOLBAR_GROUP, SET_PRESET, SET_ADVANCED };
