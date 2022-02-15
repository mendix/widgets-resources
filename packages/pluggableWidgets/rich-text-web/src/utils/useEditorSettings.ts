import { useMemo } from "react";
import { CKEditorConfig } from "ckeditor4-react";
import { RichTextSettings } from "../components/RichText";
import { RichTextContainerProps } from "../../typings/RichTextProps";
import { getDimensions } from "@mendix/piw-utils-internal";
import { addPlugin, defineAdvancedGroups, getPreset } from "./ckeditorConfigs";
import { createCustomToolbar, GroupType, ToolbarItems } from "./ckeditorPresets";

type ConfigReducer = {
    (config: CKEditorConfig, props: RichTextContainerProps): CKEditorConfig;
    getDeps: (props: RichTextContainerProps) => any[];
};

const mapProps: ConfigReducer = (config, props) => {
    config.tabIndex = props.tabIndex;
    config.readOnly = props.stringAttribute.readOnly;
    config.disableNativeSpellChecker = !props.spellChecker;

    return config;
};

mapProps.getDeps = props => [props.tabIndex, props.stringAttribute.readOnly, props.spellChecker];

const editorWidth: ConfigReducer = (config, props) => {
    const { width, height } = getDimensions(props);
    config.width = width;
    config.height = height;

    return config;
};

editorWidth.getDeps = props => [props.width, props.widthUnit, props.height, props.heightUnit];

const contentFilter: ConfigReducer = (config, props) => {
    if (props.advancedContentFilter === "custom") {
        config.allowedContent = props.allowedContent;
        config.disallowedContent = props.disallowedContent;
    }

    return config;
};

contentFilter.getDeps = props => [props.advancedContentFilter];

const plugins: ConfigReducer = (config, props) => {
    if (props.codeHighlight) {
        addPlugin("codesnippet", config);
    }

    return config;
};

plugins.getDeps = props => [props.codeHighlight];

const toolbar: ConfigReducer = (config, props) => {
    const { advancedConfig, toolbarConfig, preset } = props;
    if (preset !== "custom") {
        return Object.assign(config, getPreset(preset));
    } else {
        const groupKeys = Object.keys(props).filter((key: string) => (key.includes("Group") ? key : null));
        let groupItems: ToolbarItems[] | string[];
        if (toolbarConfig === "basic") {
            groupItems = groupKeys
                .filter((groupName: GroupType) => props[groupName])
                .map((groupName: GroupType) =>
                    groupName.includes("separator") ? "/" : groupName.replace("Group", "").toLowerCase()
                );
        } else {
            groupItems = defineAdvancedGroups(advancedConfig);
        }

        return Object.assign(config, createCustomToolbar(groupItems, toolbarConfig === "basic"));
    }
};

toolbar.getDeps = props => [props.advancedConfig, props.toolbarConfig, props.preset];

const configReducers = [mapProps, editorWidth, toolbar, plugins, contentFilter];

function createConfig(props: RichTextContainerProps): CKEditorConfig {
    const initConfig: CKEditorConfig = {
        autoGrow_minHeight: 300,
        toolbarCanCollapse: true,
        autoGrow_onStartup: true
    };

    return configReducers.reduce((config, fn) => fn(config, props), initConfig);
}

type EditorSettingsKey = string;

type UseEditorSettingsResult = [RichTextSettings, EditorSettingsKey];

/**
 * This hook is intended to calculate CKEditor config.
 * As CKEditor don't allow dynamic configuration, along with
 * config we need calculate key. Key will be used to remount editor
 * every time config is changed.
 */
export function useEditorSettings(props: RichTextContainerProps): UseEditorSettingsResult {
    const getDependencies = (): any[] => {
        const selectors = [() => [props.editorType, props.sanitizeContent], ...configReducers.map(fn => fn.getDeps)];

        return selectors.map(fn => fn(props)).flat();
    };
    return useMemo(
        () => [
            {
                type: props.editorType,
                config: createConfig(props),
                sanitizeContent: props.sanitizeContent
            },
            Date.now().toString()
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getDependencies()
    );
}
