/**
 * This file was generated from WebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface WebViewProps extends CommonProps {
    url?: EditableValue<string>;
    staticUrl?: string;
    javaScriptEnabled: boolean;
    allowsInlineMediaPlayback: boolean;
    scrollEnabled: boolean;
    userAgent?: string;
    onLoad?: ActionValue;
    onError?: ActionValue;
    onLoadStart?: ActionValue;
    onLoadEnd?: ActionValue;
}
