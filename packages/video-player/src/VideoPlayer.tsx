import { Component, createElement } from "react";
import { ActivityIndicator, View } from "react-native";
import Video from "react-native-video";

import { VideoPlayerProps } from "../typings/VideoPlayerProps";

interface State {
    loading: boolean;
}

export class VideoPlayer extends Component<VideoPlayerProps, State> {
    readonly state = {
        loading: true
    };

    private readonly onLoadStartHandler = this.onLoadStart.bind(this);
    private readonly onLoadHandler = this.onLoad.bind(this);

    render(): JSX.Element {
        const videoUrl = (this.props.videoUrl && this.props.videoUrl.value) || this.props.staticVideoUrl;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: this.props.loadingBackgroundColor
                }}
            >
                {this.state.loading && <ActivityIndicator color={this.props.loadingForegroundColor} size="large" />}
                <Video
                    source={{ uri: videoUrl }}
                    paused={!this.props.autoStart}
                    muted={this.props.muted}
                    repeat={this.props.loop}
                    controls={this.props.showControls}
                    onLoadStart={this.onLoadStartHandler}
                    onLoad={this.onLoadHandler}
                    style={{
                        width: "100%",
                        height: this.state.loading ? 0 : "100%"
                    }}
                />
            </View>
        );
    }

    private onLoadStart(): void {
        this.setState({ loading: true });
    }

    private onLoad(): void {
        this.setState({ loading: false });
    }
}
