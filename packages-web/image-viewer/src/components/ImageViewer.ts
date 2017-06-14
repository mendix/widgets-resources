import { Component, DOM } from "react";

import "../ui/ImageViewer.css";

interface ImageViewerProps {
    imageurl: string;
}

interface ImageViewerState {
    className: string;
    imageClass: string;
    isOpen: boolean;
}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {

    constructor(props: ImageViewerProps) {
        super(props);

        this.state = {
            className: "",
            imageClass: "",
            isOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return DOM.div({ className: this.state.className },
            DOM.div({ className: this.state.imageClass },
                DOM.img({
                    onClick: this.handleClick,
                    src: this.props.imageurl
                })
            )
        );
    }

    private handleClick() {
        if (this.state.isOpen === false) {
            this.setState({
                className: "widget-image-viewer-outer",
                imageClass: "widget-image-viewer-inner",
                isOpen: true
            });
        } else {
            this.setState({
                className: "",
                imageClass: "",
                isOpen: false
            });
        }

    }
}

export { ImageViewer, ImageViewerProps };
