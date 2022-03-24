import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { createElement, ReactElement, useEffect, useRef, useState, Fragment, useCallback } from "react";
import {
    ActivityIndicator,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Appearance,
    Modal,
    NativeModules
} from "react-native";
import Video, { OnProgressData, VideoProperties } from "react-native-video";
import Icon from "react-native-vector-icons/MaterialIcons";
import { VideoPlayerProps } from "../typings/VideoPlayerProps";
import { defaultVideoStyle, VideoStyle } from "./ui/Styles";
import { isAvailable } from "@mendix/piw-utils-internal";
import deepmerge from "deepmerge";

const enum StatusEnum {
    ERROR = "error",
    LOADING = "loading",
    READY = "ready",
    NOT_READY = "not-ready"
}

export function VideoPlayer(props: VideoPlayerProps<VideoStyle>): ReactElement {
    const [styles, setStyles] = useState(flattenStyles(defaultVideoStyle, props.style));
    const timeoutRef = useRef<NodeJS.Timeout>();
    const playerRef = useRef<Video>(null);
    const fullScreenPlayerRef = useRef<Video>(null);
    const [status, setStatus] = useState(StatusEnum.NOT_READY);
    const [videoAspectRatio, setVideoAspectRatio] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);

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

    const showControlsHandler = useCallback((): void => {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);

        setShowControls(true);
        timeoutRef.current = global.setTimeout(() => setShowControls(false), 5000);
    }, []);

    useEffect(() => {
        if (props.showControls) {
            showControlsHandler();
        }
        return () => {
            clearTimeout(timeoutRef.current as NodeJS.Timeout);
        };
    }, [fullScreen, props.showControls, showControlsHandler]);

    const onVideoPressHandler = useCallback((): void => {
        if (!props.showControls) {
            return;
        }
        if (!showControls) {
            showControlsHandler();
        } else {
            clearTimeout(timeoutRef.current as NodeJS.Timeout);
            setShowControls(false);
        }
    }, [props.showControls, showControls, showControlsHandler]);

    async function fullScreenHandler(isFullScreen: boolean): Promise<void> {
        setFullScreen(isFullScreen);
        const { NavigationBar } = NativeModules;
        if (NavigationBar) {
            const SystemNavigationBar = (await import("react-native-system-navigation-bar")).default;

            if (isFullScreen) {
                SystemNavigationBar.navigationHide();
                StatusBar.setHidden(true);
            } else {
                SystemNavigationBar.navigationShow();
                StatusBar.setHidden(false);
                const isDark = Appearance.getColorScheme() === "dark";
                StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
            }
        }
    }

    const videoProps: VideoProperties = {
        testID: props.name,
        source: { uri: isAvailable(props.videoUrl) ? props.videoUrl.value : undefined },
        muted: props.muted,
        repeat: props.loop,
        controls: props.showControls,
        onLoadStart: () => setStatus(StatusEnum.LOADING),
        onError: () => setStatus(StatusEnum.ERROR),
        useTextureView: false,
        resizeMode: props.aspectRatio ? "contain" : "stretch",
        onProgress: ({ currentTime }: OnProgressData) => currentTime && setCurrentPlayTime(currentTime)
    };

    const isAndroid = Platform.OS === "android";
    const errorText = status === StatusEnum.ERROR && <Text style={styles.errorMessage}>The video failed to load</Text>;

    return (
        <Fragment>
            {isAndroid && (
                <Modal
                    visible={fullScreen}
                    onRequestClose={() => fullScreenHandler(false)}
                    testID="fullscreen-modal"
                    statusBarTranslucent
                >
                    <View style={styles.fullScreenVideoPlayer}>
                        <TouchableWithoutFeedback onPress={onVideoPressHandler} testID="fullscreen-overlay">
                            <Video
                                {...videoProps}
                                ref={fullScreenPlayerRef}
                                paused={false}
                                onLoad={data => {
                                    setStatus(StatusEnum.READY);
                                    setVideoAspectRatio(data.naturalSize.width / data.naturalSize.height);
                                    fullScreenPlayerRef.current?.seek(currentPlayTime);
                                }}
                                testID={`${props.name}-fullscreen`}
                                style={styles.fullScreenVideoStyle}
                            />
                        </TouchableWithoutFeedback>
                        {showControls && (
                            <TouchableOpacity
                                style={styles.controlBtnContainerStyle}
                                onPress={() => fullScreenHandler(false)}
                                testID="btn-fullscreen-exit"
                            >
                                <Icon name="fullscreen-exit" color="white" size={22} />
                            </TouchableOpacity>
                        )}
                        {status === StatusEnum.LOADING && (
                            <ActivityIndicator
                                color={styles.indicator.color}
                                size="large"
                                style={styles.fullScreenActivityIndicatorStyle}
                            />
                        )}
                        {errorText}
                    </View>
                </Modal>
            )}
            <View style={styles.container}>
                {status === StatusEnum.LOADING && <ActivityIndicator color={styles.indicator.color} size="large" />}
                {errorText}
                {!fullScreen && (
                    <TouchableWithoutFeedback style={styles.container} onPress={onVideoPressHandler}>
                        <Video
                            {...videoProps}
                            paused={!props.autoStart && !currentPlayTime}
                            onLoad={data => {
                                setStatus(StatusEnum.READY);
                                setVideoAspectRatio(data.naturalSize.width / data.naturalSize.height);
                                playerRef.current?.seek(currentPlayTime);
                            }}
                            ref={playerRef}
                            style={status !== StatusEnum.READY ? { height: 0 } : styles.video}
                        />
                    </TouchableWithoutFeedback>
                )}
                {isAndroid && showControls && (
                    <TouchableOpacity
                        onPress={() => fullScreenHandler(true)}
                        style={styles.controlBtnContainerStyle}
                        testID="btn-fullscreen"
                    >
                        <Icon name="fullscreen" color="white" size={22} />
                    </TouchableOpacity>
                )}
            </View>
        </Fragment>
    );
}
