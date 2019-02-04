import * as React from "react";
import { StyleSheet } from "react-native";
import Video from "react-native-video";
import { VideoPlayerProps } from "../typings/VideoPlayerProps";

export class VideoPlayer extends React.PureComponent<VideoPlayerProps, {}> {
    private styles = StyleSheet.create({
        backgroundVideo: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: 100,
            height: 100
        }
    });

    render(): JSX.Element {
        return (
            <Video
                source={{ uri: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }}
                style={this.styles.backgroundVideo}
            />
        );
    }
}
