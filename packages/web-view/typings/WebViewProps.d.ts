/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface WebViewProps extends CommonProps {
    url?: PluginWidget.EditableValue<string>;
    staticUrl?: string;
    javaScriptEnabled: boolean;
    allowsInlineMediaPlayback: boolean;
    scrollEnabled: boolean;
    userAgent?: string;
    onLoad?: PluginWidget.ActionValue;
    onError?: PluginWidget.ActionValue;
    onLoadStart?: PluginWidget.ActionValue;
    onLoadEnd?: PluginWidget.ActionValue;
}
