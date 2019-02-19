import { Component, createElement } from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio, validateUrl } from "../utils/Utils";

export interface DailymotionProps {
    url: string;
    autoPlay: boolean;
    controls: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export interface DailymotionState {
    ratio: number;
}

export class DailymotionPlayer extends Component<DailymotionProps, DailymotionState> {

    private iframe: HTMLIFrameElement;
    private readonly handleOnResize = this.onResize.bind(this);
    private handleAttributes = this.getUrlAttributes.bind(this);
    readonly state: DailymotionState = {
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
            if (url.includes("dailymotion.com/embed")) {
                return `${url}${attributes}`;
            }

            const urlVimeoSplit = url.split("/");
            if (urlVimeoSplit.length > 0) {
                const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                if (id)
                    return `https://www.dailymotion.com/embed/video/${id}${attributes}`;
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
        attributes += "&controls=" + (this.props.controls ? "true" : "false");
        return attributes;
    }

    public static canPlay(url: string): boolean {
        if (url && validateUrl(url) && url.indexOf("dailymotion.com") > -1) {
            return true;
        }
        return false;
    }
}
