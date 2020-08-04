import { Component, createElement } from "react";

import { Dailymotion } from "./Dailymotion";
import { Html5 } from "./Html5";
import { Vimeo } from "./Vimeo";
import { Youtube } from "./Youtube";

export interface VideoPlayerProps {
    url?: string;
    style?: object;
    poster?: string;

    autoStart: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio: boolean;

    preview?: boolean;
}

export class Video extends Component<VideoPlayerProps> {
    private readonly handleHtml5PlayerRender = this.renderHtml5Player.bind(this);
    private readonly handleYoutubePlayerRender = this.renderYoutubePlayer.bind(this);
    private readonly handleVimeoPlayerRender = this.renderVimeoPlayer.bind(this);
    private readonly handleDailymotionPlayerRender = this.renderDailymotionPlayer.bind(this);

    render(): JSX.Element {
        const url = this.props.url || "";
        if (Youtube.canPlay(url)) {
            return this.handleYoutubePlayerRender(url);
        } else if (Vimeo.canPlay(url)) {
            return this.handleVimeoPlayerRender(url);
        } else if (Dailymotion.canPlay(url)) {
            return this.handleDailymotionPlayerRender(url);
        }
        return this.handleHtml5PlayerRender(url);
    }

    private renderHtml5Player(url: string): JSX.Element {
        return (
            <Html5
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                poster={this.props.poster}
                url={url}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderYoutubePlayer(url: string): JSX.Element {
        return (
            <Youtube
                url={url}
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderVimeoPlayer(url: string): JSX.Element {
        return (
            <Vimeo
                url={url}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderDailymotionPlayer(url: string): JSX.Element {
        return (
            <Dailymotion
                url={url}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                showControls={this.props.showControls}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }
}
