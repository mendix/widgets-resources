import { CKEditorConfig } from "ckeditor4-react";

export interface ToolbarGroup {
    name: string;
    groups?: string[];
}

// config.toolbarGroups = [
//     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
//     { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
//     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
//     { name: 'forms', groups: [ 'forms' ] },
//     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//     { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
//     { name: 'links', groups: [ 'links' ] },
//     { name: 'insert', groups: [ 'insert' ] },
//     { name: 'styles', groups: [ 'styles' ] },
//     { name: 'colors', groups: [ 'colors' ] },
//     { name: 'tools', groups: [ 'tools' ] },
//     { name: 'others', groups: [ 'others' ] },
//     { name: 'about', groups: [ 'about' ] }
// ];
const TOOLBAR_GROUP: Array<ToolbarGroup | string> = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker", "editing"] },
    { name: "forms", groups: ["forms"] },
    "/",
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

function SET_PRESET(type: "basic" | "standard" | "full"): CKEditorConfig {
    const config: CKEditorConfig = {};
    switch (type) {
        case "basic":
            config.toolbarGroups = TOOLBAR_GROUP;
            config.removeButtons =
                "Source,Save,Templates,NewPage,ExportPdf,Preview,Print,Cut,Redo,Copy,Undo,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Underline,Subscript,Superscript,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,JustifyLeft,BidiLtr,Image,Table,BidiRtl,JustifyCenter,JustifyRight,Language,JustifyBlock,HorizontalRule,SpecialChar,Smiley,PageBreak,Iframe,Styles,TextColor,BGColor,ShowBlocks,Maximize,Format,Font,FontSize,Anchor";
            break;
        case "standard":
            config.toolbarGroups = TOOLBAR_GROUP;
            config.removeButtons =
                "Save,Templates,NewPage,ExportPdf,Preview,Print,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Underline,Subscript,Superscript,CopyFormatting,CreateDiv,JustifyLeft,BidiLtr,BidiRtl,JustifyCenter,JustifyRight,Language,JustifyBlock,Smiley,PageBreak,Iframe,TextColor,BGColor,Font,FontSize,ShowBlocks";
            break;
        case "full":
            console.log("full");
            config.toolbarGroups = TOOLBAR_GROUP;
            config.extraPlugins = "save,templates,newpage,print,exportpdf,forms,find,selectall";
            // config.extraPlugins =
            //     "save,templates,newpage,print,exportpdf,preview,find,selectall,forms,checkbox,textfield,textarea,select,button,imagebutton,hiddenfield, underline,subscript,superscript,copyformatting,creatediv,justifyleft,bidiltr,bidirtl,justifycenter,justifyright,language,justifyblock,smiley,pagebreak,iframe,textcolor,bgcolor,font,fontsize,showblocks";
            break;
        default:
            config.toolbarGroups = TOOLBAR_GROUP;
    }
    return config;
}

export { TOOLBAR_GROUP, SET_PRESET };
