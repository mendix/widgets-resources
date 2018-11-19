import { HeightUnitType, SizeContainer, WidthUnitType } from "./SizeContainer";
import classNames = require("classnames");
import { VideoPlayer } from "./VideoPlayer";
import * as React from "react";

import "../ui/VideoPlayer.css";

export interface VideoPlayerContainerProps {
    "class"?: string;
    style?: React.CSSProperties;
    urlAttribute?: PluginWidget.EditableValue<string>;
    urlValue?: string;
    posterAttribute?: PluginWidget.EditableValue<string>;
    posterImage?: string;

    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;

    autoStart: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
}

export default class VideoPlayerContainer extends React.Component<VideoPlayerContainerProps> {

    render() {
        return (
            <SizeContainer
                className={classNames("video-player-container", this.props.class)}
                style={this.props.style}
                widthUnit={this.props.widthUnit}
                width={this.props.width}
                heightUnit={this.props.heightUnit}
                height={this.props.height}>
                <VideoPlayer url={this.props.urlAttribute ? this.props.urlAttribute.value! : ""}
                             staticUrl={this.props.urlValue || ""}
                             poster={this.props.posterAttribute ? this.props.posterAttribute.value! : ""}
                             staticPoster={this.props.posterImage}
                             autoStart={this.props.autoStart}
                             showControls={this.props.showControls}
                             loop={this.props.loop}
                             muted={this.props.muted}/>
            </SizeContainer>
        );
    }

}
