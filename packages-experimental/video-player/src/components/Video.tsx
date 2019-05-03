import { Component, createElement } from "react";

import { DailymotionPlayer } from "./DailymotionPlayer";
import { Html5Player } from "./Html5Player";
import { VimeoPlayer } from "./VimeoPlayer";
import { YoutubePlayer } from "./YoutubePlayer";

export interface VideoPlayerProps {
    url?: string;
    staticUrl?: string;
    style?: object;
    poster?: string;
    staticPoster?: string;

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
        const url = this.props.url || this.props.staticUrl || "";
        if (YoutubePlayer.canPlay(url)) {
            return this.handleYoutubePlayerRender(url);
        } else if (VimeoPlayer.canPlay(url)) {
            return this.handleVimeoPlayerRender(url);
        } else if (DailymotionPlayer.canPlay(url)) {
            return this.handleDailymotionPlayerRender(url);
        }
        return this.handleHtml5PlayerRender(url);
    }

    private renderHtml5Player(url: string): JSX.Element {
        return (
            <Html5Player
                showControls={this.props.showControls}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                loop={this.props.loop}
                poster={this.props.poster || this.props.staticPoster}
                url={url}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }

    private renderYoutubePlayer(url: string): JSX.Element {
        return (
            <YoutubePlayer
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
        return <VimeoPlayer url={url} autoPlay={this.props.autoStart} muted={this.props.muted} loop={this.props.loop} aspectRatio={this.props.aspectRatio} />;
    }

    private renderDailymotionPlayer(url: string): JSX.Element {
        return (
            <DailymotionPlayer
                url={url}
                autoPlay={this.props.autoStart}
                muted={this.props.muted}
                controls={this.props.showControls}
                aspectRatio={this.props.aspectRatio}
            />
        );
    }
}
