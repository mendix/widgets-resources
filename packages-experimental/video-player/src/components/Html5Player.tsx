import * as React from "react";

export interface Html5PlayerProps {
    url: string;
    poster?: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    style?: any;
}

class Html5Player extends React.Component<Html5PlayerProps> {
    render() {
        return (
            <video
            className="video-player-html5"
            controls={this.props.showControls}
            height="100%"
            width="100%"
            autoPlay={this.props.autoPlay}
            muted={this.props.muted}
            loop={this.props.loop}
            poster={this.props.poster}
        >
            <source src={this.props.url} type="video/mp4"/>
        </video>
        );
    }
}
export default Html5Player;
