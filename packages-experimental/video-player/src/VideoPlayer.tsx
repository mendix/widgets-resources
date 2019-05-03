import { Component, createElement } from "react";
import classNames = require("classnames");

import { hot } from "react-hot-loader/root";
import { SizeContainer } from "./components/SizeContainer";
import { Video } from "./components/Video";
import { VideoPlayerContainerProps } from "../typings/VideoPlayerProps";

import "./ui/VideoPlayer.css";

class VideoPlayer extends Component<VideoPlayerContainerProps> {
    render(): JSX.Element {
        return (
            <SizeContainer
                className={classNames("widget-video-player widget-video-player-container", this.props.class)}
                style={this.props.style}
                widthUnit={this.props.widthUnit}
                width={this.props.width}
                heightUnit={this.props.heightUnit}
                height={this.props.height}
                tabIndex={this.props.tabIndex}
            >
                <Video
                    url={this.props.urlAttribute && this.props.urlAttribute.value}
                    staticUrl={this.props.urlStatic || ""}
                    poster={this.props.posterAttribute && this.props.posterAttribute.value}
                    staticPoster={this.props.posterImageUrl}
                    autoStart={this.props.autoStart}
                    showControls={this.props.showControls}
                    loop={this.props.loop}
                    muted={this.props.muted}
                    aspectRatio={this.props.aspectRatio}
                    preview={false}
                />
            </SizeContainer>
        );
    }
}

export default hot(VideoPlayer);
