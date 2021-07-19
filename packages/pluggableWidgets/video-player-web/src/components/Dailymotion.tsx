import { Component, createElement } from "react";
import { validateUrl } from "../utils/Utils";

export interface DailymotionProps {
    url: string;
    autoPlay: boolean;
    showControls: boolean;
    muted: boolean;
    aspectRatio?: boolean;
}

export class Dailymotion extends Component<DailymotionProps> {
    private handleAttributes = this.getUrlAttributes.bind(this);

    render(): JSX.Element {
        return (
            <iframe
                className="widget-video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
            />
        );
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
