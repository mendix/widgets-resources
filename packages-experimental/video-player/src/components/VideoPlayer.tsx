import { Alert } from "./Alert";
import * as React from "react";

export interface VideoPlayerProps {
    url: string;
    staticUrl: string;
    className?: string;
    style?: object;
    poster?: string;
    staticPoster?: string;

    autoStart: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
}

const extractProvider = (url: string) => {
    if (url)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            return "youtube";
        } else if (url.includes("vimeo.com")) {
            return "vimeo";
        }
    return "";
};

export interface VideoPlayerState {
    alertMessage?: string;
}

export const validateUrl = (url: string) => {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url))
        return url;
    return null;
};

export class VideoPlayer extends React.Component <VideoPlayerProps, VideoPlayerState> {

    constructor(props: VideoPlayerProps) {
        super(props);

        this.state = {
            alertMessage: ""
        };

        this.renderVideoPlayer = this.renderVideoPlayer.bind(this);
        this.renderHtml5PlayerContent = this.renderHtml5PlayerContent.bind(this);
    }

    render() {
        const url = this.generateUrl(this.props.url || this.props.staticUrl);
        return (
            <div className="video-player-container">
                <Alert bootstrapStyle="danger" className="widget-badge-alert" message={this.state.alertMessage!}/>
                {this.renderVideoPlayer(url)}
                {this.renderHtml5PlayerContent(url)}
            </div>
        );
    }

    private renderHtml5PlayerContent(url: string): React.ReactElement<{}> {
        return (
            <video controls={this.props.showControls}
                   height="100%"
                   width="100%"
                   style={
                       {
                           display: !extractProvider(url) ? "block" : "none",
                           backgroundColor: "#999"
                       }
                   }
                   autoPlay={this.props.autoStart}
                   muted={this.props.muted}
                   loop={this.props.loop}
                   poster={this.props.poster || this.props.staticPoster}>
                <source src={this.props.url || this.props.staticUrl}
                        type="video/mp4"/>
            </video>
        );
    }

    private renderVideoPlayer(url: string): React.ReactElement <{}> {
        return (
            <iframe className={this.props.className}
                    src={extractProvider(url) ? url : ""}
                    frameBorder="0"
                    style={ { display: extractProvider(url) ? "block" : "none" } }
                    allowFullScreen={true}>
            </iframe>
        );
    }

    private generateUrl(url: string) {
        const provider = extractProvider(url);
        const attributes = this.getUrlAttributes();
        try {
            switch (provider) {
                case "youtube":
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
                    break;
                case "vimeo":
                    if (url.includes("player.vimeo.com"))
                        return url;

                    const urlVimeoSplit = url.split("/");
                    if (urlVimeoSplit.length > 0) {
                        const id = urlVimeoSplit[urlVimeoSplit.length - 1];
                        if (isFinite(Number(id)))
                            return `https://player.vimeo.com/video/${id}${attributes}`;
                    }
                    break;
            }
        } catch (e) {
            //
        }
        return url;
    }

    private getUrlAttributes() {
        let attributes = "?";

        if (this.props.autoStart)
            attributes += "autoplay=1";
        else
            attributes += "autoplay=0";

        if (this.props.showControls)
            attributes += "&controls=1";
        else
            attributes += "&controls=0";

        if (this.props.muted)
            attributes += "&muted=1";
        else
            attributes += "&muted=0";
        if (this.props.loop)
            attributes += "&loop=1";
        else
            attributes += "&loop=0";

        return attributes;
    }

    componentWillReceiveProps(nextProps: VideoPlayerProps) {
        const url = nextProps.url || nextProps.staticUrl;
        this.setState({ alertMessage: "" });
        if (!url)
            this.setState({ alertMessage: "Please provide an URL" });
        if (url && !validateUrl(url))
            this.setState({ alertMessage: "Please provide a valid URL" });
    }

}
