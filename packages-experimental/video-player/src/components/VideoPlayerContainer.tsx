import * as React from "react";
import classNames = require("classnames");

import { hot } from "react-hot-loader";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./SizeContainer";
import { VideoPlayer } from "./VideoPlayer";

import "../ui/VideoPlayer.css";

export interface VideoPlayerContainerProps {
    "class"?: string;
    style?: React.CSSProperties;
    urlAttribute?: PluginWidget.EditableValue<string>;
    urlStatic?: string;
    posterAttribute?: PluginWidget.EditableValue<string>;
    posterImageUrl?: string;

    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;

    autoStart: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio: boolean;
}

class VideoPlayerContainer extends React.Component<VideoPlayerContainerProps> {
    render() {
        return (
            <SizeContainer
                className={classNames("widget-video-player widget-video-player-container", this.props.class)}
                style={this.props.style}
                widthUnit={this.props.widthUnit}
                width={this.props.width}
                heightUnit={this.props.heightUnit}
                height={this.props.height}>
                <VideoPlayer url={this.props.urlAttribute ? this.props.urlAttribute.value! : ""}
                             staticUrl={this.props.urlStatic || ""}
                             poster={this.props.posterAttribute ? this.props.posterAttribute.value! : ""}
                             staticPoster={this.props.posterImageUrl}
                             autoStart={this.props.autoStart}
                             showControls={this.props.showControls}
                             loop={this.props.loop}
                             muted={this.props.muted}
                             aspectRatio={this.props.aspectRatio}
                             preview={false}/>
            </SizeContainer>
        );
    }
}

export default hot(module)(VideoPlayerContainer);
