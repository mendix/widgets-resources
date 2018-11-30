import VideoPlayer, { VideoPlayerProps, validateUrl } from "./components/VideoPlayer";
import { Alert } from "./components/Alert";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./components/SizeContainer";
import classNames = require("classnames");
import * as React from "react";
import { PlayerError } from "./components/PlayerError";

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
            return <PlayerError/>;
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
            aspectRatio: false
        };
    }

    private validateProps(props: VideoPlayerWebModelerProps): string {
        let errorMessage = "";
        if (!props.urlAttribute && !props.urlValue) {
            errorMessage = `Please provide an URL`;
        }
        if (errorMessage) {
            errorMessage = `Error in configuration: ${errorMessage}`;
        }

        return errorMessage;
    }
}

export function getPreviewCss() {
    return require("./ui/VideoPlayer.css");
}
