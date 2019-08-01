import { Component, createElement, createRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio, validateUrl } from "../utils/Utils";

export interface DailymotionProps {
    url: string;
    autoPlay: boolean;
    showControls: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export interface DailymotionState {
    ratio: number;
}

export class Dailymotion extends Component<DailymotionProps, DailymotionState> {
    private iframe = createRef<HTMLIFrameElement>();
    private readonly handleOnResize = this.onResize.bind(this);
    private handleAttributes = this.getUrlAttributes.bind(this);
    readonly state: DailymotionState = {
        ratio: 0
    };

    render(): JSX.Element {
        return (
            <iframe
                className="widget-video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="autoplay; fullscreen"
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
            if (url.includes("dailymotion.com/embed")) {
                return `${url}${attributes}`;
            }

            const urlVimeoSplit = url.split("/");
            if (urlVimeoSplit.length > 0) {
                const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                if (id) {
                    return `https://www.dailymotion.com/embed/video/${id}${attributes}`;
                }
            }
        } catch (e) {
            return url;
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?sharing-enable=false";
        attributes += "&autoplay=" + (this.props.autoPlay ? "true" : "false");
        attributes += "&mute=" + (this.props.muted ? "true" : "false");
        attributes += "&controls=" + (this.props.showControls ? "true" : "false");
        return attributes;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public static canPlay(url: string): boolean {
        return !!url && !!validateUrl(url) && url.indexOf("dailymotion.com") > -1;
    }
}
