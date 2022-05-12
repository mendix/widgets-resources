import { CKEditorConfig } from "ckeditor4-react";
import { PresetEnum, AdvancedConfigType, CtItemTypeEnum } from "../../typings/RichTextProps";
import { createPreset, TOOLBAR_GROUP, ToolbarGroup, ToolbarItems } from "./ckeditorPresets";

export type PluginName = "codesnippet";

const PLUGIN_CONFIGS = {
    openlink: {
        extraPlugins: "openlink",
        name: "OpenLink",
        config: {
            openlink_enableReadOnly: true,
            openlink_target: "_blank"
        }
    },
    codesnippet: {
        extraPlugins: "codesnippet",
        name: "CodeSnippet",
        config: {
            codeSnippet_theme: "idea"
        }
    }
};

export function getToolbarGroupByName(name: string): ToolbarGroup | undefined {
    return TOOLBAR_GROUP.find((group: ToolbarGroup) => group.name === name);
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
            return createPreset("standard");
        case "basic":
            return createPreset("basic");
        case "full":
            return createPreset("full");
        default:
            return createPreset("basic");
    }
}

export function addPlugin(name: PluginName, config: CKEditorConfig): CKEditorConfig {
    const plugin = PLUGIN_CONFIGS[name];
    if (plugin && config) {
        if (config.extraPlugins && !config.extraPlugins.includes(plugin.extraPlugins)) {
            config.extraPlugins += `,${plugin.extraPlugins}`;
        } else {
            config.extraPlugins = plugin.extraPlugins;
        }
        Object.assign(config, plugin.config);
    }
    return config;
}

export function defineAdvancedGroups(items: AdvancedConfigType[]): ToolbarItems[] {
    const toolbarObj: {
        [key: string]: Array<CtItemTypeEnum | "-">;
    } = {};
    items.forEach(item => {
        const id = item.ctItemToolbar;
        const type = item.ctItemType !== "seperator" ? item.ctItemType : "-";

        if (!toolbarObj[id]) {
            toolbarObj[id] = [];
        }
        toolbarObj[id].push(type);
    });

    const keys: string[] = Object.keys(toolbarObj);
    const toolbarArray: ToolbarItems[] = [];
    keys.forEach((key: string) =>
        toolbarArray.push({
            name: key,
            items: toolbarObj[key]
        })
    );
    return toolbarArray;
}
