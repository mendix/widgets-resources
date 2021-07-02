import { Component, createElement, createRef } from "react";

import classNames from "classnames";

export interface Html5PlayerProps {
    url: string;
    poster?: string;
    autoPlay: boolean;
    showControls: boolean;
    loop: boolean;
    muted: boolean;
    style?: any;
    aspectRatio?: boolean;
    preview: boolean;
}

export class Html5 extends Component<Html5PlayerProps> {
    private videoElement = createRef<HTMLVideoElement>();
    private errorElement = createRef<HTMLDivElement>();
    private readonly handleOnSuccess = this.handleSuccess.bind(this);
    private readonly handleOnError = this.handleError.bind(this);

    render(): JSX.Element {
        return (
            <div
                className={classNames("widget-video-player-html5-container", {
                    "widget-video-player-show-controls": this.props.showControls
                })}
            >
                {this.props.preview ? (
                    <svg
                        className="widget-video-player-preview-play-button"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                            fill="#373737"
                        />
                        <path d="M16 12V36L34.8571 24L16 12Z" fill="white" />
                    </svg>
                ) : (
                    <div className="video-error-label-html5" ref={this.errorElement}>
                        The video failed to load :(
                    </div>
                )}
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
                    {!this.props.preview ? (
                        <source
                            src={this.props.url}
                            type="video/mp4"
                            onError={this.handleOnError}
                            onLoad={this.handleOnSuccess}
                        />
                    ) : null}
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
}
