import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { ActivityIndicator, View } from "react-native";
import Video from "react-native-video";

import { VideoPlayerProps } from "../typings/VideoPlayerProps";
import { defaultVideoStyle } from "./ui/Styles";

export type Props = VideoPlayerProps<undefined>;

interface State {
    loading: boolean;
}

export class VideoPlayer extends Component<Props, State> {
    readonly state = {
        loading: true
    };

    private readonly onLoadStartHandler = this.onLoadStart.bind(this);
    private readonly onLoadHandler = this.onLoad.bind(this);
    private readonly styles = flattenStyles(defaultVideoStyle, this.props.style);

    render(): JSX.Element {
        const uri = this.props.videoUrl && this.props.videoUrl.value;
        return (
            <View style={this.styles.container}>
                {this.state.loading && <ActivityIndicator color={this.styles.indicator.color} size="large" />}
                <Video
                    source={{ uri }}
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
