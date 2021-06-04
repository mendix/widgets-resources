import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { Component, createElement, createRef, RefObject } from "react";
import { Text, View, Linking, Platform, BackHandler } from "react-native";
import { WebView as RNWebView } from "react-native-webview";

import { WebViewProps } from "../typings/WebViewProps";
import { defaultWebViewStyle, WebViewStyle } from "./ui/Styles";
import { executeAction } from "@mendix/piw-utils-internal";

export type Props = WebViewProps<WebViewStyle>;

export class WebView extends Component<Props> {
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly onErrorHandler = this.onError.bind(this);
    private readonly onMessageHandler = this.onMessage.bind(this);
    private readonly onAndroidBackPressHandler = this.onAndroidBackPress.bind(this);
    private readonly styles = flattenStyles(defaultWebViewStyle, this.props.style);

    private webViewRef: RefObject<RNWebView> = createRef();
    private canGoBack = false;

    componentDidMount(): void {
        if (Platform.OS === "android" && this.props.propagateBackbutton) {
            BackHandler.addEventListener("hardwareBackPress", this.onAndroidBackPressHandler);
        }
    }

    componentWillUnmount(): void {
        if (Platform.OS === "android" && this.props.propagateBackbutton) {
            BackHandler.removeEventListener("hardwareBackPress", this.onAndroidBackPressHandler);
        }
    }

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
            <View style={this.styles.container}>
                <RNWebView
                    ref={this.webViewRef}
                    testID={this.props.name}
                    source={html ? { html } : { uri: uri! }}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    onLoad={this.onLoadHandler}
                    onError={this.onErrorHandler}
                    onMessage={event => {
                        this.onMessageHandler(event.nativeEvent.data);
                    }}
                    userAgent={this.props.userAgent}
                    onShouldStartLoadWithRequest={({ url }) => {
                        const openExternally =
                            this.props.openLinksExternally && (html ? url.slice(0, 4) === "http" : url !== uri);
                        if (openExternally) {
                            Linking.openURL(url);
                            return false;
                        }
                        return true;
                    }}
                    allowsBackForwardNavigationGestures={this.props.allowsBackForwardNavigationGestures}
                    onNavigationStateChange={navState => {
                        this.canGoBack = navState.canGoBack;
                    }}
                />
            </View>
        );
    }

    private onLoad(): void {
        executeAction(this.props.onLoad);
    }

    private onError(): void {
        executeAction(this.props.onError);
    }

    private onMessage(input: string): void {
        this.props.onMessageInput?.setTextValue(input);
        executeAction(this.props.onMessage);
    }

    private onAndroidBackPress(): boolean {
        if (this.canGoBack && this.webViewRef.current) {
            this.webViewRef.current.goBack();
            return true;
        } else {
            return false;
        }
    }
}
