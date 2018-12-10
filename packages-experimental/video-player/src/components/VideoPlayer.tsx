import * as React from "react";

import { Dailymotion } from "./Dailymotion";
import { Html5Player } from "./Html5Player";
import { PlayerError } from "./PlayerError";
import { Vimeo } from "./Vimeo";
import { Youtube } from "./Youtube";

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

    preview?: boolean;
}

export class VideoPlayer extends React.Component <VideoPlayerProps> {

    constructor(props: VideoPlayerProps) {
        super(props);

        this.renderHtml5Player = this.renderHtml5Player.bind(this);
        this.renderYoutubePlayer = this.renderYoutubePlayer.bind(this);
        this.renderVimeoPlayer = this.renderVimeoPlayer.bind(this);
    }

    render() {
        const url = this.props.url || this.props.staticUrl;
        if (!Utils.validateUrl(url))
            return <PlayerError preview={this.props.preview} />;
        if (Youtube.canPlay(url)) {
            return this.renderYoutubePlayer();
        } else if (Vimeo.canPlay(url)) {
            return this.renderVimeoPlayer();
        } else if (Dailymotion.canPlay(url)) {
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
