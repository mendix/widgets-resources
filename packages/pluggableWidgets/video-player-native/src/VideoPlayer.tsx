import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Video from "react-native-video";
import { VideoPlayerProps } from "../typings/VideoPlayerProps";
import { defaultVideoStyle, VideoStyle } from "./ui/Styles";
import { isAvailable } from "@widgets-resources/piw-utils";
import deepmerge from "deepmerge";

const enum StatusEnum {
    ERROR = "error",
    LOADING = "loading",
    READY = "ready",
    NOT_READY = "not-ready"
}

export function VideoPlayer(props: VideoPlayerProps<VideoStyle>): ReactElement {
    const [styles, setStyles] = useState(flattenStyles(defaultVideoStyle, props.style));
    const [status, setStatus] = useState(StatusEnum.NOT_READY);
    const [videoAspectRatio, setVideoAspectRatio] = useState(0);

    useEffect(() => {
        const alteredStyles = deepmerge({}, styles);
        if (props.aspectRatio && videoAspectRatio !== 0) {
            alteredStyles.video.aspectRatio = videoAspectRatio;
            alteredStyles.container.aspectRatio = videoAspectRatio;
        } else if (!props.aspectRatio) {
            alteredStyles.container.aspectRatio = undefined;
            if (alteredStyles.video.width) {
                alteredStyles.container.width = alteredStyles.video.width;
            }
            if (alteredStyles.video.height) {
                alteredStyles.container.height = alteredStyles.video.height;
            }
        }
        setStyles(alteredStyles);
    }, [props.style, props.aspectRatio, videoAspectRatio]);

    return (
        <View style={styles.container}>
            {status === StatusEnum.LOADING && <ActivityIndicator color={styles.indicator.color} size="large" />}
            {status === StatusEnum.ERROR && <Text style={styles.errorMessage}>The video failed to load :(</Text>}
            <Video
                testID={props.name}
                source={{ uri: isAvailable(props.videoUrl) ? props.videoUrl.value : undefined }}
                paused={!props.autoStart}
                muted={props.muted}
                repeat={props.loop}
                controls={props.showControls}
                onLoadStart={() => setStatus(StatusEnum.LOADING)}
                onLoad={data => {
                    setStatus(StatusEnum.READY);
                    setVideoAspectRatio(data.naturalSize.width / data.naturalSize.height);
                }}
                onError={() => setStatus(StatusEnum.ERROR)}
                style={status !== StatusEnum.READY ? { height: 0 } : styles.video}
                useTextureView={false}
                resizeMode={props.aspectRatio ? "contain" : "stretch"}
            />
        </View>
    );
}
