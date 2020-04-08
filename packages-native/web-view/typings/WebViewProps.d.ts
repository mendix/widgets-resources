/**
 * This file was generated from WebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue } from "mendix";

export interface WebViewProps<Style> {
    name: string;
    style: Style[];
    url?: DynamicValue<string>;
    content?: DynamicValue<string>;
    onLoad?: ActionValue;
    onError?: ActionValue;
    userAgent?: string;
}

export interface WebViewPreviewProps {
    class: string;
    style: string;
    url: string;
    content: string;
    onLoad: {} | null;
    onError: {} | null;
    userAgent: string;
}
