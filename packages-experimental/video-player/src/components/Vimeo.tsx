import * as React from "react";

export interface VimeoProps {
    url: string;
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
}

class Vimeo extends React.Component<VimeoProps> {

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

    private getUrlAttributes() {
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
