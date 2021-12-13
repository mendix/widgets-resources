/**
 * This file was generated from WebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface WebViewProps<Style> {
    name: string;
    style: Style[];
    url?: DynamicValue<string>;
    content?: DynamicValue<string>;
    onLoad?: ActionValue;
    onError?: ActionValue;
    onMessage?: ActionValue;
    onMessageInput?: EditableValue<string>;
    userAgent: string;
    openLinksExternally: boolean;
}

export interface WebViewPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    url: string;
    content: string;
    onLoad: {} | null;
    onError: {} | null;
    onMessage: {} | null;
    onMessageInput: string;
    userAgent: string;
    openLinksExternally: boolean;
}
