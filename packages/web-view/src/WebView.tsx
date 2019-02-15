import React, { Component } from "react";
import { Text, View } from "react-native";
import { WebView as RNWebView } from "react-native-webview";
import { WebViewProps } from "../typings/WebViewProps";

export class WebView extends Component<WebViewProps> {
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly onErrorHandler = this.onError.bind(this);
    private readonly onLoadStartHandler = this.onLoadStart.bind(this);
    private readonly onLoadEndHandler = this.onLoadEnd.bind(this);

    render(): JSX.Element {
        const url = this.props.url ? this.props.url.value : this.props.staticUrl;

        if (!url) {
            return (
                <View>
                    <Text>No URL</Text>
                </View>
            );
        }
        return (
            <RNWebView
                source={{ uri: url }}
                style={{ width: "100%", height: "100%" }}
                onLoad={this.onLoadHandler}
                onError={this.onErrorHandler}
                onLoadStart={this.onLoadStartHandler}
                onLoadEnd={this.onLoadEndHandler}
                javaScriptEnabled={this.props.javaScriptEnabled}
                userAgent={this.props.userAgent}
                allowsInlineMediaPlayback={this.props.allowsInlineMediaPlayback}
                scrollEnabled={this.props.scrollEnabled}
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

    private onLoadStart(): void {
        if (this.props.onLoadStart && this.props.onLoadStart.canExecute) {
            this.props.onLoadStart.execute();
        }
    }

    private onLoadEnd(): void {
        if (this.props.onLoadEnd && this.props.onLoadEnd.canExecute) {
            this.props.onLoadEnd.execute();
        }
    }
}
