import { Component, createElement, createRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio, validateUrl } from "../utils/Utils";

export interface YoutubeProps {
    url: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export interface YoutubeState {
    ratio: number;
}

export class Youtube extends Component<YoutubeProps, YoutubeState> {
    private iframe = createRef<HTMLIFrameElement>();
    private readonly handleOnResize = this.onResize.bind(this);
    private handleAttributes = this.getUrlAttributes.bind(this);
    readonly state: YoutubeState = {
        ratio: 0
    };

    render(): JSX.Element {
        return (
            <iframe
                className="widget-video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ref={this.iframe}
            >
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this.handleOnResize}
                    refreshMode="debounce"
                    refreshRate={100}
                />
            </iframe>
        );
    }

    private onResize(): void {
        if (this.iframe && this.iframe.current && this.props.aspectRatio) {
            if (this.state.ratio) {
                fixHeightWithRatio(this.iframe.current, this.state.ratio);
            } else {
                getRatio(this.props.url).then(ratio => {
                    this.setState({ ratio });
                    if (this.iframe && this.iframe.current) {
                        fixHeightWithRatio(this.iframe.current, this.state.ratio);
                    }
                });
            }
        }
    }

    private generateUrl(url: string): string {
        const attributes = this.handleAttributes();
        try {
            if (url.includes("youtube.com/embed/")) {
                return `${url}${attributes}`;
            }
            if (url.includes("youtu.be/") || url.includes("youtube.com/v/")) {
                const urlSplit = url.split("/");
                if (urlSplit.length > 0) {
                    const id = urlSplit[urlSplit.length - 1];
                    return `https://www.youtube.com/embed/${id}${attributes}`;
                }
            }
            if (url.includes("youtube.com/watch?v=")) {
                const urlYoutubeSplit = url.split("watch?v=");
                if (urlYoutubeSplit.length > 0) {
                    const id = urlYoutubeSplit[urlYoutubeSplit.length - 1];
                    return `https://www.youtube.com/embed/${id}${attributes}`;
                }
            }
        } catch (e) {
            return url;
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?modestbranding=1&rel=0";
        attributes += "&autoplay=" + (this.props.autoPlay ? "1" : "0");
        attributes += "&controls=" + (this.props.showControls ? "1" : "0");
        attributes += "&muted=" + (this.props.muted ? "1" : "0");
        attributes += "&loop=" + (this.props.loop ? "1" : "0");
        return attributes;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public static canPlay(url: string): boolean {
        return !!url && !!validateUrl(url) && (url.indexOf("youtube.com") > -1 || url.indexOf("youtu.be") > -1);
    }
}
