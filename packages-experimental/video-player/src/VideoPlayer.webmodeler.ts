import { CSSProperties, Component, createElement } from "react";
import { VideoPlayer, VideoPlayerProps, validateUrl } from "./components/VideoPlayer";
import { Alert } from "./components/Alert";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./components/SizeContainer";
import classNames = require("classnames");

declare function require(name: string): string;

interface VideoPlayerWebModelerProps {
    "class"?: string;
    style?: CSSProperties;
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
export class preview extends Component<VideoPlayerWebModelerProps, {}> {
    render() {
        const message = this.validateProps(this.props);
        if (message)
            return createElement(Alert, { bootstrapStyle: "danger", message, className: "widget-badge-alert" });
        return createElement(SizeContainer,
            {
                className: classNames("video-player-container", this.props.class),
                style: this.props.style,
                widthUnit: this.props.widthUnit,
                width: this.props.width,
                heightUnit: this.props.heightUnit,
                height: this.props.height
            },
            createElement(VideoPlayer, this.transformProps(this.props))
        );
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
            muted: true
        };
    }

    private validateProps(props: VideoPlayerWebModelerProps): string {
        let errorMessage = "";
        if (!props.urlAttribute && !props.urlValue) {
            errorMessage = `A video URL is required`;
        }
        if (props.urlAttribute && !validateUrl(props.urlAttribute)) {
            errorMessage = `A valid video URL is required. URL: ${props.urlAttribute}`;
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
