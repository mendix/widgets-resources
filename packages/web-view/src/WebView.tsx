import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { WebView as RNWebView } from "react-native-webview";

import { WebViewProps } from "../typings/WebViewProps";
import { defaultWebViewStyle, WebViewStyle } from "./ui/Styles";

export type Props = WebViewProps<WebViewStyle>;

export class WebView extends Component<Props> {
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly onErrorHandler = this.onError.bind(this);
    private readonly styles = flattenStyles(defaultWebViewStyle, this.props.style);

    render(): JSX.Element {
        const uri = this.props.url && this.props.url.value;
        const html = this.props.content && this.props.content.value;

        if (!uri && !html) {
            return (
                <View style={this.styles.errorContainer}>
                    <Text style={this.styles.errorText}>No URL or content was provided.</Text>
                </View>
            );
        }

        return (
            <RNWebView
                source={html ? { html } : { uri: uri! }}
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
