import { Component, createElement, createRef } from "react";
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

export class Html5 extends Component<Html5PlayerProps> {
    private videoElement = createRef<HTMLVideoElement>();
    private errorElement = createRef<HTMLDivElement>();
    private readonly handleOnResize = this.onResize.bind(this);
    private readonly handleOnSuccess = this.handleSuccess.bind(this);
    private readonly handleOnError = this.handleError.bind(this);

    render(): JSX.Element {
        return (
            <div className="widget-video-player-html5-container">
                <div className="video-error-label-html5" ref={this.errorElement}>
                    The video failed to load :(
                </div>
                <video
                    className="widget-video-player-html5"
                    controls={this.props.showControls}
                    autoPlay={this.props.autoPlay}
                    muted={this.props.muted}
                    loop={this.props.loop}
                    poster={this.props.poster}
                    ref={this.videoElement}
                    height={!this.props.aspectRatio ? "100%" : undefined}
                    preload={this.props.poster ? "metadata" : "auto"}
                >
                    <source
                        src={this.props.url}
                        type="video/mp4"
                        onError={this.handleOnError}
                        onLoad={this.handleOnSuccess}
                    />
                    <ReactResizeDetector
                        handleWidth
                        handleHeight
                        onResize={this.handleOnResize}
                        refreshMode="debounce"
                        refreshRate={100}
                    />
                </video>
            </div>
        );
    }

    private handleError(): void {
        if (this.errorElement && this.errorElement.current) {
            this.errorElement.current.classList.add("hasError");
            if (this.videoElement && this.videoElement.current) {
                this.videoElement.current.controls = false;
            }
        }
    }

    private handleSuccess(): void {
        if (this.errorElement && this.errorElement.current) {
            this.errorElement.current.classList.remove("hasError");
            if (this.videoElement && this.videoElement.current) {
                this.videoElement.current.controls = this.props.showControls;
            }
        }
    }

    private onResize(): void {
        if (this.videoElement && this.videoElement.current && this.props.aspectRatio) {
            Html5.changeHeight(this.videoElement.current);
        }
    }

    private static changeHeight(element: HTMLElement): void {
        if (element.parentElement) {
            const height = element.clientHeight + "px";
            if (element.parentElement.parentElement) {
                element.parentElement.parentElement.style.height = height;

                if (element.parentElement.parentElement.parentElement) {
                    element.parentElement.parentElement.parentElement.style.height = height;
                }
            }
        }
    }
}
