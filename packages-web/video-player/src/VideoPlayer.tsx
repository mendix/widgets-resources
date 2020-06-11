import { Component, createElement } from "react";
import classNames from "classnames";

import { SizeContainer } from "./components/SizeContainer";
import { Video } from "./components/Video";
import { VideoPlayerContainerProps } from "../typings/VideoPlayerProps";

import "./ui/VideoPlayer.css";

export default class VideoPlayer extends Component<VideoPlayerContainerProps> {
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
                    url={this.props.urlExpression && this.props.urlExpression.value}
                    poster={this.props.posterExpression && this.props.posterExpression.value}
                    autoStart={this.props.autoStart}
                    showControls={this.props.showControls}
                    loop={this.props.loop}
                    muted={this.props.muted}
                    aspectRatio={this.props.heightUnit === "aspectRatio"}
                    preview={false}
                />
            </SizeContainer>
        );
    }
}
