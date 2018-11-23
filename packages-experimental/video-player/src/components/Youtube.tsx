import * as React from "react";

export interface YoutubeProps {
    url: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
}

class Youtube extends React.Component<YoutubeProps> {

    render() {
        return (
            <iframe
                className="video-player-iframe"
                src={this.generateUrl(this.props.url)}
                frameBorder="0"
                allowFullScreen={true}>
            </iframe>
        );
    }

    private generateUrl(url: string) {
        const attributes = this.getUrlAttributes();
        try {
            if (url.includes("youtube.com/embed/"))
                return url;
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

    private getUrlAttributes() {
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
}

export default Youtube;
