import { flattenStyles, Style } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import Video from "react-native-video";

import { VideoPlayerProps } from "../typings/VideoPlayerProps";

interface State {
    loading: boolean;
}

interface VideoStyle extends Style {
    container: ViewStyle;
    indicator: {
        backgroundColor: string;
    };
    video: ViewStyle;
}

const defaultVideoStyle: VideoStyle = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    indicator: {
        backgroundColor: "white"
    },
    video: {
        width: "100%",
        height: "100%"
    }
};

export class VideoPlayer extends Component<VideoPlayerProps<undefined>, State> {
    readonly state = {
        loading: true
    };

    private readonly onLoadStartHandler = this.onLoadStart.bind(this);
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly styles = flattenStyles(defaultVideoStyle, this.props.style);

    render(): JSX.Element {
        const videoUrl = (this.props.videoUrl && this.props.videoUrl.value) || this.props.staticVideoUrl;
        return (
            <View style={this.styles.container}>
                {this.state.loading && <ActivityIndicator color={this.styles.indicator.backgroundColor} size="large" />}
                <Video
                    source={{ uri: videoUrl }}
                    paused={!this.props.autoStart}
                    muted={this.props.muted}
                    repeat={this.props.loop}
                    controls={this.props.showControls}
                    onLoadStart={this.onLoadStartHandler}
                    onLoad={this.onLoadHandler}
                    style={this.state.loading ? { height: 0 } : this.styles.video}
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
