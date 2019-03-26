import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement, Fragment } from "react";
import {
    ActivityIndicator,
    Image,
    ImageURISource,
    Keyboard,
    Platform,
    Switch,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import Dialog from "react-native-dialog";
import { captureScreen } from "react-native-view-shot";
import { FeedbackProps } from "../typings/FeedbackProps";
import {
    activityIndicatorStyle,
    commentIcon,
    defaultFeedbackStyle,
    FeedbackStyle,
    floatingButtonContainer,
    imageStyle,
    mendixLogo,
    processStyles,
    switchContainer
} from "./ui/styles";
import { sendToSprintr } from "./utils/form";

type Status = "todo" | "takingScreenshot" | "inprogress" | "done" | "error";

interface State {
    modalVisible: boolean;
    sendScreenshot: boolean;
    feedbackMsg: string;
    screenshot: string;
    status: Status;
    keyboardOpen: boolean;
}

export class Feedback extends Component<FeedbackProps<FeedbackStyle>, State> {
    readonly state: State = {
        modalVisible: false,
        sendScreenshot: true,
        feedbackMsg: "",
        screenshot: "",
        status: "todo",
        keyboardOpen: false
    };

    private isAndroid = Platform.OS === "android";

    private readonly onCommentButtonPressHandler = this.onCommentButtonPress.bind(this);
    private readonly onModalCloseHandler = this.onModalClose.bind(this);
    private readonly onScreenshotToggleChangeHandler = this.onScreenshotToggleValueChange.bind(this);
    private readonly onChangeTextHandler = this.onChangeText.bind(this);
    private readonly onSendHandler = this.onSend.bind(this);
    private readonly onResultHandler = this.onResult.bind(this);
    private readonly onKeyboardShowHandler = this.onKeyboardShow.bind(this);
    private readonly onKeyboardHideHandler = this.onKeyboardHide.bind(this);
    private readonly styles = flattenStyles(defaultFeedbackStyle, this.props.style);
    private readonly processedStyles = processStyles(this.styles);

    componentDidMount(): void {
        Keyboard.addListener("keyboardWillShow", this.onKeyboardShowHandler);
        Keyboard.addListener("keyboardWillHide", this.onKeyboardHideHandler);
    }

    componentWillUnmount(): void {
        Keyboard.removeListener("keyboardWillShow", this.onKeyboardShowHandler);
        Keyboard.removeListener("keyboardWillHide", this.onKeyboardHideHandler);
    }

    onKeyboardShow(): void {
        this.setState({ keyboardOpen: true });
    }

    onKeyboardHide(): void {
        this.setState({ keyboardOpen: false });
    }

    render(): JSX.Element {
        return (
            <Fragment>
                {this.renderDialog()}
                {!this.state.modalVisible && this.state.status !== "takingScreenshot" && (
                    <View style={floatingButtonContainer}>
                        <View style={this.styles.floatingButton}>
                            {!this.props.hideLogo ? this.renderMendixLogo() : null}
                            {this.renderCommentIcon()}
                        </View>
                    </View>
                )}
            </Fragment>
        );
    }

    renderMendixLogo(): JSX.Element {
        return this.renderImage(mendixLogo);
    }

    renderCommentIcon(): JSX.Element {
        return this.isAndroid ? (
            <TouchableNativeFeedback onPress={this.onCommentButtonPressHandler}>
                {this.renderImage(commentIcon)}
            </TouchableNativeFeedback>
        ) : (
            <TouchableOpacity onPress={this.onCommentButtonPressHandler}>
                {this.renderImage(commentIcon)}
            </TouchableOpacity>
        );
    }

    renderImage(source: ImageURISource): JSX.Element {
        return <Image style={imageStyle} source={source} />;
    }

    renderDialog(): JSX.Element | null {
        switch (this.state.status) {
            case "todo":
                const containerStyle = this.state.keyboardOpen
                    ? {
                          marginTop: Platform.select({
                              ios: -110,
                              android: 0
                          })
                      }
                    : { marginTop: 0 };
                return (
                    <Dialog.Container
                        style={containerStyle}
                        contentStyle={this.styles.dialog}
                        visible={this.state.modalVisible}
                        buttonSeparatorStyle={this.processedStyles.buttonSeparatorIos}
                        footerStyle={this.processedStyles.borderIos}
                    >
                        <Dialog.Title style={this.styles.title}>Send Feedback</Dialog.Title>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={this.processedStyles.textAreaInputStyles}
                            value={this.state.feedbackMsg}
                            onChangeText={this.onChangeTextHandler}
                            placeholder="Type your feedback here"
                            {...this.processedStyles.textAreaInputProps}
                        />
                        {this.props.allowScreenshot ? (
                            <View style={switchContainer}>
                                <Text style={this.styles.switchLabel}>Include Screenshot</Text>
                                <Switch
                                    style={this.processedStyles.switchInputStyles}
                                    value={this.state.sendScreenshot}
                                    onValueChange={this.onScreenshotToggleChangeHandler}
                                    {...this.processedStyles.switchInputProps}
                                />
                            </View>
                        ) : null}
                        <Dialog.Button
                            label="Cancel"
                            onPress={this.onModalCloseHandler}
                            color={this.styles.button.color}
                        />
                        <Dialog.Button label="Send" onPress={this.onSendHandler} color={this.styles.button.color} />
                    </Dialog.Container>
                );
            case "inprogress":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Description>Sending...</Dialog.Description>
                        <ActivityIndicator color="black" size="large" style={activityIndicatorStyle} />
                    </Dialog.Container>
                );
            case "done":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Title>Result</Dialog.Title>
                        <Dialog.Description>Feedback successfully sent</Dialog.Description>
                        <Dialog.Button label="OK" onPress={this.onModalCloseHandler} color={this.styles.button.color} />
                    </Dialog.Container>
                );
            case "error":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Title>Result</Dialog.Title>
                        <Dialog.Description>Error sending feedback</Dialog.Description>
                        <Dialog.Button label="OK" onPress={this.onModalCloseHandler} color={this.styles.button.color} />
                    </Dialog.Container>
                );
            default:
                return null;
        }
    }

    private onChangeText(value: string): void {
        this.setState({ feedbackMsg: value });
    }

    private onModalClose(): void {
        this.setModalVisible(false);
    }

    private onCommentButtonPress(): void {
        if (this.props.allowScreenshot) {
            this.setStatus("takingScreenshot", this.takeScreenshot);
        } else {
            this.setModalVisible(true);
        }
    }

    private onSend(): void {
        const data = {
            feedbackMsg: this.state.feedbackMsg,
            sprintrAppId: this.props.sprintrapp,
            screenshot: this.state.sendScreenshot ? this.state.screenshot : ""
        };

        this.setStatus("inprogress");
        sendToSprintr(data, this.onResultHandler);
    }

    private onResult(success: boolean): void {
        this.setState({ status: success ? "done" : "error", feedbackMsg: "", screenshot: "" });
    }

    private onScreenshotToggleValueChange(value: boolean): void {
        this.setState({ sendScreenshot: value });
    }

    private setModalVisible(modalVisible: boolean): void {
        this.setState({ modalVisible, status: "todo" });
    }

    private setStatus(status: Status, callback?: () => void): void {
        this.setState({ status }, callback);
    }

    private setScreenshot(screenshot: string): void {
        this.setState({ screenshot });
        this.setModalVisible(true);
    }

    private takeScreenshot(): void {
        captureScreen({
            format: "png",
            result: "base64"
        }).then(
            uri => {
                const newImage = uri.replace(/(\r\n|\n|\r)/gm, "");
                this.setScreenshot(newImage);
            },
            () => this.setScreenshot("")
        );
    }
}
