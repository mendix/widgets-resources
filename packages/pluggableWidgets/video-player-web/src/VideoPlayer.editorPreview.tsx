import { parseStyle } from "@mendix/piw-utils-internal";
import { Component, createElement } from "react";
import classNames from "classnames";

import { SizeContainer } from "./components/SizeContainer";
import { Video } from "./components/Video";

import { VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";

declare function require(name: string): string;

export class preview extends Component<VideoPlayerPreviewProps, {}> {
    render(): JSX.Element {
        return (
            <SizeContainer
                className={classNames("video-player-container", this.props.className)}
                style={parseStyle(this.props.style)}
                widthUnit={this.props.widthUnit}
                width={this.props.width ?? 0}
                heightUnit={this.props.heightUnit}
                height={this.props.height ?? 0}
                heightAspectRatio={this.props.heightAspectRatio}
                tabIndex={0}
            >
                <Video
                    autoStart={this.props.autoStart}
                    showControls={this.props.showControls}
                    loop={this.props.loop}
                    muted={this.props.muted}
                    aspectRatio={this.props.heightUnit === "aspectRatio"}
                    preview
                />
            </SizeContainer>
        );
    }
}

export function getPreviewCss(): string {
    return require("./ui/VideoPlayer.css") + require("./ui/VideoPlayerPreview.css");
}
