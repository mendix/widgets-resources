import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio } from "../utils/Utils";

export interface YoutubeProps {
    url: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export class Youtube extends React.Component<YoutubeProps> {
    private iframe: HTMLIFrameElement;
    readonly state = {
        ratio: 0
    };

    constructor(props: YoutubeProps) {
        super(props);

        this.onResize = this.onResize.bind(this);
    }

    render() {
        return (
            <iframe
                className="widget-video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                ref={(node: HTMLIFrameElement) => this.iframe = node }>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}
                                     refreshMode="debounce" refreshRate={100} />
            </iframe>
        );
    }

    private onResize() {
        if (this.iframe && this.props.aspectRatio) {
            if (this.state.ratio) {
                fixHeightWithRatio(this.iframe, this.state.ratio);
            } else {
                getRatio(this.props.url)
                    .then(ratio => {
                        this.setState({ ratio });
                        fixHeightWithRatio(this.iframe, this.state.ratio);
                    });
            }
        }
    }

    private generateUrl(url: string): string {
        const attributes = this.getUrlAttributes();
        try {
            if (url.includes("youtube.com/embed/"))
                return `${url}${attributes}`;
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
            //
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?modestbranding=1&rel=0";

        if (this.props.autoPlay) {
            attributes += "&autoplay=1";
        } else {
            attributes += "&autoplay=0";
        }
        if (this.props.showControls) {
            attributes += "&controls=1";
        } else {
            attributes += "&controls=0";
        }
        if (this.props.muted) {
            attributes += "&muted=1";
        } else {
            attributes += "&muted=0";
        }
        if (this.props.loop) {
            attributes += "&loop=1";
        } else {
            attributes += "&loop=0";
        }
        return attributes;
    }

    public static canPlay(url: string): boolean {
        if (url) {
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                return true;
            }
        }
        return false;
    }

}
