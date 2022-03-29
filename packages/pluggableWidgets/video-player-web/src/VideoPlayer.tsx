import { Component, createElement } from "react";
import classNames from "classnames";

import { SizeContainer } from "./components/SizeContainer";
import { Video } from "./components/Video";
import { VideoPlayerContainerProps } from "../typings/VideoPlayerProps";

import "./ui/VideoPlayer.scss";

export default class VideoPlayer extends Component<VideoPlayerContainerProps> {
    render(): JSX.Element {
        const useExpressionForLinks = this.props.type === "expression";
        const url = useExpressionForLinks ? this.props.urlExpression?.value : this.props.videoUrl?.value;
        const poster = useExpressionForLinks ? this.props.posterExpression?.value : this.props.posterUrl?.value;
        const key = poster ? `${url}-${poster}` : url;

        return (
            <SizeContainer
                className={classNames("widget-video-player widget-video-player-container", this.props.class)}
                style={this.props.style}
                widthUnit={this.props.widthUnit}
                width={this.props.width}
                heightUnit={this.props.heightUnit}
                height={this.props.height}
                heightAspectRatio={this.props.heightAspectRatio}
                tabIndex={this.props.tabIndex}
            >
                <Video
                    key={key}
                    url={url}
                    poster={poster}
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
