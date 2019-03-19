/**
 * This file was generated from WebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface WebViewProps<Style> extends CommonProps<Style> {
    url?: EditableValue<string>;
    staticUrl?: string;
    onLoad?: ActionValue;
    onError?: ActionValue;
    userAgent?: string;
}
