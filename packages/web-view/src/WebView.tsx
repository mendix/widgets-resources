import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { WebView as RNWebView } from "react-native-webview";

import { WebViewProps } from "../typings/WebViewProps";
import { defaultWebViewStyle, WebViewStyle } from "./ui/Styles";

export class WebView extends Component<WebViewProps<WebViewStyle>> {
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly onErrorHandler = this.onError.bind(this);
    private readonly styles = flattenStyles(defaultWebViewStyle, this.props.style);

    render(): JSX.Element {
        const url = this.props.url && this.props.url.value ? this.props.url.value : this.props.staticUrl;

        if (!url) {
            return (
                <View style={this.styles.errorContainer}>
                    <Text style={this.styles.errorText}>No URL</Text>
                </View>
            );
        }
        return (
            <RNWebView
                source={{ uri: url }}
                style={this.styles.container}
                onLoad={this.onLoadHandler}
                onError={this.onErrorHandler}
                userAgent={this.props.userAgent}
                useWebKit={true}
            />
        );
    }

    private onLoad(): void {
        if (this.props.onLoad && this.props.onLoad.canExecute) {
            this.props.onLoad.execute();
        }
    }

    private onError(): void {
        if (this.props.onError && this.props.onError.canExecute) {
            this.props.onError.execute();
        }
    }
}
