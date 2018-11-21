import * as React from "react";
import { Html5Player } from "./Html5Player";
import Youtube from "./Youtube";
import Vimeo from "./Vimeo";

export interface VideoPlayerProps {
    url: string;
    staticUrl: string;
    className?: string;
    style?: object;
    poster?: string;
    staticPoster?: string;

    autoStart: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
}

const extractProvider = (url: string): string => {
    if (url)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        } else if (url.includes("vimeo.com")) {
            return "vimeo";
        }
    return "";
};

export const validateUrl = (url: string): string => {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url))
        return url;
    return "";
};

export class VideoPlayer extends React.Component <VideoPlayerProps> {

    constructor(props: VideoPlayerProps) {
        super(props);

        this.renderHtml5Player = this.renderHtml5Player.bind(this);
        this.renderYoutubePlayer = this.renderYoutubePlayer.bind(this);
        this.renderVimeoPlayer = this.renderVimeoPlayer.bind(this);
    }

    render() {
        const provider = extractProvider(this.props.url || this.props.staticUrl);
        if (provider === "youtube") {
            return this.renderYoutubePlayer();
        } else if (provider === "vimeo") {
            return this.renderVimeoPlayer();
        }
        return this.renderHtml5Player();
    }

    private renderHtml5Player(): React.ReactElement<{}> {
        return (
            <Html5Player
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                poster={this.props.poster || this.props.staticPoster}
                url={this.props.url || this.props.staticUrl} />
        );
    }

    private renderYoutubePlayer(): React.ReactElement<{}> {
        return (
            <Youtube
                url={this.props.url || this.props.staticUrl}
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
            />
        );
    }

    private renderVimeoPlayer(): React.ReactElement<{}> {
        return (
            <Vimeo
                url={this.props.url || this.props.staticUrl}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
            />
        );
    }
}
