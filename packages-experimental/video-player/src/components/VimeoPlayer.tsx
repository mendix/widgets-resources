import { Component, createElement } from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio, validateUrl } from "../utils/Utils";

export interface VimeoProps {
    url: string;
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export interface VimeoState {
    ratio: number;
}

export class VimeoPlayer extends Component<VimeoProps, VimeoState> {

    private iframe: HTMLIFrameElement;
    private readonly handleOnResize = this.onResize.bind(this);
    private handleAttributes = this.getUrlAttributes.bind(this);
    readonly state: VimeoState = {
        ratio: 0
    };

    render() {
        return (
            <iframe
                className="widget-video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
                ref={(node: HTMLIFrameElement) => this.iframe = node}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.handleOnResize}
                                     refreshMode="debounce" refreshRate={100}/>
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
        const attributes = this.handleAttributes();
        try {
            if (url.includes("player.vimeo.com"))
                return `${url}${attributes}`;

            const urlVimeoSplit = url.split("/");
            if (urlVimeoSplit.length > 0) {
                const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                if (Number(id) > 0 && isFinite(Number(id))) {
                    return `https://player.vimeo.com/video/${id}${attributes}`;
                }
            }
        } catch (e) {
            return url;
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?dnt=1";
        attributes += "&autoplay=" + (this.props.autoPlay ? "1" : "0");
        attributes += "&muted=" + (this.props.muted ? "1" : "0");
        attributes += "&loop=" + (this.props.loop ? "1" : "0");
        return attributes;
    }

    public static canPlay(url: string): boolean {
        if (url && validateUrl(url) && url.indexOf("vimeo.com") > -1) {
            return true;
        }
        return false;
    }
}
