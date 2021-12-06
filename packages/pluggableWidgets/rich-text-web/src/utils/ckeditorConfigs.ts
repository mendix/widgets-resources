import { CKEditorConfig } from "ckeditor4-react";
import { PresetEnum } from "../../typings/RichTextProps";
import { SET_PRESET, TOOLBAR_GROUP, ToolbarGroup } from "./ckeditorPresets";

interface Plugins {
    codesnippet: any;
}

const PLUGIN_CONFIGS: Plugins = {
    codesnippet: {
        extraPlugins: "codesnippet",
        name: "CodeSnippet",
        config: {
            codeSnippet_theme: "idea"
        }
    }
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

export function getPreset(type: PresetEnum): CKEditorConfig {
    switch (type) {
        case "standard":
            return SET_PRESET("standard");
        case "basic":
            return SET_PRESET("basic");
        case "full":
            return SET_PRESET("full");
        default:
            return SET_PRESET("basic");
    }
}

export function addPlugin(name: string, config: CKEditorConfig): CKEditorConfig {
    const plugin = PLUGIN_CONFIGS[name as keyof Plugins];
    if (plugin && config) {
        if (config.extraPlugins && !config.extraPlugins.includes(plugin.extraPlugins)) {
            config.extraPlugins += `,${plugin.extraPlugins}`;
        } else {
            config.extraPlugins = plugin.extraPlugins;
        }
    }
    return config;
}
