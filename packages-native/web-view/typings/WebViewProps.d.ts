/**
 * This file was generated from WebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface WebViewProps<Style> extends CommonProps<Style> {
    url?: DynamicValue<string>;
    content?: DynamicValue<string>;
    onLoad?: ActionValue;
    onError?: ActionValue;
    userAgent?: string;
}
