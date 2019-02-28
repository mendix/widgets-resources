import { Component, createElement, Fragment } from "react";
import {
    ActivityIndicator,
    Image,
    ImageURISource,
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
    borderIos,
    button,
    buttonSeparatorStyle,
    childElementStyle,
    commentIcon,
    elementStyle,
    gray,
    imageStyle,
    mendixLogo,
    switchViewStyle,
    TextArea,
    Toggle
} from "./ui/styles";
import { sendToSprintr } from "./utils/form";

export class Feedback extends Component<FeedbackProps<undefined>> {
    private isAndroid = Platform.OS === "android";
    readonly state = {
        modalVisible: false,
        sendScreenshot: true,
        feedbackMsg: "",
        screenshot: "",
        status: "todo"
    };
    private readonly onCommentButtonPressHandler = this.onCommentButtonPress.bind(this);
    private readonly onModalCloseHandler = this.onModalClose.bind(this);
    private readonly onScreenshotToggleChangeHandler = this.onScreenshotToggleValueChange.bind(this);
    private readonly onChangeTextHandler = this.onChangeText.bind(this);
    private readonly onSendHandler = this.onSend.bind(this);
    private readonly onResultHandler = this.onResult.bind(this);

    render(): JSX.Element {
        return (
            <Fragment>
                {this.renderDialog()}
                {!this.state.modalVisible && this.state.status !== "takingScreenshot" && (
                    <View style={elementStyle}>
                        <View style={childElementStyle}>
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
        const androidProps = Platform.select({
            ios: {},
            android: {
                trackColor: { false: "", true: "61c5ff" },
                thumbColor: !this.state.sendScreenshot ? "white" : button.primary.background
            }
        });
        switch (this.state.status) {
            case "todo":
                return (
                    <Dialog.Container
                        visible={this.state.modalVisible}
                        buttonSeparatorStyle={buttonSeparatorStyle}
                        footerStyle={borderIos}
                    >
                        <Dialog.Title>Send Feedback</Dialog.Title>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={TextArea}
                            value={this.state.feedbackMsg}
                            placeholderTextColor={gray.regular}
                            onChangeText={this.onChangeTextHandler}
                            selectionColor={gray.light}
                            placeholder="Type your feedback here"
                            underlineColorAndroid="transparent"
                        />
                        {this.props.allowScreenshot ? (
                            <View style={switchViewStyle}>
                                <Text style={Toggle.label}>Include Screenshot</Text>
                                <Switch
                                    style={Toggle.input}
                                    {...androidProps}
                                    value={this.state.sendScreenshot}
                                    onValueChange={this.onScreenshotToggleChangeHandler}
                                />
                            </View>
                        ) : null}
                        <Dialog.Button label="Cancel" onPress={this.onModalCloseHandler} />
                        <Dialog.Button label="Send" onPress={this.onSendHandler} />
                    </Dialog.Container>
                );
            case "inprogress":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Description>Sending..</Dialog.Description>
                        <ActivityIndicator color="black" size="large" style={activityIndicatorStyle} />
                    </Dialog.Container>
                );
            case "done":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Title>Result</Dialog.Title>
                        <Dialog.Description>Feedback successfully sent</Dialog.Description>
                        <Dialog.Button label="OK" onPress={this.onModalCloseHandler} />
                    </Dialog.Container>
                );
            case "error":
                return (
                    <Dialog.Container visible={this.state.modalVisible}>
                        <Dialog.Title>Result</Dialog.Title>
                        <Dialog.Description>Error sending feedback</Dialog.Description>
                        <Dialog.Button label="OK" onPress={this.onModalCloseHandler} />
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
        const data = { ...this.props, ...this.state };
        if (!this.state.sendScreenshot) {
            data.screenshot = "";
        }

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

    private setStatus(status: string, callback?: () => void): void {
        this.setState({ status }, callback);
    }

    private setScreenshot(screenshot: string): void {
        this.setState({ screenshot });
        this.setModalVisible(true);
    }

    private takeScreenshot(): void {
        captureScreen({
            format: "png",
            result: "base64",
            quality: 0.5
        }).then(uri => this.setScreenshot(uri), () => this.setScreenshot(""));
    }
}
