import { CKEditorConfig } from "ckeditor4-react";
import { PresetEnum } from "../../typings/RichTextProps";
import { SET_PRESET, TOOLBAR_GROUP, ToolbarGroup } from "./ckeditorPresets";

interface Plugins {
    codesnippet: any;
    wordcount?: any;
}

const PLUGIN_CONFIGS: Plugins = {
    codesnippet: {
        included: true,
        toolbarName: "CodeSnippet",
        extraPlugins: "codesnippet",
        config: {
            codeSnippet_theme: "idea"
            // codeSnippet_languages: { javascript: "JavaScript", php: "PHP" }
        }
    }
    // wordcount: {
    //     included: false,
    //     toolbarName: "WordCount",
    //     extraPlugins: "wordcount",
    //     config: {
    //         showWordCount: true,
    //         showCharCount: true
    //     }
    // }
};

export function getToolbarGroupByName(name: string): ToolbarGroup | undefined | string {
    return TOOLBAR_GROUP.find((group: any) => group.name === name);
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

export function getPreset(type: PresetEnum): CKEditorConfig | null {
    switch (type) {
        case "standard":
            return SET_PRESET("standard");
        case "basic":
            return SET_PRESET("basic");
        case "full":
            return {};
        case "custom":
            return null;
    }
}

export function addPlugin(name: keyof Plugins, ckeditorConfig: CKEditorConfig) {
    const plugin = PLUGIN_CONFIGS[name];
    if (plugin) {
        const { config } = ckeditorConfig;
        if (config.toolbarGroups) {
            config.extraPlugins = config.extraPlugins
                ? config.extraPlugins + `,${plugin.extraPlugins}`
                : plugin.extraPlugins;
            config.toolbarGroups.forEach((group: ToolbarGroup) => {
                if (group.name === "insert") {
                    group.groups?.push(plugin.extraPlugins);
                }
            });
            Object.assign(config, plugin.config);
        }
    }
    return ckeditorConfig;
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
