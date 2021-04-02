import { parseStyle } from "@mendix/piw-utils-internal";
import { Component, createElement } from "react";
import classNames from "classnames";

import { Alert } from "./components/Alert";
import { Error } from "./components/Error";
import { SizeContainer } from "./components/SizeContainer";
import { Video, VideoPlayerProps } from "./components/Video";
import { validateUrl } from "./utils/Utils";
import { VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";

declare function require(name: string): string;

export class preview extends Component<VideoPlayerPreviewProps, {}> {
    render(): JSX.Element {
        const message = this.validateProps(this.props);
        if (message) {
            return <Alert message={message} className="widget-badge-alert" />;
        }

        return (
            <SizeContainer
                className={classNames("video-player-container", this.props.class)}
                style={{ ...parseStyle(this.props.style), minHeight: "400px" }}
                widthUnit={this.props.widthUnit}
                width={this.props.width ?? 0}
                heightUnit={this.props.heightUnit}
                height={this.props.height ?? 0}
                tabIndex={0}
            >
                {this.renderPlayers()}
            </SizeContainer>
        );
    }

    private renderPlayers(): JSX.Element {
        if (!validateUrl(this.props.urlExpression || "")) {
            return <Error preview />;
        }
        return <Video {...this.transformProps(this.props)} />;
    }

    private transformProps(props: VideoPlayerPreviewProps): VideoPlayerProps {
        return {
            url: props.urlExpression,
            poster: props.posterExpression,
            autoStart: false,
            showControls: props.showControls,
            loop: false,
            muted: true,
            aspectRatio: false,
            preview: true
        };
    }

    private validateProps(props: VideoPlayerPreviewProps): string {
        let errorMessage = "";
        if (!props.urlExpression) {
            errorMessage = "An URL is required for this widget";
        }

        return errorMessage;
    }
}

export function getPreviewCss(): string {
    return require("./ui/VideoPlayer.css");
}
