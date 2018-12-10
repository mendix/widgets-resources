import * as React from "react";
import classNames = require("classnames");

import { Alert } from "./components/Alert";
import { PlayerError } from "./components/PlayerError";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./components/SizeContainer";
import { VideoPlayer, VideoPlayerProps } from "./components/VideoPlayer";
import { validateUrl } from "./utils/Utils";

declare function require(name: string): string;

interface VideoPlayerWebModelerProps {
    "class"?: string;
    style?: React.CSSProperties;
    urlAttribute: string;
    urlValue: string;
    posterAttribute?: string;
    posterImage?: string;

    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;

    autoStart: boolean;
    showControls: boolean;
}

// tslint:disable-next-line class-name
export class preview extends React.Component<VideoPlayerWebModelerProps, {}> {
    render() {
        const message = this.validateProps(this.props);
        if (message)
            return <Alert bootstrapStyle="danger" message={message} className="widget-badge-alert"/>;

        return (
            <SizeContainer
                className={classNames("video-player-container", this.props.class)}
                style={this.props.style}
                widthUnit={this.props.widthUnit}
                width={this.props.width}
                heightUnit={this.props.heightUnit}
                height={this.props.height}>
                {this.renderPlayers()}
            </SizeContainer>
        );
    }

    private renderPlayers(): React.ReactElement<{}> {
        if (!validateUrl(this.props.urlAttribute || this.props.urlValue)) {
            return <PlayerError preview={true}/>;
        }
        return <VideoPlayer {...this.transformProps(this.props)}/>;
    }

    private transformProps(props: VideoPlayerWebModelerProps): VideoPlayerProps {
        return {
            url: props.urlAttribute,
            staticUrl: props.urlValue,
            poster: props.posterAttribute,
            staticPoster: props.posterImage,
            className: props.class,
            autoStart: false,
            showControls: props.showControls,
            loop: false,
            muted: true,
            aspectRatio: false,
            preview: true
        };
    }

    private validateProps(props: VideoPlayerWebModelerProps): string {
        let errorMessage = "";
        if (!props.urlAttribute && !props.urlValue) {
            errorMessage = `An URL is required for this widget`;
        }

        return errorMessage;
    }
}

export function getPreviewCss() {
    return require("./ui/VideoPlayer.css");
}
