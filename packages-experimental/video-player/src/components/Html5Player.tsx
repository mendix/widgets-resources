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

export const Html5Player: React.FunctionComponent<Html5PlayerProps> = (props) =>
    (
        <video
            className="video-player-html5"
            controls={props.showControls}
            height="100%"
            width="100%"
            autoPlay={props.autoPlay}
            muted={props.muted}
            loop={props.loop}
            poster={props.poster}
        >
            <source src={props.url} type="video/mp4"/>
        </video>
    );
