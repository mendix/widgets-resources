/**
 * Auto-generated from WebView.xml
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
