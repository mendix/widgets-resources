import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Video, { OnLoadData } from "react-native-video";
import { VideoPlayerProps } from "../typings/VideoPlayerProps";
import { defaultVideoStyle } from "./ui/Styles";

export type Props = VideoPlayerProps<undefined>;

const enum StatusEnum {
    ERROR = "error",
    LOADING = "loading",
    READY = "ready",
    NOT_READY = "not-ready"
}

interface State {
    aspectRatio?: number;
    status: StatusEnum;
}

export class VideoPlayer extends Component<Props, State> {
    readonly state: State = {
        status: StatusEnum.NOT_READY
    };

    private readonly onLoadStartHandler = this.onLoadStart.bind(this);
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly onErrorHandler = this.onError.bind(this);
    private readonly styles = flattenStyles(defaultVideoStyle, this.props.style);

    render(): JSX.Element {
        const uri = this.props.videoUrl && this.props.videoUrl.value;

        const styles = { ...this.styles.container };

        if (this.props.aspectRatio && this.state.aspectRatio) {
            this.styles.video.aspectRatio = this.state.aspectRatio;
            styles.aspectRatio = this.state.aspectRatio;
        } else if (!this.props.aspectRatio) {
            styles.aspectRatio = undefined;
            if (this.styles.video.width) {
                styles.width = this.styles.video.width;
            }
            if (this.styles.video.height) {
                styles.height = this.styles.video.height;
            }
        }

        return (
            <View style={styles}>
                {this.state.status === StatusEnum.LOADING && (
                    <ActivityIndicator color={this.styles.indicator.color} size="large" />
                )}
                {this.state.status === StatusEnum.ERROR && (
                    <Text style={this.styles.errorMessage}>The video failed to load :(</Text>
                )}
                <Video
                    testID={this.props.name}
                    source={{ uri }}
                    paused={!this.props.autoStart}
                    muted={this.props.muted}
                    repeat={this.props.loop}
                    controls={this.props.showControls}
                    onLoadStart={this.onLoadStartHandler}
                    onLoad={this.onLoadHandler}
                    onError={this.onErrorHandler}
                    style={this.state.status !== StatusEnum.READY ? { height: 0 } : this.styles.video}
                    useTextureView={false}
                    resizeMode={this.props.aspectRatio ? "contain" : "stretch"}
                />
            </View>
        );
    }

    private onLoadStart(): void {
        this.setState({ status: StatusEnum.LOADING });
    }

    private onLoad(data: OnLoadData): void {
        this.setState({ status: StatusEnum.READY, aspectRatio: data.naturalSize.width / data.naturalSize.height });
    }

    private onError(): void {
        this.setState({ status: StatusEnum.ERROR });
    }
}
