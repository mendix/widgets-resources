import { Component, ReactElement, createElement } from "react";
import { Alert } from "./Alert";

export interface VideoPlayerProps {
    url: string;
    staticUrl: string;
    className?: string;
    style?: object;

    autoStart: boolean;
    showControls: boolean;
}

const extractProvider = (url: string) => {
    if (url)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        } else if (url.includes("vimeo.com")) {
            return "vimeo";
        }
    return "";
};

export interface VideoPlayerState {
    alertMessage?: string;
}

export const validateUrl = (url: string) => {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url))
        return url;
    return null;
};

export class VideoPlayer extends Component <VideoPlayerProps, VideoPlayerState> {

    constructor(props: VideoPlayerProps) {
        super(props);

        this.state = {
            alertMessage: ""
        };

        this.renderVideoPlayer = this.renderVideoPlayer.bind(this);
        this.renderJwPlayerContent = this.renderJwPlayerContent.bind(this);
    }

    render() {
        const url = this.generateUrl(this.props.url || this.props.staticUrl);
        return createElement("div", { className: "video-player-container" },
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-badge-alert",
                message: this.state.alertMessage!
            }),
            this.renderVideoPlayer(url),
            this.renderJwPlayerContent(url));
    }

    private renderJwPlayerContent(url: string): ReactElement<{}> {
        return createElement("video", {
                controls: this.props.showControls,
                height: "100%",
                width: "100%",
                style: { display: !extractProvider(url) ? "block" : "none", backgroundColor: "#999" },
                autoPlay: this.props.autoStart
            },
            createElement("source", {
                src: this.props.url || this.props.staticUrl,
                type: "video/mp4"
            }));
    }

    private renderVideoPlayer(url: string): ReactElement<{}> {
        return createElement("iframe", {
            className: this.props.className,
            src: extractProvider(url) ? url : "",
            frameBorder: 0,
            style: { display: extractProvider(url) ? "block" : "none" },
            allowFullScreen: true
        });
    }

    private generateUrl(url: string) {
        const provider = extractProvider(url);
        const attributes = `?${this.props.autoStart ? "autoplay=1" : "autoplay=0"}${this.props.showControls ? "&controls=1" : "&controls=0"}`;
        try {
            switch (provider) {
                case "youtube":
                    if (url.includes("youtube.com/embed/"))
                        return url;
                    if (url.includes("youtu.be/") || url.includes("youtube.com/v/")) {
                        const urlSplit = url.split("/");
                        if (urlSplit.length > 0) {
                            const id = urlSplit[urlSplit.length - 1];
                            return `https://www.youtube.com/embed/${id}${attributes}`;
                        }
                    }
                    if (url.includes("youtube.com/watch?v=")) {
                        const urlYoutubeSplit = url.split("watch?v=");
                        if (urlYoutubeSplit.length > 0) {
                            const id = urlYoutubeSplit[urlYoutubeSplit.length - 1];
                            return `https://www.youtube.com/embed/${id}${attributes}`;
                        }
                    }
                    break;
                case "vimeo":
                    if (url.includes("player.vimeo.com"))
                        return url;

                    const urlVimeoSplit = url.split("/");
                    if (urlVimeoSplit.length > 0) {
                        const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                        if (isFinite(Number(id)))
                            return `https://player.vimeo.com/video/${id}${attributes}`;
                    }
                    break;
            }
        } catch (e) {
            //
        }
        return url;
    }

    componentWillReceiveProps(nextProps: VideoPlayerProps) {
        const url = nextProps.url || nextProps.staticUrl;
        this.setState({ alertMessage: "" });
        if (!url)
            this.setState({ alertMessage: "Please provide an URL" });
        if (url && !validateUrl(url))
            this.setState({ alertMessage: "Please provide a valid URL" });
    }

}
