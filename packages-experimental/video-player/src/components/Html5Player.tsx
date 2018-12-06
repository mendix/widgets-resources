import * as React from "react";
import ReactResizeDetector from "react-resize-detector";

export interface Html5PlayerProps {
    url: string;
    poster?: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    style?: any;
    aspectRatio?: boolean;
}

export class Html5Player extends React.Component<Html5PlayerProps> {

    private video: HTMLVideoElement;

    constructor(props: Html5PlayerProps) {
        super(props);

        this.onResize = this.onResize.bind(this);
    }

    render() {
        let sizeProps: React.CSSProperties = {};
        if (!this.props.aspectRatio)
            sizeProps = {
                height: "100%"
            };
        return (
            <video
                className="widget-video-player-html5"
                controls={this.props.showControls}
                width="100%"
                autoPlay={this.props.autoPlay}
                muted={this.props.muted}
                loop={this.props.loop}
                poster={this.props.poster}
                ref={(node: HTMLVideoElement) => this.video = node }
                {...sizeProps}>
                <source src={this.props.url} type="video/mp4"/>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}
                                     refreshMode="debounce" refreshRate={100} />
            </video>
        );
    }

    private onResize() {
        if (this.video && this.props.aspectRatio) {
            this.changeHeight(this.video);
        }
    }

    private changeHeight(element: HTMLElement): void {
        if (element.parentElement) {
            const height = element.clientHeight + "px";
            element.parentElement.style.height = height;
            if (element.parentElement.parentElement)
                element.parentElement.parentElement.style.height = height;
        }
    }
}
