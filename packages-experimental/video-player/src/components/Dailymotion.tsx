import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { fixHeightWithRatio, getRatio } from "./VideoPlayer";

export interface DailymotionProps {
    url: string;
    autoPlay: boolean;
    controls: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

class Dailymotion extends React.Component<DailymotionProps> {

    private iframe: HTMLIFrameElement;
    readonly state = {
        ratio: 0
    };

    constructor(props: DailymotionProps) {
        super(props);

        this.onResize = this.onResize.bind(this);
    }

    render() {
        return (
            <iframe
                className="video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="autoplay; fullscreen"
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

            if (url.includes("dailymotion.com/embed"))
                return `${url}${attributes}`;

            const urlVimeoSplit = url.split("/");
            if (urlVimeoSplit.length > 0) {
                const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                if (id)
                    return `https://www.dailymotion.com/embed/video/${id}${attributes}`;
            }
        } catch (e) {
            //
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?sharing-enable=false";

        if (this.props.autoPlay) {
            attributes += "&autoplay=true";
        } else {
            attributes += "&autoplay=false";
        }
        if (this.props.muted) {
            attributes += "&mute=true";
        } else {
            attributes += "&mute=false";
        }
        if (this.props.controls) {
            attributes += "&controls=true";
        } else {
            attributes += "&controls=false";
        }
        return attributes;
    }
}

export default Dailymotion;
