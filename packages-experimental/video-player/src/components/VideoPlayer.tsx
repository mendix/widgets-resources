import * as React from "react";
import Html5Player from "./Html5Player";
import Youtube from "./Youtube";
import Vimeo from "./Vimeo";
import { PlayerError } from "./PlayerError";
import Dailymotion from "./Dailymotion";

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
    aspectRatio: boolean;
}

const extractProvider = (url: string): string => {
    if (url)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        } else if (url.includes("vimeo.com")) {
            return "vimeo";
        } else if (url.includes("dailymotion.com")) {
            return "dailymotion";
        }
    return "";
};

export const validateUrl = (url: string): string => {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url))
        return url;
    return "";
};

class VideoPlayer extends React.Component <VideoPlayerProps> {

    constructor(props: VideoPlayerProps) {
        super(props);

        this.renderHtml5Player = this.renderHtml5Player.bind(this);
        this.renderYoutubePlayer = this.renderYoutubePlayer.bind(this);
        this.renderVimeoPlayer = this.renderVimeoPlayer.bind(this);
    }

    render() {
        const provider = extractProvider(this.props.url || this.props.staticUrl);
        if (!validateUrl(this.props.url || this.props.staticUrl))
            return <PlayerError />;
        if (provider === "youtube") {
            return this.renderYoutubePlayer();
        } else if (provider === "vimeo") {
            return this.renderVimeoPlayer();
        } else if (provider === "dailymotion") {
            return this.renderDailymotionPlayer();
        }
        return this.renderHtml5Player();
    }

    private renderHtml5Player(): React.ReactElement<Html5Player> {
        return (
            <Html5Player
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                poster={this.props.poster || this.props.staticPoster}
                url={this.props.url || this.props.staticUrl}
                aspectRatio={this.props.aspectRatio}/>
        );
    }

    private renderYoutubePlayer(): React.ReactElement<Youtube> {
        return (
            <Youtube
                url={this.props.url || this.props.staticUrl}
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderVimeoPlayer(): React.ReactElement<Vimeo> {
        return (
            <Vimeo
                url={this.props.url || this.props.staticUrl}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderDailymotionPlayer(): React.ReactElement<Dailymotion> {
        return (
            <Dailymotion
                url={this.props.url || this.props.staticUrl}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                controls={this.props.showControls}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }
}

export function fixHeightWithRatio(element: HTMLElement, ratio: number) {
    const height = element.parentElement!.offsetWidth * ratio;
    if (height > 0) {
        element.style.height = `${height}px`;
        element.parentElement!.style.height = `${height}px`;
        if (element.parentElement!.parentElement)
            element.parentElement!.parentElement!.style.height = `${height}px`;
    }
}

export function getRatio(url: string): Promise<number> {
    return fetch(`https://noembed.com/embed?url=${url}`)
        .then(response => response.json())
        .then((properties) => {
            return properties.height / properties.width;
        })
        .catch(() => {
            return 0;
        });
}

export default VideoPlayer;
