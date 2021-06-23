import { parseStyle } from "@mendix/piw-utils-internal";
import { Component, createElement } from "react";
import classNames from "classnames";

import { SizeContainer } from "./components/SizeContainer";
import videoPreview from "./assets/VideoPreview.svg";
import videoWithControlsPreview from "./assets/VideoWithControlsPreview.svg";
import { VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";

declare function require(name: string): string;

export class preview extends Component<VideoPlayerPreviewProps, {}> {
    render(): JSX.Element {
        return (
            <SizeContainer
                className={classNames("video-player-container", this.props.class)}
                style={{ ...parseStyle(this.props.style), minHeight: "400px" }} // TODO: remove the min height when aspect ratio height works with percentages inside SizeContainer
                widthUnit={this.props.widthUnit}
                width={this.props.width ?? 0}
                heightUnit={this.props.heightUnit}
                height={this.props.height ?? 0}
                tabIndex={0}
            >
                {this.props.showControls ? (
                    <img
                        className="widget-video-player-preview-image"
                        src={videoWithControlsPreview}
                        alt="Video with controls preview"
                    />
                ) : (
                    <img className="widget-video-player-preview-image" src={videoPreview} alt="Video preview" />
                )}
            </SizeContainer>
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/VideoPlayer.css");
}
