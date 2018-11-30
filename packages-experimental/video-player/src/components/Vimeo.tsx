import * as React from "react";
import { fixHeightWithRatio, getRatio } from "./VideoPlayer";
import ReactResizeDetector from "react-resize-detector";

export interface VimeoProps {
    url: string;
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

class Vimeo extends React.Component<VimeoProps> {

    private iframe: HTMLIFrameElement;
    readonly state = {
        ratio: 0
    };

    constructor(props: VimeoProps) {
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

            if (url.includes("player.vimeo.com"))
                return url;

            const urlVimeoSplit = url.split("/");
            if (urlVimeoSplit.length > 0) {
                const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                if (isFinite(Number(id)))
                    return `https://player.vimeo.com/video/${id}${attributes}`;
            }
        } catch (e) {
            //
        }
        return url;
    }

    private getUrlAttributes(): string {
        let attributes = "?dnt=1";

        if (this.props.autoPlay) {
            attributes += "&autoplay=1";
        } else {
            attributes += "&autoplay=0";
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
}

export default Vimeo;
